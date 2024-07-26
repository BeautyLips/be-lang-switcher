import {
  Attributor,
  Navigator,
  Storage,
} from "@be-lang-switcher/be-lang-switcher/lib/browser/index.js"
import {
  LangSwitcherCore,
  LangSwitcherCoreOptions,
} from "@be-lang-switcher/be-lang-switcher/lib/core/index.js"

export type LangSwitcherOptions = LangSwitcherCoreOptions & {
  navigator?: LangSwitcherCoreOptions["navigator"]
  attributor?: LangSwitcherCoreOptions["attributor"]
  storage?: LangSwitcherCoreOptions["storage"]
  langKeyStorage?: LangSwitcherCoreOptions["langKeyStorage"]
}

function LangSwitcher(options: LangSwitcherOptions) {
  return new LangSwitcherCore({
    navigator: options.navigator ?? new Navigator(),
    attributor: options.attributor ?? new Attributor(),
    storage: options.storage ?? new Storage(options.langKeyStorage ?? "lang"),
    cookies: options.cookies,
    langOptions: options.langOptions,
    langInit: options.langInit,
    langFallback: options.langFallback,
    langReadStrategy: options.langReadStrategy,
    langKeyStorage: options.langKeyStorage ?? "lang",
    plugin: options.plugin,
    contextUser: options.contextUser,
    onSwitchLang: options.onSwitchLang,
    onUpdate: options.onUpdate,
    onError: options.onError,
    handleSwitchUrl: options.handleSwitchUrl,
  })
}

export { LangSwitcher, LangSwitcherCore }
