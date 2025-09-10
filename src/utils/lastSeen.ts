import { existsSync, readFileSync, writeFileSync } from "fs"
import { config } from "../config"
import type { LastSeen, StateData } from "../types/app"

export class StateFileError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "StateFileError"
  }
}

export const loadLastSeen = (): StateData => {
  const defaultState: StateData = {
    lastSeen: {
      blog: {},
      greetingCard: {},
    },
    lastUpdated: null,
  }

  if (!existsSync(config.app.stateFile)) return defaultState

  try {
    const data = readFileSync(config.app.stateFile, "utf-8")

    if (!data) return defaultState

    const parsed = JSON.parse(data) as StateData

    if (!parsed || typeof parsed !== "object" || typeof parsed.lastSeen !== "object") throw new StateFileError("❌ Invalid state file format: lastSeen must be an object")

    return parsed
  } catch (error) {
    if (error instanceof StateFileError) throw new StateFileError("❌ State file contains invalid JSON", error)
    throw new StateFileError("❌ Failed to load last seen state", error)
  }
}

export const saveLastSeen = (features: LastSeen): void => {
  if (!features || typeof features !== "object") throw new StateFileError("❌ Invalid latest value: must be a non-empty object")

  try {
    const stateData: StateData = {
      lastSeen: features,
      lastUpdated: new Date().toISOString()
    }

    writeFileSync(config.app.stateFile, JSON.stringify(stateData, null, 2))
  } catch (error) {
    throw new StateFileError("❌ Failed to save last seen state", error)
  }
}