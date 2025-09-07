import type { Blog } from "../types/blog"

export class DiscordError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "DiscordError"
  }
}

export const generateDiscordContent = (blog: Blog): string => `
👸🏻 New blog posted!
**[${blog.title}](${blog.url})**
`