import Vue from "vue"
import Router, { RouteConfig } from "vue-router"
import Layout from "@/layout/index.vue"

Vue.use(Router)

export const constantRoutes: RouteConfig[] = [
    {
        name: "Layout",
        path: "/",
        component: Layout
    }
]

export const asyncRoutes: RouteConfig[] = []

const createRouter = () => {
    return new Router({
        scrollBehavior(to, from, savedPosition) {
            if(savedPosition) {
                return savedPosition
            } else {
                return {x: 0, y: 0}
            }
        },
        routes: constantRoutes,
    })
}

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher
}

export default router