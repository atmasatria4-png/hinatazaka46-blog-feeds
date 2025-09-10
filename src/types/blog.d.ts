import type { IdolConfig } from "./config"

export interface Blog extends IdolConfig {
  readonly id: string
  readonly time: string
  readonly title: string
}