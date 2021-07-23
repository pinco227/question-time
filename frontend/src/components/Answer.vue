<template>
  <div class="single-answer col-12">
    <p class="text-muted">
      <strong>{{ answer.author }} &#8901; {{ answer.created_at }}</strong>
    </p>
    <p>{{ answer.body }}</p>
    <div v-if="isAnswerAuthor">
      <button class="btn btn-sm btn-outline-secondary me-1">Edit</button>
      <button
        class="btn btn-sm btn-outline-danger"
        @click="triggerDeleteAnswer"
      >
        Delete
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "AnswerComponent",
  props: {
    answer: {
      type: Object,
      required: true,
    },
    requestUser: {
      type: String,
      required: true,
    },
  },
  computed: {
    isAnswerAuthor() {
      return this.answer.author === this.requestUser;
    },
  },
  methods: {
    triggerDeleteAnswer() {
      this.$emit("delete-answer", this.answer);
    },
  },
};
</script>