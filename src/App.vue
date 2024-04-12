<template>
  <main>
    <px-header></px-header>
    <px-assets-table />
  </main>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue"; // importamos el componente HelloWorld del template
import PxHeader from "@/components/PxHeader";
import PxAssetsTable from "@/components/PxAssetsTable";

export default {
  name: "App",
  components: {
    //HelloWorld, // lo declaramos en components y asi podemos usarlo como en el template
    PxHeader,
    PxAssetsTable,
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
