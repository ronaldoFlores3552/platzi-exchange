<template>
  <main>
    <px-header></px-header>
    <!--este router será lo que se reemplazará al momento de acceder a las rutas-->
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue"; // importamos el componente HelloWorld del template
import PxHeader from "@/components/PxHeader";

export default {
  name: "App",
  components: {
    //HelloWorld, // lo declaramos en components y asi podemos usarlo como en el template
    PxHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
