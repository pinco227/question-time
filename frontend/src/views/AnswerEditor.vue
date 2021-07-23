<template>
  <div class="mt-2">
    <h1 class="mb-3">Edit your answer</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <textarea
          rows="3"
          v-model="answerBody"
          class="form-control"
          placeholder="What do you want to ask?"
        ></textarea>
        <p v-if="error" class="text-danger mt-2">{{ error }}</p>
      </div>
      <button type="submit" class="btn btn-success">Publish</button>
    </form>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service";
export default {
  name: "AnswerEditor",
  props: {
    id: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      questionSlug: null,
      answerBody: null,
      error: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.answerBody) {
        let endpoint = `/api/answers/${this.id}/`;
        apiService(endpoint, "PUT", { body: this.answerBody }).then(() => {
          this.$router.push({
            name: "question",
            params: { slug: this.questionSlug },
          });
        });
      } else {
        this.error = "You can't submit an empty asnwer!";
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    let endpoint = `/api/answers/${to.params.id}/`;
    let data = await apiService(endpoint);
    return next((vm) => {
      vm.answerBody = data.body;
      vm.questionSlug = data.question_slug;
    });
  },
};
</script>