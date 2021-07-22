<template>
  <div id="app">
    <NavbarComponent />
    <div class="container-xl content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
  },
};
</script>

<style>
html,
body {
  height: 100%;
  font-family: "Playfair Display", serif;
  background-color: #ddd;
}
.content-container {
  background-color: #fff;
}
.btn:focus {
  box-shadow: none !important;
}
</style>
