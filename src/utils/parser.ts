export class ParserError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "ParserError"
  }
}

export const titleParser = (title: string): string => {
  if (!title) throw new ParserError("❌ There was nothing to parse")

  return title
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join("\n")
}