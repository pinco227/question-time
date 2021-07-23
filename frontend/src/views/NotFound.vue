<template>
  <div class="not-found">
    <h1 class="text-danger text-center">{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      message: "404 - Page Not Found",
    };
  },
};
</script>