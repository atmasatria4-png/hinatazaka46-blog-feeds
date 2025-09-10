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

interface IdolConfig {
  url: string;
  author: {
    name: string;
    kana: string;
  };
}

interface BlogConfig extends IdolConfig {
  title: string;
  postedAt: string;
  entry: string;
}

interface GreetingCardConfig extends IdolConfig {
  card: string;
}

export interface Config {
  app: AppConfig;
  discord: DiscordConfig;
  blog: BlogConfig;
  greetingCard: GreetingCardConfig;
}