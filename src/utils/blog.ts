import { BLOG_ELEMENT, BLOG_URL, SUMI_BLOG_URL } from "../constants"
import * as cheerio from "cheerio";
import type { Blog } from "../types/blog";
import { titleParser } from "./parser";

export class BlogFetchError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "BlogFetchError"
  }
}

export const getLatestBlog = async (): Promise<Blog> => {
  try {
    const res: Response = await fetch(SUMI_BLOG_URL)
    if (!res.ok) throw new BlogFetchError(`❌ Failed to fetch blog page: ${res.status}`)

    const html: string = await res.text()
    const $: cheerio.CheerioAPI = cheerio.load(html)
    
    const latestBlog = $(BLOG_ELEMENT).first()
    if (latestBlog.length === 0) throw new BlogFetchError("❌ No blog entries found on the page")

    const link: string | undefined = latestBlog.attr("href")
    if (!link) throw new BlogFetchError("❌ Latest blog entry has no href attribute")

    const rawTitle: string = latestBlog.text()
    if (!rawTitle.trim()) throw new BlogFetchError("❌ Latest blog entry has no title")
    const title: string = titleParser(latestBlog.text())

    const url: string = new URL(link, BLOG_URL).href

    const blog: Blog = {
      id: link,
      title,
      url,
    }

    return blog
  } catch (error: any) {
    if (error instanceof BlogFetchError) throw error
    throw new BlogFetchError("❌ Failed to fetch latest blog", error)
  }
}