import type { Config } from "../types/config";

const BASE_URL: string = "https://www.hinatazaka46.com";

export const config: Config = {
  discord: {
    webhook: process.env.DISCORD_WEBHOOK!,
    userAgent: "HinatazakaBlogMonitor/1.0"
  },
  blog: {
    url: `${BASE_URL}/s/official/diary/member/list?ct=`,
    author: {
      name: ".c-blog-member__name",
      kana: ".c-blog-member__kana",
    },
    title: ".c-blog-article__title",
    postedAt: ".c-blog-article__date",
    entry: ".p-blog-entry__list a",
  },
  greetingCard: {
    url: `${BASE_URL}/s/official/artist/`,
    author: {
      name: ".c-member__name--info",
      kana: ".c-member__kana",
    },
    card: ".gimg_wrap.sub > img",
  },
  app: {
    baseUrl: BASE_URL,
    stateFile: "last_seen.json",
    memberIds: [34, 36, 12, 13, 14, 18, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 35, 37, 34, 3000, 000],
  },
};
