import { config } from "../config"
import { log } from "./logger"

export const validateEnvironment = (): void => {
  if (!config.discord.webhook) {
    log("❌ Missing DISCORD_WEBHOOK!")
    process.exit(1)
  }
}