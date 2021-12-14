
<template>
  <header>
    <h4 id="rubrikRext">Result</h4>
    <br />
    <div>
      <!--  {{pollId}}-->
      <h2 id="rubrikFråga" v-if="!end">
        <Question v-bind:question="question" v-on:answer="submitAnswer" />
        {{ question }}
      </h2>
      <div v-if="end"><br /><br /><br /><br /></div>
    </div>
    </header>
    <main class="page">
      <section v-if="!end" class="showResult">
        <div v-if="isClicked && !end" class="theBars">
          <div class="clicked" v-if="isClicked"></div>
          <Bars v-if="result == 'bars'" v-bind:data="data" />
          <Circle v-if="result == 'pie'" v-bind:data="data" />
        </div>

        <div v-if="!isClicked && !end" class="waitingDiv">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div class="youAnswered">
             <p>Fråga {{ questionNumber + 1 }} av {{ questions.length }}</p>
            <br>
            <h2>Answers submitted</h2>
            <h1 class="answers">{{ numberOfAnswers }}</h1>
          </div>

          <h2></h2>
        </div>
        <div class="knapppanel" v-if="!end">
          <div class="knappIResult">
            <!--  <router-link v-bind:to="'/poll/' + pollId">next Question</router-link>-->
            <button class="prevButton" v-on:click="prevQuestion">
              Previous Question
            </button>
            <button class="nextButton" v-if="!lastQuestion" v-on:click="runQuestion">
              Next Question
            </button>
            <button id="endButton" v-if="lastQuestion" v-on:click="end = true">
              Finish Poll
              </button>
            <button class="revanswer" v-on:click="clicked">
              Reveal Answer
            </button>
            <br /><br /><br /><br />{{ isClicked }} <br />(för förtydl.
            atm)fråga nummer: {{ questionNumber }} (bara för tydlighet atm)
          </div>
        </div>
      </section>

      <div class="endDivBack">
        <div class="endDiv" v-if="end">
          <div><h3>Poll done!</h3></div>
          <div></div>
          <div></div>
          <div>
            <br /><br /><br /><br /><br />
            <router-link v-bind:to="'//'" tag="button">
              <button class="tillbakaTillStart">Tillbaka till main</button>
            </router-link>
          </div>
        </div>
      </div>
    </main>
  
</template>
<script>
// @ is an alias to /src
import Bars from "@/components/Bars.vue";
import Circle from "@/components/Circle.vue";
import io from "socket.io-client";
// import party from "party-js";
const socket = io();
export default {
  name: "Result",
  components: {
    Bars,
    Circle,
  },
  data: function () {
    return {
      question: "",
      questionNumber: 0,
      questions: 0,
      isClicked: false,
      lastQuestion: false,
      end:false,
      data: {},
    };
  },
  computed: {
    numberOfAnswers: function () {
      let tot = 0;
      for (let a of Object.keys(this.data)) tot += this.data[a];
      return tot;
    },
  },
  created: function () {
    this.pollId = this.$route.params.id;
    socket.emit("joinPoll", this.pollId);
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", (update) => {
      this.question = update.q;
      this.data = {};
      this.result = update.result;
    });
    socket.on("allQuestions", (questions) => {
      this.questions = questions;
    });
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
      console.log(this.questions.length);
      if (this.questionNumber >= this.questions.length - 2) {
        this.lastQuestion = true;
        // party.setting.debug=true;
      }
      /*  else{
        this.end=true;
      }*/
      this.isClicked = false;
      this.questionNumber += 1;
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      });
      //hitta max antal numebr för att få avslutande bild
      /*  if (this.questionNumber >  questions.length)  {
        showFinish=true;
      }*/
    },
    prevQuestion: function () {
      this.lastQuestion=false;
      if (this.questionNumber <= 0) {
        return;
      }
      this.questionNumber -= 1;
      this.isClicked = false;
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      });
    },
    clicked: function () {
      if (this.isClicked == false) {
        this.isClicked = true;
      } else {
        this.isClicked = false;
      }
    },
    /*  nextQuestion: function (){
      this.questionNumber +=1;
    },*/
  },
};
</script>
<style>

header h4 {
  margin: 0;
  /* padding-left: 1.3em; */
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
  /* padding-left: 1.3em; */
  font-size: 3em;
  font-family: "Lucida Console", "Monaco", monospace;
  text-align: center;
  color: rgb(224, 100, 187);
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
}
h4 {
  font-size: 1em;
}
.page {
  /*  padding: 2em;*/
}
.theBars {
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  padding-bottom: 2em;
  width: 35em;
  background-color: wheat;
  margin: 0 auto;
  border-radius: 25px;
}
.showResult {
  background-color: wheat;
  padding: 2em;
}
.showResult section {
  padding: 1em;
}
.knapppanel {
  padding-bottom: 4em;
}

.knapppanel button{
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

.knapppanel button:active {
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  transform: translateY(0.1em);
}

#endButton{
  background-color: red;
}
/* .nextButton {
  background-color: #e6f0ff;
  width: 80px;
  height: 40px;
  position: relative;
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  color:#ff6666
  font-family: "Lucida Console", "Monaco", monospace;
}
.prevButton {
  background-color: #e6f0ff;
  width: 80px;
  height: 40px;
  position: relative;
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  color:#ff6666
  font-family: "Lucida Console", "Monaco", monospace;
}
.revanswer {
  background-color: #e6f0ff;
  width: 80px;
  height: 40px;
  position: relative;
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  color:#ff6666
  font-family: "Lucida Console", "Monaco", monospace;
} */
.hideResult {
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

.endDiv {
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  height: 20em;
  width: 35em;
  background-color: rgb(223, 158, 228);
  margin: 0 auto;
  border-radius: 25px;
  padding-top: 50px;
}
.endDivBack{
  background-color: rgb(223, 158, 228) ;
}

.theBars {
  height: 20em;
  width: 35em;
}

.youAnswered {
  color: black;
  padding-top: 1em;
}
.answers {
  colour: purple;
}
.tillbakaTillStart {
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
