import type { Logger } from "../types/log";

export const log: Logger = {
  base: (msg: string): void => console.log(`[INFO ${new Date().toISOString()}] ${msg}`),
  info: (msg: string): void => console.log(`[INFO ${new Date().toISOString()}] ✨ ${msg}`),
  success: (msg: string): void => console.log(`[INFO ${new Date().toISOString()}] ✅ ${msg}`),
  warn: (msg: string): void => console.log(`[INFO ${new Date().toISOString()}] ⚠️ ${msg}`),
  error: (msg: string): void => console.log(`[INFO ${new Date().toISOString()}] ❌ ${msg}`),
}