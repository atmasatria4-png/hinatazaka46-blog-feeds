import type { Blog } from "./types/blog"
import { getLatestBlog } from "./utils/blog"
import { notifyDiscord } from "./utils/discord"
import { loadLastSeen, saveLastSeen } from "./utils/lastSeen"
import { log } from "./utils/logger"
import { validateEnvironment } from "./utils/validation"

const main = async (): Promise<void> => {
  try {
    validateEnvironment()

    const lastSeen: string | null = loadLastSeen()
    const blog: Blog = await getLatestBlog()

    if (blog.id !== lastSeen) {
      log(`🔔 New blog detected: ${blog.title}`)
      await notifyDiscord(blog)
      saveLastSeen(blog.id)
      log(`✅ Notification sent and state saved.`)
    } else {
      log(`✅ No new blog.`)
    }
  } catch (error) {
    console.error("❌ Error in main process:", error)
    process.exit(1)
  }
}

main()