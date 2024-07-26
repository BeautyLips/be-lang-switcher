import { Outlet } from "react-router-dom"
import { useLangGuard } from "../../../shared/tools/lang/useLangGuard.tsx"

export function LayoutRoot() {
  useLangGuard()

  return (
    <div>
      <Outlet />
    </div>
  )
}
