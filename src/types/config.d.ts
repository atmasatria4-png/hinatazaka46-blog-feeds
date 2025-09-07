import type { LastSeen } from "./seen"

interface AppConfig {
  baseUrl: string;
  stateFile: string;
  memberIds: number[];
}

interface DiscordConfig {
  webhook: string;
  userAgent: string;
}

interface BlogConfig {
  url: string;
  author: string;
  postedAt: string;
  entry: string;
}

export interface Config {
  app: AppConfig;
  discord: DiscordConfig;
  blog: BlogConfig;
}