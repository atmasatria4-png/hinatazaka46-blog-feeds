export const titleParser = (title: string): string => title
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .join("\n")