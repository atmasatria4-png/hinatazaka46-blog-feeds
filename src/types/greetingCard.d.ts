import type { IdolConfig } from "./config"

export interface GreetingCard extends IdolConfig {
  readonly id: string
  readonly month: number
  greeting?: string
}