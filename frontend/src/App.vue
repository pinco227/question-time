<template>
  <main>
    <NavbarComponent />
    <div class="container-xl content-container">
      <router-view />
    </div>
  </main>
</template>

<script>
import { apiService } from "@/common/api.service";
import NavbarComponent from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
  },
  methods: {
    async setUserInfo() {
      const data = await apiService("/api/user/");
      const requestUser = data["username"];
      window.localStorage.setItem("username", requestUser);
    },
  },
  created() {
    this.setUserInfo();
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
  margin: 1.5rem auto;
  padding: 2rem;
  border-radius: 1.5rem;
}
.btn:focus {
  box-shadow: none !important;
}
</style>
