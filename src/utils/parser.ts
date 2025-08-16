export const titleParser = (title: string): string => {
  if (!title) throw new Error("❌ There was nothing to parse")

  return title
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join("\n")
}