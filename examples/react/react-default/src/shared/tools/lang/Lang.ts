import { LangSwitcher } from "@beautylips/be-lang-switcher"
import i18n from "i18next"
import Cookies from "js-cookie"
import { useEffect, useReducer } from "react"
import { initReactI18next } from "react-i18next"
import { NavigateFunction, Params } from "react-router"
import { Location } from "react-router-dom"
import EN from "./translate/en.json"
import FR from "./translate/fr.json"

i18n.use(initReactI18next).init({
  resources: {
    en: EN,
    fr: FR,
  },
  ns: ["translation"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

const pluginI18n = i18n

type Switcher = ReturnType<typeof LangSwitcher>

export let langSwitcher: Switcher

export function useLangSwitcher() {
  const rerender = useReducer(() => ({}), {})[1]

  useEffect(() => {
    if (!langSwitcher) {
      // @ts-ignore
      langSwitcher = LangSwitcher({
        langOptions: [
          { value: "en", label: "EN" },
          { value: "fr", label: "FR" },
        ],
        plugin: pluginI18n,
        langFallback: "en",
        langInit: "en",
        langReadStrategy: { cookies: true, storage: true, navigator: true },
        langKeyStorage: "lang",
        contextUser: {
          hi: "langSwitcher",
        },
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
          rerender()
        },
        onSwitchLang: async (switcher: Switcher) => {
          // *****************
          // your switch lang action
          // your lazy load file action
          // *****************
          const translate = (await import(`./translate/${switcher.value}.json`))
            .default
          i18n.addResourceBundle(switcher.value, "translation", translate)
          i18n.changeLanguage(switcher.value)
        },
        handleSwitchUrl(
          //@ts-ignore
          switcher: Switcher,
          value: string,
          navigate: NavigateFunction,
          location: Location,
          params: Params,
        ) {
          // *****************
          // your switch url action helper
          // *****************
          const currentPath = location.pathname
          const arr = currentPath.split("/").filter(Boolean)

          if (params.lang) {
            arr[0] = value
          } else {
            arr.unshift(value)
          }

          const newPath = `/${arr.join("/")}`

          navigate({
            pathname: newPath,
            search: location.search,
          })
        },
        onError(switcher: Switcher) {
          // *****************
          // your error action
          // *****************
          console.log(switcher.error)
        },
      })

      langSwitcher.init()
    }
  }, [rerender])

  return langSwitcher
}
