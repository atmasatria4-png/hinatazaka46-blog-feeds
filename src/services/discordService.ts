import { config } from "../config";
import { httpClient } from "../utils/http";
import { log } from "../utils/logger";

export class DiscordNotificationError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "DiscordNotificationError"
  }
}

export const notifyLatestBlogToDiscord = async (content: string): Promise<void> => {
  try {
    await httpClient.post(config.discord.webhook, { content })

    log.base("📤 Discord notification sent successfully")
  } catch (error: any) {
    if (error instanceof DiscordNotificationError) throw error
    throw new DiscordNotificationError("❌ BLOG - Failed to send Discord notification", error)
  }
}