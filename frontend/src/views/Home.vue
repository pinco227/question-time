<template>
  <div class="home">
    <div v-for="question in questions" :key="question.pk">
      <p class="mb-0">
        Posted by: <spa class="author-name">{{ question.author }}</spa>
      </p>
      <h2>{{ question.content }}</h2>
      <p>Answers: {{ question.answers_count }}</p>
      <hr />
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service";
export default {
  name: "Home",
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    getQuestions() {
      let endpoint = "api/questions/";
      apiService(endpoint).then((data) => {
        this.questions.push(...data.results);
      });
    },
  },
  created() {
    this.getQuestions();
  },
};
</script>

<style scoped>
.author-name {
  font-weight: bold;
  color: crimson;
}
</style>