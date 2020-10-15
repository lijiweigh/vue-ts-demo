import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

import Layout from "@/layout/index.vue"

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
      path: "/test",
      name: "Test",
      component: () => import("../views/test.vue")
  },
  {
      path: "/eleme",
      name: "Eleme",
      component: () => import("../views/eleme/index.vue")
  },
  {
      path: "/",
      redirect: "/dashboard",
      component: Layout,
      children: [
          {
              path: "dashboard",
              component: () => import("@/views/dashboard/index.vue"),
              name: "Dashboard",
              meta: {
                  title: "dashboard",
                  icon: "dashboard",
                  affix: true
              }
          }
      ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
