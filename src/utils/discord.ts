import type { Blog } from "../types/blog"
import { timeParser } from "./parser"

export class DiscordError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "DiscordError"
  }
}

export const generateBlogContent = (blog: Blog): string => `
# 🐰💭♡ ${blog.author.name} (${blog.author.kana})
💌✨☆ **[${blog.title}](${blog.url})**
📅⏰♫ ${timeParser(blog.time)} (🇯🇵) 〜✧✦〜 ${timeParser(blog.time, 9)} (🇮🇩)
`