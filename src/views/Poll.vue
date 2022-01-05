<template>
<header>

    <h1>EasyPoll</h1>
    <div class="pollName" v-if="startStudent">
    <p>PollId:{{pollId}}</p>
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  </header>

  <div class ="finishDiv" v-if="isFinished && startStudent">
    <h2>You completed the poll!</h2>
    <p style ="font-weight:bold">You answered:</p>
    <p v-for="(answer,key) in answers" v-bind:key="answer">
      Question {{key+1}}:{{answer}}
      </p>
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
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    socket.on("allQuestions", (questions) => {
      this.questions = questions;
    });
    socket.on("startForStudents", (update) => {
      this.startStudent = update.startStudent;
    })

  },


  methods: {
    submitAnswer: function (answer) {
      
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
         if (this.question.slide == this.questions.length){
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
  height: 20em;
  width: 35em;
  background-color: rgb(223, 158, 228);
  top: 5em;
  margin: 0 auto;
  border-radius: 25px;
}
</style>
