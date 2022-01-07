<template>
<header>

    <h1>EasyPoll</h1>
    <div class="pollName" v-if="startStudent">
    <p>{{uiLabels.pollId}}:{{pollId}}</p>
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  </header>
  <div class ="finishDiv" v-if="isFinished && startStudent">
    <h2>{{uiLabels.pollCompleted}}</h2>
    <p style ="font-weight:bold">{{uiLabels.youAns}}:</p>
    <p v-for="(answer,key) in answers" v-bind:key="answer">
     {{uiLabels.q}} {{key+1}}: {{answer}}
      </p>
      <div>
       <router-link v-bind:to="'//'" tag="button">
              <button class="startRouter">{{uiLabels.backToStart}}</button>
            </router-link>
            </div>
  </div>

  <div class = "ifNotStart" v-if="!startStudent">
    wait till host starts the poll
    {{startStudent}}
  </div>

</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Poll',
  components: {
    Question
  },
  data: function () {
    return {
      question: {
        q: "",
        a: [],
      },
      lang:"",
      uiLabels:{},
      result:"",
      answers:[],
      isFinished:false,
      pollId: "inactive poll",
      startStudent: true,
      //ändra denna till false
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;

    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    socket.on("allQuestions", (questions) => {
      this.questions = questions;
    });
    socket.on("startForStudents", (startStudent) => {
      this.startStudent = startStudent;
    })

  },


  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
      if (JSON.stringify(this.question)=== JSON.stringify(this.questions[this.questions.length-1])){
        this.isFinished = true;
      }
      this.answers.push(answer);

    },
  }
}
</script>

<style>

.finishDiv {
  display: inline-block;
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  height: 50vh;
  width: 100%;
  background-color: rgb(223, 158, 228);
  top: 5em;
  margin: 0 auto;
  border-radius: 25px;
}
.startRouter{
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 1em 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Lucida Console", "Monaco", monospace;
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  background-color: #ab87ee;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}

</style>
