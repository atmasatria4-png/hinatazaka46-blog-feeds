import * as cheerio from "cheerio";
import type { Blog } from "../types/blog";
import { elementParser } from "../utils/parser";
import { config } from "../config";
import { httpClient } from "../utils/http";

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