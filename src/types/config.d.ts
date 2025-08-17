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
  element: string;
}

export interface Config {
  app: AppConfig;
  discord: DiscordConfig;
  blog: BlogConfig;
}