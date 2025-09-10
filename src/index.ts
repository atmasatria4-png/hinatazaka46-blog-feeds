import type { StateData } from "./types/state"
import { loadLastSeen, saveLastSeen } from "./utils/lastSeen"
import { log } from "./utils/logger"
import { validateEnvironment } from "./utils/validation"
import { config } from "./config"
import { blogChecking } from "./services/blogService"
import { greetingCardChecking } from "./services/greetingCardService"

export const main = async (): Promise<void> => {
  try {
    validateEnvironment()
    log.base("🚀 Starting...")

    const stateData: StateData = loadLastSeen()

    log.check(`Blog checking...`)
    stateData.lastSeen.blog ??= {}
    await Promise.allSettled(
      config.app.memberIds.map(memberId => blogChecking(memberId, stateData.lastSeen.blog)),
    )
    log.success("Done blog checking~");

    log.check(`Greeting card checking...`)
    stateData.lastSeen.greetingCard ??= {}
    await Promise.allSettled(
      config.app.memberIds.map(memberId => greetingCardChecking(memberId, stateData.lastSeen.greetingCard)),
    )
    log.success("Done greeting card checking~");

    saveLastSeen(stateData.lastSeen)
    log.base("🚀 Tasks completed successfully!")
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    log.error(`Critical error in main process: ${errorMessage}`)
    process.exit(1)
  }
}

main()