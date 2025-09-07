import { existsSync, readFileSync, writeFileSync } from "fs"
import type { StateData } from "../types/state"
import type { LastSeen } from "../types/seen"
import { config } from "../config"

export class StateFileError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "StateFileError"
  }
}

export const loadLastSeen = (): StateData => {
  try {
    if (existsSync(config.app.stateFile)) {
      const data: string = readFileSync(config.app.stateFile, "utf-8")
      const parsed: StateData = JSON.parse(data)

      if (typeof parsed.lastSeen !== "object") throw new StateFileError("❌ Invalid state file format: lastSeen must be an object")

      return parsed
    }

    return {
      lastSeen: {},
      lastUpdated: undefined
    }
  } catch (error: any) {
    if (error instanceof SyntaxError) throw new StateFileError("❌ State file contains invalid JSON", error)
    throw new StateFileError("❌ Failed to load last seen state", error)
  }
}

export const saveLastSeen = (members: LastSeen): void => {
  if (!members || typeof members !== "object") throw new StateFileError("❌ Invalid latest value: must be a non-empty object")

  try {
    const stateData: StateData = {
      lastSeen: members,
      lastUpdated: new Date().toISOString()
    }

    writeFileSync(config.app.stateFile, JSON.stringify(stateData, null, 2))
  } catch (error) {
    throw new StateFileError("❌ Failed to save last seen state", error)
  }
}