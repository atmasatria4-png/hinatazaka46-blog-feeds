import { config } from "../config";
import type { DiscordEmbed } from "../types/discord";
import { httpClient } from "../utils/http";
import { log } from "../utils/logger";

export class DiscordNotificationError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "DiscordNotificationError"
  }
}

export const notifyToDiscord = async (content: string, embeds?: DiscordEmbed[]): Promise<void> => {
  try {
    await httpClient.post(config.discord.webhook, { content, embeds });
    log.base("📤 Discord notification sent successfully")
  } catch (error: any) {
    if (error instanceof DiscordNotificationError) throw error
    throw new DiscordNotificationError("❌ Failed to send Discord notification", error)
  }
}