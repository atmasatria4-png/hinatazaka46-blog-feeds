import { DISCORD_WEBHOOK } from "../constants";
import type { Blog } from "../types/blog";

export const notifyDiscord = async (blog: Blog): Promise<void> => {
  await fetch(DISCORD_WEBHOOK!, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      content: `📝 New blog posted!\n**${blog.title}**\n${blog.url}`,
    })
  })
}