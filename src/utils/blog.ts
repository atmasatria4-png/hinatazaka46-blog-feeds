import { BLOG_URL } from "../constants"
import * as cheerio from "cheerio";
import type { Blog } from "../types/blog";
import { titleParser } from "./parser";

export const getLatestBlog = async (): Promise<Blog> => {
  const res = await fetch(BLOG_URL)
  const html = await res.text()
  const $ = cheerio.load(html)
  
  const latestBlog = $(".p-blog-entry__list a").first()
  const link: string = latestBlog.attr("href")!
  const title: string = titleParser(latestBlog.text())

  if (!link) throw new Error("Cannot find latest blog link!")

  const blog: Blog = {
    id: link,
    title,
    url: new URL(link, "https://www.hinatazaka46.com").href,
  }
  return blog
}