export interface Blog {
  readonly id: string
  // readonly author: string
  // readonly authorKana: string
  readonly author: {
    readonly name: string
    readonly kana: string
  }
  readonly time: string
  readonly title: string
  readonly url: string
}