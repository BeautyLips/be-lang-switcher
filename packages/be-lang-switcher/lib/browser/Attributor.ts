import { Saver } from "../interfaces/index.js"

export class Attributor implements Saver {
  save(value: string): void {
    if (document) {
      const element = window.document.querySelector("html")

      if (element) {
        element.setAttribute("lang", value)
      }
    }
  }
}
