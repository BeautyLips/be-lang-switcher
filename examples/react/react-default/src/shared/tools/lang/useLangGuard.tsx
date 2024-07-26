import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useLangSwitcher } from "./Lang.ts"

export function useLangGuard() {
  const { lang } = useParams()
  const navigate = useNavigate()
  const langSwitcher = useLangSwitcher()

  useEffect(() => {
    if (lang && !langSwitcher.support(lang)) {
      navigate(`/${langSwitcher.value}`, { replace: true })
    } else if (lang) {
      langSwitcher.switch(lang)
    }
  }, [lang, navigate, langSwitcher])

  return null
}
