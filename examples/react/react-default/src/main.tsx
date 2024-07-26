import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/router"
import { useLangSwitcher } from "./shared/tools/lang"

function Init() {
  const langSwitcher = useLangSwitcher()

  if (!langSwitcher) {
    return null
  }

  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Init />
  </React.StrictMode>,
)
