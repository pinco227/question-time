import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Question from "@/views/Question.vue"
import AnswerEditor from "@/views/AnswerEditor.vue"
import QuestionEditor from "@/views/QuestionEditor.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/question/:slug",
    name: "question",
    component: Question,
    props: true
  },
  {
    path: "/ask/:slug?",
    name: "question-editor",
    component: QuestionEditor,
    props: true
  },
  {
    path: "/answer/:id",
    name: "answer-editor",
    component: AnswerEditor,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
