import type { LastSeen } from "./seen"

export interface StateData {
  lastSeen: LastSeen
  lastUpdated?: string
}