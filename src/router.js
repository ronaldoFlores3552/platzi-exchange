//import Vue from "vue";
import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home";

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
  ],
});
