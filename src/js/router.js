import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../routes/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../routes/About.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () => import("../routes/Jobs.vue"),
  },
  {
    path: "/learning",
    name: "learning",
    component: () => import("../routes/Learning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../routes/Profile.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../routes/Login.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
