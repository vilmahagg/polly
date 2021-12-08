
<template>
  <header>
    <h4 id="rubrikRext"> Result</h4><br>
    <div>
    <!--  {{pollId}}-->
    <h2 id="rubrikFråga">
      <Question v-bind:question="question"
                v-on:answer="submitAnswer"/>
    {{question}}
  </h2></div>
</header>
<main class="page">
  <section class="showResult">
<div class="theBars">
  <Bars v-bind:data="data"/>
  <!--<Circle v-bind:data="data"/> --> </div>
</section>



<button v-on:click="runQuestion">Next Question</button>


</main>
</template>
<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
/*import Circle from '@/components/Circle.vue';*/
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'Result',
  components: {
    Bars,
    /*Circle,*/
    /*questionNumber: 0,*/
  },
  data: function () {
    return {
      question: "",
      data: {
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en") {
        this.lang = "sv";
        this.flag =
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png";
      } else {
        this.lang = "en";
        this.flag =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Svensk_flagg_1815.svg/2560px-Svensk_flagg_1815.svg.png";
      }
      socket.emit("switchLanguage", this.lang);
    },
    runQuestion: function () {
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      }),
      this.questionNumber +=1;
    },
  /*  nextQuestion: function (){
      this.questionNumber +=1;
    },*/
  },
}
</script>
<style>
header h4 {
 margin: 0;
  padding-left:1.3em;
  font-family: "Lucida Console", "Monaco", monospace;
  text-align: center;
  color: rgb(224, 100, 187);
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
  padding-top: 20px;
}
header h2 {
 margin: 0;
  padding-left:1.3em;
  font-size: 3em;
  font-family: "Lucida Console", "Monaco", monospace;
  text-align: center;
  color: rgb(224, 100, 187);
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
}
h4{
  font-size: 1em;
}
.page{
/*  padding: 2em;*/
}
.theBars{
}
.showResult{
background-color: wheat;
height: 30em;
padding: 2em;
}
.showResult section{
  padding: 1em;
}
</style>
