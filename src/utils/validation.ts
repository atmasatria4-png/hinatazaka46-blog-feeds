import { DISCORD_WEBHOOK } from "../constants"
import { log } from "./logger"

export const validateEnvironment = (): void => {
  if (!DISCORD_WEBHOOK) {
    log("❌ Missing DISCORD_WEBHOOK!")
    process.exit(1)
  }
}