import { DISCORD_WEBHOOK } from "./constants"
import type { Blog } from "./types/blog"
import { getLatestBlog } from "./utils/blog"
import { notifyDiscord } from "./utils/discord"
import { loadLastSeen, saveLastSeen } from "./utils/lastSeen"

if (!DISCORD_WEBHOOK) {
  console.error("❌ Missing DISCORD_WEBHOOK!")
  process.exit(1)
}

const main = async (): Promise<void> => {
  const lastSeen: string | null = loadLastSeen()
  const blog: Blog = await getLatestBlog()

  if (blog.id !== lastSeen) {
    console.log("🔔 New blog detected:", blog.title)
    await notifyDiscord(blog)
    saveLastSeen(blog.id)
  } else {
    console.log("✅ No new blog.")
  }
}

main()