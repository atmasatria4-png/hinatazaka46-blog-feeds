import { expect, test, mock } from "bun:test"
import { httpClient, HttpError } from "./http"
import { config } from "../config"

test("httpClient.get returns response text when successful", async () => {
  const mockFetch = mock(() => 
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve("こんにちは！"),
    } as Response)
  )

  // @ts-ignore
  global.fetch = mockFetch

  expect(httpClient.get("http://example.com")).resolves.toBe("こんにちは！")
  expect(mockFetch).toHaveBeenCalledTimes(1)
})

test("httpClient.get throws HttpError on failure", async () => {
  const mockFetch = mock(() => 
    Promise.resolve({
      ok: false,
      status: 500,
      text: () => Promise.resolve("server error")
    } as Response)
  )

  // @ts-ignore
  global.fetch = mockFetch

  expect(httpClient.get("http://example.com")).rejects.toBeInstanceOf(HttpError)
})

test("httpClient.get handles error when res.text() throws", async () => {
  const mockFetch = mock(() =>
    Promise.resolve({
      ok: false,
      status: 400,
      text: () => Promise.reject(new HttpError("http://example.com", 400, undefined)),
    } as Response)
  )

  // @ts-ignore
  global.fetch = mockFetch

  expect(httpClient.get("http://example.com"))
    .rejects
    .toEqual(new HttpError("http://example.com", 400, undefined))
})

test("httpClient.post announces a blog when the latest blog found", async () => {
  const mockFetch = mock(() => Promise.resolve({ok: true} as Response))

  // @ts-ignore
  global.fetch = mockFetch

  const payloads = {content: "OK"}
  await httpClient.post("http://example.com/webhook", payloads)

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith("http://example.com/webhook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": config.discord.userAgent,
    },
    body: JSON.stringify(payloads),
  })
})

test("httpClient.post throws HttpError on failure", async () => {
  const mockFetch = mock(() => 
      Promise.resolve({
      ok: false,
      text: () => Promise.resolve("bad request"),
      status: 400,
    } as Response)
  )

  // @ts-ignore
  global.fetch = mockFetch

  const payloads = {content: "OK"}

  expect(httpClient.post("http://example.com", payloads)).rejects.toBeInstanceOf(HttpError)
})

test("httpClient.post handles error when res.text() throws", async () => {
  const mockFetch = mock(() =>
    Promise.resolve({
      ok: false,
      status: 400,
      text: () => Promise.reject(new HttpError("http://example.com/webhook", 400, undefined)),
    } as Response)
  )

  // @ts-ignore
  global.fetch = mockFetch

  const payloads = {content: "OK"}

  expect(httpClient.post("http://example.com/webhook", payloads))
    .rejects
    .toEqual(new HttpError("http://example.com/webhook", 400, undefined))
})