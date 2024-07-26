import { LangSwitcher } from "@beautylips/be-lang-switcher"
import Cookies from "js-cookie"
import { nextTick } from "vue"
import { createI18n } from "vue-i18n"
import type { Router } from "vue-router"

const pluginI18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
})

type Switcher = ReturnType<typeof LangSwitcher>

export const langSwitcher: Switcher = LangSwitcher({
  langOptions: [
    { value: "en", label: "EN" },
    { value: "fr", label: "FR" },
  ],
  plugin: pluginI18n,
  contextUser: {
    hi: "langSwitcher",
  },
  langFallback: "en",
  langInit: "en",
  langReadStrategy: { cookies: true, storage: true, navigator: true },
  langKeyStorage: "lang",
  cookies: {
    save(value: string) {
      Cookies.set("lang", value, { expires: 7 })
    },
    extract() {
      return Cookies.get("lang")
    },
  },
  //@ts-ignore
  onUpdate(switcher: Switcher) {
    // *****************
    // your binding framework action
    // *****************
  },
  onSwitchLang: async (switcher: Switcher) => {
    // *****************
    // your switch lang action
    // your lazy load file action
    // *****************
    const translate = (await import(`./translate/${switcher.value}.json`))
      .default

    switcher.plugin.global.setLocaleMessage(switcher.value, translate)

    if (switcher.plugin.mode === "legacy") {
      switcher.plugin.global.locale = switcher.value
    } else {
      // @ts-ignore
      switcher.plugin.global.locale.value = switcher.value
    }

    await nextTick()
  },
  handleSwitchUrl(switcher: Switcher, value: string, router: Router) {
    // *****************
    // your switch url action helper
    // *****************
    const currentRoute = router.currentRoute.value
    const currentPath = currentRoute.path

    const arr = currentPath.split("/").filter(Boolean)
    if (currentRoute.params.lang) {
      arr[0] = value
    } else {
      arr.unshift(value)
    }

    const newPath = `/${arr.join("/")}`
    return router.replace({
      path: newPath,
      query: currentRoute.query,
    })
  },
  onError(switcher: Switcher) {
    // *****************
    // your error action
    // *****************
    console.log(switcher.error)
  },
})
