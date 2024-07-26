import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useLangSwitcher } from "../../../../shared/tools/lang"

export function ContainerLang() {
  const langSwitcher = useLangSwitcher()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const options = langSwitcher.langOptions.map(
    (o: { value: string; label: string }) => {
      return (
        <option value={o.value} key={o.value}>
          {o.label}
        </option>
      )
    },
  )

  const buttons = langSwitcher.langOptions.map(
    (o: { value: string; label: string }) => {
      return (
        <button
          onClick={() => langSwitcher.switch(o.value)}
          key={o.value}
          style={{ opacity: langSwitcher.value === o.value ? 1 : 0.5 }}
        >
          {o.label}
        </button>
      )
    },
  )

  function handleChangeLange(evt: any) {
    langSwitcher.switchUrl(evt.target.value, navigate, location, params)
  }
  return (
    <div>
      <div>Lang with URL (/en, /fr)</div>

      <div>
        <select
          name="lang"
          id="field-lang"
          value={langSwitcher.value}
          onChange={handleChangeLange}
        >
          {options}
        </select>
      </div>
      <div>Message: {t("hello")}</div>

      <div>
        Lang without URL (your should disable settings for router (redirect &
        middleware))
      </div>

      <div>{buttons}</div>
      <div>Message: {t("hello")}</div>
    </div>
  )
}
