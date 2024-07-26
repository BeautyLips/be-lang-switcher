import { Extractor } from "../interfaces/index.js"

export class Navigator implements Extractor {
  extract(): string | undefined {
    if (typeof navigator !== "undefined") {
      const lang =
        navigator.language ||
        navigator.languages[0] ||
        // @ts-ignore
        navigator.userLanguage

      if (lang) {
        return lang.split("-")[0].toLowerCase()
      }
    }

    return undefined
  }
}
