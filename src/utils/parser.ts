import * as cheerio from "cheerio";
import type { ElementParser } from "../types/element";

export class ParserError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "ParserError"
  }
}

const textParser = (title: string): string => {
  if (!title) throw new ParserError("❌ There was nothing to parse")

  return title
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join("\n")
}

export const elementParser = (
  cheerio: cheerio.CheerioAPI,
  memberId: number,
  identifier: string,
  isHref: boolean = false,
): ElementParser => {
  try {
    const element = cheerio(identifier).first()
    if (element.length === 0) throw new ParserError(`❌ Member ${memberId}: no ${identifier} found on the page`)
    const text: string = textParser(element.text())

    if (!isHref) return { text }

    const link: string | undefined = element.attr("href")
    if (!link) throw new ParserError(`❌ Member ${memberId}: ${identifier} has no href attribute`)

    return { text, link }
  } catch (error: any) {
    if (error instanceof ParserError) throw error
    throw new ParserError(`❌ Parse Element: failed to parse ${identifier}`, error)
  }
}

export const timeParser = (time: string, sourceOffsetHours: number = 0): string => {
  if (!time) throw new ParserError("❌ Empty time string")

  const match = time.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2}) (\d{1,2}):(\d{2})$/)
  if (!match) throw new ParserError(`❌ Invalid time format: ${time}`)

  const [, y, m, d, h, min] = match
  let date

  const dateMs = Date.UTC(Number(y), Number(m) - 1, Number(d), Number(h) - (sourceOffsetHours ?? 0), Number(min));
  if (sourceOffsetHours) date = new Date(dateMs);
  else date = new Date(
    Number(y),
    Number(m) - 1,
    Number(d),
    Number(h),
    Number(min)
  )

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours().toString().padStart(2, "0")
  const minute = date.getMinutes().toString().padStart(2, "0")

  return `${year}年${month}月${day}日, ${hour}時${minute}分`
}