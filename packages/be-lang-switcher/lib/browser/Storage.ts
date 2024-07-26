import { Extractor, Saver } from "../interfaces/index.js"

export class Storage implements Extractor, Saver {
  readonly #key: string

  constructor(key: string) {
    this.#key = key
  }

  save(value: string): void {
    if (typeof typeof localStorage !== undefined) {
      localStorage.setItem(this.#key, value)
    }
  }

  extract(): string | undefined {
    if (typeof localStorage === undefined) return undefined

    const value = localStorage.getItem(this.#key)

    if (value === null || value === undefined) return undefined

    return value
  }
}
