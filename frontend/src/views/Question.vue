<template>
  <div class="single-question mt-2 row">
    <h1>{{ question.content }}</h1>
    <QuestionActions v-if="isQuestionAuthor" :slug="question.slug" />
    <p class="mb-0">
      Posted by: <span class="author-name">{{ question.author }}</span> &#8901;
      {{ question.created_at }}
    </p>
    <hr />
    <div v-if="question.user_has_answered">
      <p class="answer-added">You've answered this question.</p>
    </div>
    <div v-else-if="showForm">
      <form class="card" @submit.prevent="onSubmit">
        <div class="card-header px-3">Share your knowledge!</div>
        <textarea
          rows="5"
          v-model="newAnswerBody"
          class="card-body"
          placeholder="Write your answer...."
        ></textarea>
        <div class="card-body bg-danger text-white fw-bold" v-if="error">
          <p class="m-0">
            <i class="fas fa-exclamation-triangle"></i> {{ error }}
          </p>
        </div>
        <div class="card-footer px-3 d-flex justify-content-between">
          <button type="submit" class="btn btn-sm btn-success">Submit</button>
          <button
            class="btn btn-sm btn-outline-danger"
            @click="showForm = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <button class="btn btn-sm btn-success mb-3" @click="showForm = true">
        Answer the Question
      </button>
    </div>
    <hr />
    <AnswerComponent
      v-for="answer in answers"
      :key="answer.id"
      :answer="answer"
      :requestUser="requestUser"
      @delete-answer="deleteAnswer"
    />
    <div class="my-4" v-if="next">
      <p v-show="loadingAnswers">...loading...</p>
      <button
        v-show="next"
        @click="getQuestionAnswers"
        class="btn btn-outline-success"
      >
        Load More...
      </button>
    </div>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service";
import AnswerComponent from "@/components/Answer.vue";
import QuestionActions from "@/components/QuestionActions.vue";
export default {
  name: "Question",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  components: {
    AnswerComponent,
    QuestionActions,
  },
  data() {
    return {
      question: {},
      answers: [],
      newAnswerBody: null,
      error: null,
      showForm: false,
      next: null,
      loadingAnswers: false,
      requestUser: null,
    };
  },
  computed: {
    isQuestionAuthor() {
      return this.question.author === this.requestUser;
    },
  },
  methods: {
    setPageTitle(title) {
      document.title = title;
    },
    setRequestUser() {
      this.requestUser = window.localStorage.getItem("username");
    },
    getQuestionData() {
      let endpoint = `/api/questions/${this.slug}/`;
      apiService(endpoint).then((data) => {
        this.setPageTitle(data.content);
        this.question = data;
      });
    },
    getQuestionAnswers() {
      let endpoint = `/api/questions/${this.slug}/answers/`;
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingAnswers = true;
      apiService(endpoint).then((data) => {
        this.answers.push(...data.results);
        this.loadingAnswers = false;
        if (data.next) {
          this.next = data.next;
        } else {
          this.next = null;
        }
      });
    },
    onSubmit() {
      if (this.newAnswerBody) {
        let endpoint = `/api/questions/${this.slug}/answer/`;
        let method = "POST";
        apiService(endpoint, method, { body: this.newAnswerBody }).then(
          (data) => {
            this.answers.unshift(data);
          }
        );
        this.newAnswerBody = null;
        this.showForm = false;
        this.question.user_has_answered = true;
        if (this.error) {
          this.error = null;
        }
      } else {
        this.error = "You can't submit an empty asnwer!";
      }
    },
    async deleteAnswer(answer) {
      let endpoint = `/api/answers/${answer.id}/`;
      let method = "DELETE";
      try {
        await apiService(endpoint, method);
        this.answers.splice(this.answers.indexOf(answer), 1);
        this.question.user_has_answered = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getQuestionData();
    this.getQuestionAnswers();
    this.setRequestUser();
  },
};
</script>

<style scoped>
.author-name {
  font-weight: bold;
  color: crimson;
}
.answer-added {
  font-weight: bold;
  color: seagreen;
}
</style>