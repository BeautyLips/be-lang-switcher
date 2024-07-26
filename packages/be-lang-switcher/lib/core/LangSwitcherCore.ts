"use strict"

import { Extractor, Saver } from "../interfaces/index.js"

export interface LangSwitcherCoreOptions {
  readonly navigator: Extractor
  readonly attributor: Saver
  readonly storage: Extractor & Saver
  readonly cookies?: Extractor & Saver

  readonly langOptions: LangOption[]
  readonly langInit: Lang
  readonly langFallback: Lang
  readonly langKeyStorage: string
  readonly langReadStrategy?: Partial<LangReadStrategy>

  plugin?: any
  contextUser?: any

  onUpdate?: (switcher: LangSwitcherCore) => any | Promise<any>
  onSwitchLang?: (switcher: LangSwitcherCore) => any | Promise<any>
  onError?: (switcher: LangSwitcherCore) => any | Promise<any>
  handleSwitchUrl?: (
    switcher: LangSwitcherCore,
    ...args: any[]
  ) => any | Promise<any>
}

export type Lang = string

export type LangOption = {
  value: string
  [key: string]: any
}

export interface LangReadStrategy {
  cookies: boolean
  storage: boolean
  navigator: boolean
}

export class LangSwitcherCore {
  readonly navigator: Extractor
  readonly attributor: Saver
  readonly storage: Extractor & Saver
  readonly cookies?: Extractor & Saver

  readonly langOptions: LangOption[]
  readonly langInit: Lang
  readonly langFallback: Lang
  readonly langReadStrategy: Partial<LangReadStrategy>

  plugin?: any
  contextUser?: any
  error: Error | null
  #lang: LangOption

  #updateCb?: (switcher: this) => any | Promise<any>
  #switchCb?: (switcher: this) => any | Promise<any>
  #errorCb?: (switcher: this) => any | Promise<any>
  #switchUrlCb?: (switcher: this, ...args: any[]) => any | Promise<any>

  constructor(options: LangSwitcherCoreOptions) {
    this.navigator = options.navigator
    this.attributor = options.attributor
    this.storage = options.storage
    this.cookies = options.cookies

    this.langOptions = options.langOptions
    this.langInit = options.langInit
    this.langFallback = options.langFallback
    this.langReadStrategy = Object.assign(
      {
        cookies: false,
        storage: true,
        navigator: true,
      },
      options.langReadStrategy ?? {},
    )

    this.plugin = options.plugin
    this.contextUser = options.contextUser
    this.error = null

    this.#lang = this.#findLang(this.langInit)

    this.#updateCb = options.onUpdate
    this.#switchCb = options.onSwitchLang
    this.#errorCb = options.onError
    this.#switchUrlCb = options.handleSwitchUrl
  }

  async init() {
    try {
      let extractLang

      if (!extractLang && this.langReadStrategy.cookies && this.cookies) {
        extractLang = await this.cookies.extract()
      }

      if (!extractLang && this.langReadStrategy.storage) {
        extractLang = this.storage.extract()
      }

      if (!extractLang && this.langReadStrategy.navigator) {
        extractLang = this.navigator.extract()
      }

      if (this.support(extractLang)) {
        this.#lang = this.#findLang(extractLang)
      } else {
        this.#lang = this.#findLang(this.langFallback)
      }

      if (this.#updateCb) {
        await this.#updateCb(this)
      }

      if (this.#switchCb) {
        await this.#switchCb(this)
      }
    } catch (error) {
      this.error = error as unknown as Error
      if (this.#errorCb) {
        this.#errorCb(this)
      }
    }
  }

  get lang(): LangOption {
    return this.#lang
  }

  get value(): Lang {
    return this.#lang.value
  }

  async switchUrl(...args: any[]) {
    if (this.#switchUrlCb) {
      return this.#switchUrlCb(this, ...args)
    } else {
      return undefined
    }
  }

  async switch(lang: LangOption | Lang | null | undefined) {
    try {
      if (!this.support(lang)) return

      this.#lang = this.#findLang(lang)
      this.attributor.save(this.value)

      if (this.langReadStrategy.cookies && this.cookies) {
        await this.cookies.save(this.value)
      }
      if (this.langReadStrategy.storage) {
        this.storage.save(this.value)
      }

      if (this.#updateCb) {
        await this.#updateCb(this)
      }
      if (this.#switchCb) {
        await this.#switchCb(this)
      }
    } catch (error) {
      this.error = error as unknown as Error
      if (this.#errorCb) {
        this.#errorCb(this)
      }
    }
  }

  support(lang: LangOption | Lang | null | undefined): boolean {
    if (lang === null || lang === undefined || lang === "") return false

    const l = typeof lang === "string" ? lang : lang?.value

    if (l) {
      return Boolean(this.langOptions.find((el) => el.value === l))
    } else {
      return false
    }
  }

  onUpdate(cb: (switcher: this) => any | Promise<any>) {
    if (this.#checkCb(cb)) {
      this.#updateCb = cb
    }
  }

  onSwitchLang(cb: (switcher: this) => any | Promise<any>) {
    if (this.#checkCb(cb)) {
      this.#switchCb = cb
    }
  }

  onError(cb: (switcher: this) => any | Promise<any>) {
    if (this.#checkCb(cb)) {
      this.#errorCb = cb
    }
  }

  #findLang(lang: LangOption | Lang | null | undefined) {
    if (typeof lang === "string") {
      return (
        this.langOptions.find((o) => o.value === lang) ||
        this.langOptions.find((o) => o.value === this.langFallback) ||
        this.langOptions[0]
      )
    } else if (lang?.value) {
      return (
        this.langOptions.find((o) => o.value === lang.value) ||
        this.langOptions.find((o) => o.value === this.langFallback) ||
        this.langOptions[0]
      )
    } else {
      return this.langOptions[0]
    }
  }

  #checkCb(cb: unknown): cb is (switcher: this) => any | Promise<any> {
    return typeof cb === "function"
  }
}
