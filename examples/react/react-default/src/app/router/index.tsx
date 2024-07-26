import { useEffect } from "react"
import { createBrowserRouter, useNavigate } from "react-router-dom"
import { useLangSwitcher } from "../../shared/tools/lang"
import { LayoutRoot } from "./layouts/LayoutRoot"
import { PageHome } from "./pages/PageHome.tsx"

export function RedirectToLanguage() {
  const langSwitcher = useLangSwitcher()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/${langSwitcher.value}`, { replace: true })
  }, [langSwitcher.value, navigate])

  return null
}

const routes = [
  {
    path: "/",
    element: <RedirectToLanguage />,
  },
  {
    path: "/:lang",
    element: <LayoutRoot />,
    children: [
      {
        path: "",
        element: <PageHome />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
