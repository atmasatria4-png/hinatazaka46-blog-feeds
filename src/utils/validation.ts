import { config } from "../config"
import { log } from "./logger"

export const validateEnvironment = (): void => {
  if (!config.discord.webhook) {
    log.error("Missing DISCORD_WEBHOOK!")
    process.exit(1)
  }
}