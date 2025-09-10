import type { Logger } from "../types/log";

const currentTime = new Date().toISOString()

export const log: Logger = {
  base: (msg: string): void => console.log(`[INFO ${currentTime}] ${msg}`),
  info: (msg: string): void => console.log(`[INFO ${currentTime}] ✨ ${msg}`),
  success: (msg: string): void => console.log(`[INFO ${currentTime}] ✅ ${msg}`),
  check: (msg: string): void => console.log(`[INFO ${currentTime}] 🔍 ${msg}`),
  warn: (msg: string): void => console.log(`[INFO ${currentTime}] ⚠️ ${msg}`),
  error: (msg: string): void => console.log(`[INFO ${currentTime}] ❌ ${msg}`),
}