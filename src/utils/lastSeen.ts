import { readFileSync, writeFileSync, existsSync } from "fs"
import { STATE_FILE } from "../constants"

export const loadLastSeen = (): string | null => {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, "utf-8")).lastSeen as string
  }
  return null
}

export const saveLastSeen = (latest: string): void => writeFileSync(STATE_FILE, JSON.stringify({ lastSeen: latest }, null, 2))
