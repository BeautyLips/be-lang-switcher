import { langSwitcher } from "@/shared/tools/lang"
import { createApp } from "vue"
import App from "./app/App.vue"
import router from "./app/router"
;(async () => {
  await langSwitcher.init()

  const app = createApp(App)
  app.use(router)
  app.use(langSwitcher.plugin)

  app.mount("#app")
})()
