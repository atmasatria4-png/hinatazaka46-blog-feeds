import * as cheerio from "cheerio";
import type { Blog } from "../types/blog";
import { elementParser } from "../utils/parser";
import { config } from "../config";
import { httpClient } from "../utils/http";
import type { ElementParser } from "../types/element";

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

    const { text: title, link }: ElementParser = elementParser($, memberId, config.blog.entry, true)
    const url: string = new URL(link!, config.app.baseUrl).href

    const author: string = elementParser($, memberId, config.blog.author).text
    const time: string = elementParser($, memberId, config.blog.postedAt).text

    return { id: `${url}`, author, title, url, time }
  } catch (error: any) {
    if (error instanceof BlogFetchError) throw error
    throw new BlogFetchError(`❌ Member ${memberId}: failed to fetch latest blog`, error)
  }
}