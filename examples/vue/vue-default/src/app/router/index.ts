import LayoutAbout from "@/app/layouts/LayoutAbout/LayoutAbout.vue"
import LayoutDefault from "@/app/layouts/LayoutDefault/LayoutDefault.vue"
import { langGuard, langSwitcher } from "@/shared/tools/lang"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory("./"),
  routes: [
    {
      path: "/",
      redirect() {
        return langSwitcher.value
      },
      children: [
        {
          path: "/:lang",
          name: "LayoutDefault",
          component: LayoutDefault,

          children: [
            {
              path: "",
              name: "PageHome",
              component: () => import("@/app/pages/PageHome/PageHome.vue"),
            },

            {
              path: "lang",
              name: "PageLang",
              component: () => import("@/app/pages/PageLang/PageLang.vue"),
            },
          ],
        },

        {
          path: "/:lang/about",
          name: "LayoutAbout",
          component: LayoutAbout,

          children: [
            {
              path: "",
              name: "PageAbout",
              component: () => import("@/app/pages/PageAbout/PageAbout.vue"),
            },
          ],
        },
      ],
    },
  ],
})

langGuard(router)

export default router
