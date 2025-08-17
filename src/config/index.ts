import type { Config } from "../types/config";

const BLOG_BASE_URL = "https://www.hinatazaka46.com";

export const config: Config = {
  discord: {
    webhook: process.env.DISCORD_WEBHOOK!,
    userAgent: "HinatazakaBlogMonitor/1.0"
  },
  blog: {
    url: `${BLOG_BASE_URL}/s/official/diary/member/list?ct=`,
    element: ".p-blog-entry__list a",
  },
  app: {
    baseUrl: BLOG_BASE_URL,
    stateFile: "last_seen.json",
    memberIds: [34],
  },
};