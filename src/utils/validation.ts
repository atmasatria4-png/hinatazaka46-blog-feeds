import { DISCORD_WEBHOOK } from "../constants"

export const validateEnvironment = (): void => {
  if (!DISCORD_WEBHOOK) {
    console.error("❌ Missing DISCORD_WEBHOOK!")
    process.exit(1)
  }
}