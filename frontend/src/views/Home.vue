<template>
  <div class="home row">
    <div v-for="question in questions" :key="question.pk" class="col-12">
      <p class="mb-0">
        Posted by:
        <span class="question-author">{{ question.author }}</span>
      </p>
      <p class="mb-0">{{ question.created_at }}</p>
      <h2>
        <router-link
          :to="{ name: 'question', params: { slug: question.slug } }"
          class="question-link"
        >
          {{ question.content }}
        </router-link>
      </h2>
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
      let endpoint = "/api/questions/";
      apiService(endpoint).then((data) => {
        this.questions.push(...data.results);
      });
    },
  },
  created() {
    this.getQuestions();
    document.title = "QuestionTime";
  },
};
</script>

<style scoped>
.question-author {
  font-weight: bold;
  color: crimson;
}
.question-link {
  font-weight: bold;
  color: black;
  text-decoration: none;
}
.question-link:hover {
  color: #343a40;
}
</style>