import { config } from "../config"

export class HttpError extends Error {
  constructor(
    public url: string,
    public status: number,
    public body?: string,
  ) {
    super(`Request to ${url} failed with status ${status}`)
    this.name = "HttpError"
  }
}

export const httpClient = {
  get: async (url: string): Promise<string> => {
    const res = await fetch(url)
    if (!res.ok) {
      const body = await res.text().catch(() => undefined)
      throw new HttpError(url, res.status, body)
    }

    return res.text()
  },
  post: async (url: string, body: unknown): Promise<void> => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": config.discord.userAgent },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const errorText = await res.text().catch(() => undefined)
      throw new HttpError(url, res.status, errorText)
    }
  }
}