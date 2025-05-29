<p align="center">
<img src="/art/beautylips-logo.svg" height="150">
</p>

<p align="center">
<a href="https://gurovdmitriy.github.io/vue-fuji/">
</a>
</p>

<h1 align="center">
be-lang-switcher
</h1>
<p align="center">
Framework independent language switcher
<p>

<br>
<br>

## Install

```sh
npm install @beautylips/be-lang-switcher
```

## Description

The lib serves as a language switcher,
manages the language detection in the browser, reading and storing it in the storage.

## Examples

Create instance (tools/lang/Lang.js):

```js
// create instance i18n from your favourite plugin
const pluginI18n = createI18n()

// create instance langSwitcher
export const langSwitcher = LangSwitcher({
  // display lang options in your component
  langOptions: [
    { value: "en", label: "EN" },
    { value: "fr", label: "FR" },
  ],
  // centralized settings
  plugin: pluginI18n,
  // centralized settings
  contextUser: {
    hi: "langSwitcher",
  },
  langFallback: "en",
  langInit: "en",
  // for manage reading and saving language
  langReadStrategy: { cookies: true, storage: true, navigator: true },
  langKeyStorage: "lang",
  // provide your favourite package cookies
  cookies: {
    save(value: string) {
      // call set your favourite cookies package
    },
    extract() {
      // return call get your favourite cookies package
    },
  },
  onUpdate(switcher) {
    // your binding framework action
  },
  onSwitchLang: async (switcher) => {
    // your switch lang action with your plugin i18n
    // your lazy load file action
  },
  handleSwitchUrl(switcher, value, router, otherAnyParam) {
    // your switch url action helper with your router
  },
  onError(switcher) {
    // your error action with switcher.error
  },
})
```

Usage in component (features/Lang/ContainerLang.tsx):

```jsx
export function ContainerLang() {
  const langSwitcher = useLangSwitcher()
  const { t } = useTranslation()

  const options = langSwitcher.langOptions.map((o) => {
    return (
      <option value={o.value} key={o.value}>
        {o.label}
      </option>
    )
  })

  return (
    <div>
      <div>Lang with URL (/en, /fr)</div>

      <div>
        <select
          name="lang"
          id="field-lang"
          value={langSwitcher.value}
          onChange={(evt) => langSwitcher.switch(evt.target.value)}
        >
          {options}
        </select>
      </div>
      <div>Message: {t("hello")}</div>
    </div>
  )
}
```

For usage with lang in url (/en/about):

- define handleSwitchUrl options in langSwitcher
- settings redirect in your router
- define router guard with langSwitcher.switch(lang) action
- toggle lang in your component with langSwitcher.switchUrl(lang) method

More examples:

- [react](https://github.com/BeautyLips/be-lang-switcher/blob/main/examples/react/react-default/src/shared/tools/lang/Lang.ts)
- [vue](https://github.com/BeautyLips/be-lang-switcher/blob/main/examples/vue/vue-default/src/shared/tools/lang/Lang.ts)

## API

LangSwitcherOptions interface:

```ts
interface LangSwitcherOptions {
  // optional, how read lang from navigator, works by default
  navigator?: Extractor
  // optional, how save lang to attr, works by default
  attributor?: Saver
  // optional, how read and save lang to localStorage, works by default
  storage?: Extractor & Saver
  // optional, how read and save lang to cookies, provide your own implementation
  cookies?: Extractor & Saver
  // example [{value: "en", label: "EN", type: 0}, {value: "fr", label: "FR", type: 1}]
  langOptions: { value: string }[]
  // example "en"
  langInit: string
  // example "en"
  langFallback: string
  // example "lang", works by default
  langKeyStorage?: string
  // optional, how detect, read and save lang value, works by default with { cookies: false, storage: true, navigator: true }
  langReadStrategy?: { cookies: boolean; storage: boolean; navigator: boolean }
  // your i18n plugin
  plugin?: Plugin
  // your any context
  contextUser?: ContextUser
  // binding your framework
  onUpdate?: (switcher: LangSwitcher) => any | Promise<any>
  // optional, switch lang action with your plugin i18n, lazy load file action
  onSwitchLang?: (switcher: LangSwitcher) => any | Promise<any>
  // optional, your switch url action helper with your router
  handleSwitchUrl?: (
    switcher: LangSwitcher,
    ...args: any[]
  ) => any | Promise<any>
  // optional, error action with switcher.error
  onError?: (switcher: LangSwitcher) => any | Promise<any>
}
```

Save & Read interfaces:

```ts
interface Extractor {
  extract(): string | undefined
}

interface Saver {
  save(value: string): void
}
```

LangSwitcher instance:

```ts
const langSwitcher = LangSwitcher({
  /*options: LangSwitcherOptions*/
})

// for first run
langSwitcher.init()

// read current value with format from your options like a {value: "en", label: "EN"}
langSwitcher.lang

// read current value with value format like a "en"
langSwitcher.value

// switch lang
langSwitcher.switch("en")

// switch lang with url helper
langSwitcher.switchUrl("en")

// support helper
langSwitcher.support("en")

// add or change cb after create instance if it is needed
langSwitcher.onUpdate((switcher: LangSwitcher) => {})
langSwitcher.onSwitchLang((switcher: LangSwitcher) => {})
langSwitcher.onError((switcher: LangSwitcher) => {})

// plugin i18n, for centralize settings
langSwitcher.plugin

// context, for centralize settings
langSwitcher.context

// options, for display options in your component
langSwitcher.langOptions
```

## Layers

The program is divided into layers,
for convenience you have access to the layers:

- core algorithm
- browser
- framework

LangSwitcher provide navigator, attributor, storage for you by default.
LangSwitcherCore - they must be provided.

For example the following is available version to you (layer core):

```js
// main or core version
import { LangSwitcher, LangSwitcherCore } from "@beautylips/be-lang-switcher"

const ls = LangSwitcher({
  /*options: LangSwitcherOptions*/
})
const lsc = new LangSwitcherCore({
  /*options: LangSwitcherCoreOptions*/
})
```

For example add your own implementation (layer browser):

```js
// main or core version
const options = {
  // Extractor interface
  navigator: {
    extract() {
      // your implementation extract lang from browser
    },
  },
  // Saver interface
  attributor: {
    save() {
      // your implementation set lang to attr
    },
  },
  // Extractor & Saver interface
  storage: {
    save() {
      // your implementation save lang to lc
    },
    extract() {
      // your implementation get lang from lc
    },
  },
  // Extractor & Saver interface
  cookies: {
    save() {
      // your implementation save lang to co
    },
    extract() {
      // your implementation get lang from co
    },
  },
  // other options...
}
```

Add implementation for binding framework (layer binding framework):

```js
// main or core version
const options = {
  onUpdate() {
    // binding your framework
  },
  // other options...
}
```

<br>
<br>

## License

[MIT](./LICENSE) License © 2024-Present [Dmitriy Gurov](https://github.com/GurovDmitriy)
<br>
Logo by [Prisyachev](https://t.me/prisyachev)
