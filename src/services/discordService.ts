import { DISCORD_WEBHOOK } from "../constants";
import type { Blog } from "../types/blog";
import { log } from "../utils/logger";

export class DiscordNotificationError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "DiscordNotificationError"
  }
}

export const notifyDiscord = async (blog: Blog): Promise<void> => {
  try {
    const res: Response = await fetch(DISCORD_WEBHOOK!, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "HinatazakaBlogMonitor/1.0"
      },
      body: JSON.stringify({
        content: `📝 New blog posted!\n**[${blog.title}](${blog.url})**\n`,
      })
    })

    if (!res.ok) {
      const errorText: string = await res.text().catch(() => "Unknown error")
      throw new DiscordNotificationError(`❌ Discord API returned ${res.status}: ${errorText}`)
    }

    log("📤 Discord notification sent successfully")
  } catch (error: any) {
    if (error instanceof DiscordNotificationError) throw error
    throw new DiscordNotificationError("❌ Failed to send Discord notification", error)
  }
}