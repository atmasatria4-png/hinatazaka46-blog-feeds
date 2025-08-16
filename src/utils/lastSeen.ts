import { readFileSync, writeFileSync } from "fs"
import { STATE_FILE } from "../constants"
import type { StateData } from "../types/state"

export class StateFileError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "StateFileError"
  }
}

export const loadLastSeen = (): string | null => {
  try {
    const data: string = readFileSync(STATE_FILE, "utf-8")
    const parsed: StateData = JSON.parse(data)

    if (typeof parsed.lastSeen !== "string") throw new StateFileError("❌ Invalid state file format: lastSeen must be a string")

    return parsed.lastSeen
  } catch (error: any) {
    if (error instanceof SyntaxError) throw new StateFileError("❌ State file contains invalid JSON", error)
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null
    throw new StateFileError("❌ Failed to load last seen state", error)
  }
}

export const saveLastSeen = (latest: string): void => {
  if (!latest || typeof latest !== "string") throw new StateFileError("❌ Invalid latest value: must be a non-empty string")
  
  try {
    const stateData: StateData = {
      lastSeen: latest,
      lastUpdated: new Date().toISOString()
    }
    
    writeFileSync(STATE_FILE, JSON.stringify(stateData, null, 2))
  } catch (error) {
    throw new StateFileError("❌ Failed to save last seen state", error)
  }
}