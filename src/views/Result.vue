
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
  <main class="page">
    <section class="showResult">
  <div v-if="isClicked" class="theBars">
    <div class="clicked" v-if= "isClicked">
    </div>
    <Bars v-bind:data="data"/>
    <!--<Circle v-bind:data="data"/> --> </div>

  </section>
{{questions}}{{questions.length}}
  <section class="knapppanel">
    <div class="knappIResult">
    fråga nummer: {{questionNumber}} (bara för tydlighet atm) <br><br>
    <!--<input type="number" v-model="questionNumber" />-->
      <!-- {{ data }} -->

      <!-- denna länk under borde kanske vara någon annan stans?-->
      <!--<router-link v-bind:to="'/result/' + pollId">Check result</router-link>-->
      <router-link v-bind:to="'/poll/' + pollId">next Question</router-link>
    <button class="prevButton" v-on:click="prevQuestion">Previous Question</button>
    <button class="nextButton" v-on:click="runQuestion">Next Question</button>
    <button class ="revanswer" v-on:click="clicked"> Reveal Answer</button>
    {{isClicked}}
    </div>
  </section>




  </main>
</header>

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
  },
  data: function () {
    return {
      question: "",
      questionNumber:0,
      questions: 0,
      isClicked: false,


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
      this.isClicked=false;
      this.questionNumber +=1;
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      })
      /*hitta max antal numebr för att få avslutande bild
      if this.questionNumber > */
    },

    prevQuestion: function (){
      this.questionNumber -=1;
      this.isClicked=false;
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      })
    },
    clicked: function(){
      this.isClicked=true;
    }
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
height: 25em;
padding: 2em;
}
.showResult section{
  padding: 1em;
}
.nextButton{
  background-color: #e6f0ff;
  width: 80px;
  height: 40px;
  position: relative;
  box-shadow: 0 -0.2em 0 -0.35em
  rgba(0, 0, 0, 0.17);
  /*color:#ff6666*/
  font-family: "Lucida Console", "Monaco", monospace;
}
.prevButton{
  background-color: #e6f0ff;
  width: 80px;
  height: 40px;
  position: relative;
  box-shadow: 0 -0.2em 0 -0.35em
  rgba(0, 0, 0, 0.17);
  /*color:#ff6666*/
  font-family: "Lucida Console", "Monaco", monospace;
}

.revanswer{
  background-color: #e6f0ff;
  width: 80px;
  height: 40px;
  position: relative;
  box-shadow: 0 -0.2em 0 -0.35em
  rgba(0, 0, 0, 0.17);
  /*color:#ff6666*/
  font-family: "Lucida Console", "Monaco", monospace;
}
</style>
