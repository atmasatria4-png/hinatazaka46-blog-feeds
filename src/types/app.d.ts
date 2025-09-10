import type { IdolConfig } from "./config"

export type MemberIds = Record<string, string>

export interface Blog extends IdolConfig {
  readonly id: string
  readonly time: string
  readonly title: string
}

export interface GreetingCard extends IdolConfig {
  readonly id: string
  readonly month: number
  greeting?: string
}

export interface LastSeen {
  blog: MemberIds;
  greetingCard: MemberIds;
}

export interface StateData {
  lastSeen: LastSeen
  lastUpdated?: string | null
}

export interface ElementParser {
  text: string;
  link?: string;
}