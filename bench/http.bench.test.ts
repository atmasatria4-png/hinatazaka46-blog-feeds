import { test } from "bun:test"
import { httpClient } from "../src/utils/http"

const REPETITION: number = 10000

// @ts-ignore
global.fetch = () => Promise.resolve({
  ok: true,
  text: () => Promise.resolve("こんにちは〜"),
} as Partial<Response> as Response)

test("Benchmark of httpClient.get", async () => {
  const start = performance.now()

  for (let i = 0; i < REPETITION; i++) 
    await httpClient.get("http://example.com")

  const end = performance.now()

  console.log(`httpClient.get x${REPETITION} took ${(end - start).toFixed(2)}ms`)
})

test("Benchmark of httpClient.post", async () => {
  const start = performance.now()

  for (let i = 0; i < REPETITION; i++) 
    await httpClient.post("http://example.com/webhook", {content: "OK"})

  const end = performance.now()

  console.log(`httpClient.post x${REPETITION} took ${(end - start).toFixed(2)}ms`)
})