import type { Blog } from "./types/blog"
import type { StateData } from "./types/state"
import { getLatestBlog } from "./services/blogService"
import { notifyDiscord } from "./services/discordService"
import { loadLastSeen, saveLastSeen } from "./utils/lastSeen"
import { log } from "./utils/logger"
import { validateEnvironment } from "./utils/validation"
import { config } from "./config"

const processMember = async (memberId: number, stateData: StateData): Promise<void> => {
  try {
    const blog: Blog = await getLatestBlog(memberId)
    const latestBlogId = stateData.lastSeen[memberId]!

    if (blog.id !== latestBlogId) {
      log.base(`🔔 New blog detected: ${blog.title}`)

      await notifyDiscord(blog)
      stateData.lastSeen[memberId] = blog.id

      log.success(`Member ${memberId}: notification sent and state saved`)
    } else {
      log.info(`Member ${memberId}: no new blog`)
    }
  } catch (error: any) {
    log.error(`Failed to process member ${memberId}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const main = async (): Promise<void> => {
  try {
    validateEnvironment()
    log.base("🚀 Starting blog monitor...")

    const stateData: StateData = loadLastSeen()

    await Promise.allSettled(
      config.app.memberIds.map(memberId => processMember(memberId, stateData)),
    )

    saveLastSeen(stateData.lastSeen)
    log.success("Blog monitor completed successfully")
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    log.error(`Critical error in main process: ${errorMessage}`)
    process.exit(1)
  }
}

main()