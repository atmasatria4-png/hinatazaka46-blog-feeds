import { BLOG_ELEMENT, BASE_URL, BLOG_URL } from "../constants"
import * as cheerio from "cheerio";
import type { Blog } from "../types/blog";
import { titleParser } from "../utils/parser";

export class BlogFetchError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "BlogFetchError"
  }
}

export const getLatestBlog = async (memberId: number): Promise<Blog> => {
  try {
    const res: Response = await fetch(`${BLOG_URL}${memberId}`)
    if (!res.ok) throw new BlogFetchError(`❌ Failed to fetch blog page of ${memberId}: ${res.status}`)

    const html: string = await res.text()
    const $: cheerio.CheerioAPI = cheerio.load(html)

    const latestBlog = $(BLOG_ELEMENT).first()
    if (latestBlog.length === 0) throw new BlogFetchError(`❌ Member ${memberId}: no blog entries found on the page`)

    const link: string | undefined = latestBlog.attr("href")
    if (!link) throw new BlogFetchError(`❌ Member ${memberId}: latest blog entry has no href attribute`)

    const rawTitle: string = latestBlog.text()
    if (!rawTitle.trim()) throw new BlogFetchError(`❌ Member ${memberId}: latest blog entry has no title`)
    const title: string = titleParser(latestBlog.text())

    const url: string = new URL(link, BASE_URL).href

    const blog: Blog = {
      id: `${memberId}-${link}`,
      title,
      url,
    }

    return blog
  } catch (error: any) {
    if (error instanceof BlogFetchError) throw error
    throw new BlogFetchError(`❌ Member ${memberId}: failed to fetch latest blog`, error)
  }
}