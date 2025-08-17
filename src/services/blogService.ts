import * as cheerio from "cheerio";
import type { Blog } from "../types/blog";
import { titleParser } from "../utils/parser";
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

    const latestBlog = $(config.blog.element).first()
    if (latestBlog.length === 0) throw new BlogFetchError(`❌ Member ${memberId}: no blog entries found on the page`)

    const link: string | undefined = latestBlog.attr("href")
    if (!link) throw new BlogFetchError(`❌ Member ${memberId}: latest blog entry has no href attribute`)

    const rawTitle: string = latestBlog.text()
    if (!rawTitle.trim()) throw new BlogFetchError(`❌ Member ${memberId}: latest blog entry has no title`)

    const title: string = titleParser(latestBlog.text())
    const url: string = new URL(link, config.app.baseUrl).href

    return {id: `${memberId}-${link}`, title, url}
  } catch (error: any) {
    if (error instanceof BlogFetchError) throw error
    throw new BlogFetchError(`❌ Member ${memberId}: failed to fetch latest blog`, error)
  }
}