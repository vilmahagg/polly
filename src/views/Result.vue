
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
    <!-- <Circle v-bind:data="data"/> -->
    </div>


    <div v-if= "!isClicked" class="waitingDiv">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <h3 class = "youAnswered">
      Answers submitted <br><br> <h1 class ="answers"> {{numberOfAnswers}}
      </h1>
    </h3>

      <h2></h2>
    </div>
    <div class="knapppanel">
      <div class="knappIResult">

      <!--  <router-link v-bind:to="'/poll/' + pollId">next Question</router-link>-->
      <button class="prevButton" v-on:click="prevQuestion">Previous Question</button>
      <button class="nextButton" v-on:click="runQuestion">Next Question</button>
      <button class ="revanswer" v-on:click="clicked"> Reveal Answer</button>
    <br><br><br><br>{{isClicked}} <br>(för förtydl. atm)fråga nummer: {{questionNumber}} (bara för tydlighet atm)
      </div>

    </div>
  </section>

{{questions}}{{questions.length}}
  </main>
</header>
</template>
<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
// import Circle from '@/components/Circle.vue';
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'Result',
  components: {
    Bars,
    // Circle,
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
  computed: {
    numberOfAnswers: function () {
      let tot = 0;
      for (let a of Object.keys(this.data))
        tot += this.data[a];
      return tot;
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
      if (this.questionNumber>0){
      this.questionNumber -=1;
      this.isClicked=false;
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      })
    }
    } ,
    clicked: function(){
      if (this.isClicked==false) {
      this.isClicked=true;
    }
    else
    this.isClicked=false;
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
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  padding-bottom: 2em;
  width: 35em;
  background-color: wheat;
  margin: 0 auto;
  border-radius: 25px;
}
.showResult{
background-color: wheat;
padding: 2em;
}
.showResult section{
  padding: 1em;
}
.knapppanel{
  padding-bottom: 4em;
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
.hideResult{
}
.waitingDiv {
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  height: 20em;
  width: 35em;
  background-color: rgb(223, 158, 228);
  margin: 0 auto;
  border-radius: 25px;
}

.theBars{
  height: 20em;
  width: 35em;
}

.youAnswered{
  color:black;
  padding-top: 1em;
}
.answers{
  colour: purple;
}
</style>
