import { langSwitcher } from "@/shared/tools/lang"
import { type Router } from "vue-router"

export function langGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const langParams = to.params.lang as string

    if (langParams && typeof langParams === "string") {
      if (!langSwitcher.support(langParams)) {
        return next(`/${langSwitcher.value}`)
      } else {
        await langSwitcher.switch(langParams)
      }
    }

    return next()
  })
}
