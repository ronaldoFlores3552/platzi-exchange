import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css"; //el @ se refiere a la raiz

//apra obtener algunos tips de producción
Vue.config.productionTip = false;

//instanciamos Vue
new Vue({
  render: (h) => h(App),
}).$mount("#app");
