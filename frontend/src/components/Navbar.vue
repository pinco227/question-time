<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
    <div class="container-xl">
      <router-link :to="{ name: 'Home' }" class="navbar-brand"
        >QuestionTime
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Home' }"
              class="nav-link btn btn-sm btn-success text-white mx-1"
              >Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Home' }"
              class="nav-link btn btn-sm btn-danger text-white mx-1"
              >Add Question
            </router-link>
          </li>
          <li class="nav-item">
            <a
              href="/accounts/logout/"
              class="nav-link btn btn-sm btn-outline-secondary mx-1"
              >Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.mynavbar {
  border-bottom: 1px solid #000;
}
.navbar-brand {
  font-weight: bold;
  font-size: 130%;
}
.navbar-brand:hover {
  color: crimson !important;
}
</style>