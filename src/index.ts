import { MEMBER_IDS } from "./constants"
import type { Blog } from "./types/blog"
import type { StateData } from "./types/state"
import { getLatestBlog } from "./services/blogService"
import { notifyDiscord } from "./services/discordService"
import { loadLastSeen, saveLastSeen } from "./utils/lastSeen"
import { log } from "./utils/logger"
import { validateEnvironment } from "./utils/validation"

const processMember = async (memberId: number, stateData: StateData): Promise<void> => {
  try {
    const blog: Blog = await getLatestBlog(memberId)
    const latestBlogId = stateData.lastSeen[memberId]!

    if (blog.id !== latestBlogId) {
      log(`🔔 New blog detected: ${blog.title}`)

      await notifyDiscord(blog)
      stateData.lastSeen[memberId] = blog.id

      log(`✅ Member ${memberId}: notification sent and state saved`)
    } else {
      log(`✨ Member ${memberId}: no new blog`)
    }
  } catch (error: any) {
    log(`❌ Failed to process member ${memberId}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const main = async (): Promise<void> => {
  try {
    validateEnvironment()
    log("🚀 Starting blog monitor...")

    const stateData: StateData = loadLastSeen()

    await Promise.allSettled(
      MEMBER_IDS.map(memberId => processMember(memberId, stateData))
    )

    saveLastSeen(stateData.lastSeen)
    log("✅ Blog monitor completed successfully")
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    log(`❌ Critical error in main process: ${errorMessage}`)
    process.exit(1)
  }
}

main()