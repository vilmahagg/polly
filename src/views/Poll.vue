<template>
<header>
    
    <h1>EasyPoll</h1>
    <div class="pollName">
    <p>PollId:{{pollId}}</p>
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  </header>

  <div class ="finishDiv" v-if="isFinished">
    <p>Poll completed</p>
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
      isFinished:false,
      pollId: "inactive poll"
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
  },
  
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
         if (this.question.slide == this.questions.length){
        this.isFinished = true; 
      }
      console.log("detta är meddelandet" + this.isFinished);
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