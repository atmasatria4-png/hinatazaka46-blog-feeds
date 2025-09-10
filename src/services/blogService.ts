import * as cheerio from "cheerio";
import type { Blog } from "../types/blog";
import { elementParser } from "../utils/parser";
import { config } from "../config";
import { httpClient } from "../utils/http";
import type { StateData } from "../types/state";
import { notifyLatestBlogToDiscord } from "./discordService";
import { log } from "../utils/logger";
import type { MemberIds } from "../types/seen";
import { generateBlogContent } from "../utils/discord";

export class BlogFetchError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "BlogFetchError"
  }
}

export const getLatestBlog = async (memberId: number): Promise<Blog> => {
  try {
    const html: string = await httpClient.get(`${config.blog.url}${memberId}`)
    const $: cheerio.CheerioAPI = cheerio.load(html)

    const link: string = elementParser($, memberId, config.blog.entry, true).link!
    const name: string = elementParser($, memberId, config.blog.author.name).text
    const kana: string = elementParser($, memberId, config.blog.author.kana).text
    const title: string = elementParser($, memberId, config.blog.title).text
    const time: string = elementParser($, memberId, config.blog.postedAt).text
    const url: string = new URL(link, config.app.baseUrl).href

    return { id: `${url}`, author: { name, kana }, title, url, time }
  } catch (error: any) {
    if (error instanceof BlogFetchError) throw error
    throw new BlogFetchError(`❌ Member ${memberId}: failed to fetch latest blog`, error)
  }
}

export const blogChecking = async (memberId: number, blog: MemberIds): Promise<void> => {
  try {
    const latestBlog: Blog = await getLatestBlog(memberId)

    const prevBlogId = blog?.[memberId]
    if (prevBlogId === latestBlog.id) {
      log.info(`Member ${memberId}: no new blog`);
      return;
    }

    log.base(`🔔 New blog detected: ${latestBlog.title}`);
    const content = generateBlogContent(latestBlog);
    await notifyLatestBlogToDiscord(content);
    blog[memberId] = latestBlog.id;
    log.info(`Done checking blog for member ${memberId}`);
  } catch (error: any) {
    log.error(`Failed to process member ${memberId}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}