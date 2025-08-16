import { MEMBER_IDS } from "./constants"
import type { Blog } from "./types/blog"
import type { StateData } from "./types/state"
import { getLatestBlog } from "./utils/blog"
import { notifyDiscord } from "./utils/discord"
import { loadLastSeen, saveLastSeen } from "./utils/lastSeen"
import { log } from "./utils/logger"
import { validateEnvironment } from "./utils/validation"

const main = async (): Promise<void> => {
  try {
    validateEnvironment()

    const stateData: StateData = loadLastSeen()

    for (const memberId of MEMBER_IDS) {
      const blog: Blog = await getLatestBlog(memberId)
      const latestBlogId = stateData.lastSeen[memberId]!

      if (blog.id !== latestBlogId) {
        log(`🔔 New blog detected: ${blog.title}`)
        stateData.lastSeen[memberId] = blog.id
        await notifyDiscord(blog)
        log(`✅ Member ${memberId}: notification sent and state saved`)
      } else {
        log(`✅ Member ${memberId}: no new blog`)
      }
    }

    saveLastSeen(stateData.lastSeen)
  } catch (error) {
    console.error("❌ Error in main process:", error)
    process.exit(1)
  }
}

main()