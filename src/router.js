//import Vue from "vue";
import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home";
import About from "./views/About";
import Error from "./views/Error";

//Vue.use(Router);
const history = createWebHistory();
export default createRouter({
  history,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/:catchAll(.*)",
      name: "Error",
      component: Error,
    },
  ],
});
