
<template>
  <header>
    <h4 id="rubrikRext">{{uiLabels.result}}</h4>
    <div>
      <h2 id="rubrikFråga" v-if="!end">
        <Question v-bind:question="question" v-on:answer="submitAnswer" />
        {{ question }}
      </h2>
       <p> {{uiLabels.pollId}}: {{pollId}}</p>
      <div v-if="end"></div>
    </div>
    </header>
    <div v-if="emptyPoll">
      <p>{{uiLabels.noQuestions}}</p>
      <router-link v-bind:to="'//'" tag="button">
        <button class="tillbakaTillStart">{{uiLabels.backToStart}}</button>
      </router-link>
    </div>
    <main class="page" v-if="!emptyPoll">
      <section v-if="!end" class="showResult">
        <div v-if="isClicked && !end" class="theBars">
          <div class="clicked" v-if="isClicked"></div>
          <Bars v-if="result == 'bars'" v-bind:data="data" />
          <Circle v-if="result == 'circle'" v-bind:data="data" />
        </div>

        <div v-if="!isClicked && !end" class="waitingDiv">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div class="youAnswered">
             <p>{{uiLabels.q}} {{ questionNumber + 1 }} {{uiLabels.of}} {{ questions.length }}</p>
            <br>
            <h2>{{uiLabels.sub}}</h2>
            <h1 class="answers">{{ numberOfAnswers }}</h1>
          </div>

          <h2></h2>
        </div>
        <div class="knapppanel" v-if="!end">
          <div class="knappIResult">
            <button class="prevButton" v-on:click="prevQuestion">
              {{uiLabels.prevQ}}
            </button>
            <button class="nextButton" v-if="!lastQuestion" v-on:click="runQuestion">
              {{uiLabels.nextQ}}
            </button>
            <button id="endButton" v-if="lastQuestion" v-on:click="resetAnswers">
              {{uiLabels.finishPoll}}
              </button>
            <button class="revanswer" v-on:click="clicked">
              {{uiLabels.revAns}}
            </button>
          </div>
        </div>
      </section>

      <div class="endDivBack">
        <div class="endDiv" v-if="end">
          <div><h3>{{uiLabels.pollDone}}</h3></div>
          <div>
            <router-link v-bind:to="'//'" tag="button">
              <button class="tillbakaTillStart">{{uiLabels.backToStart}}</button>
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
const socket = io();
export default {
  name: "Result",
  components: {
    Bars,
    Circle,
  },
  data: function () {
    return {
      lang:"",
      question: "",
      questionNumber: 0,
      questions: 0,
      uiLabels: {},
      isClicked: false,
      lastQuestion: false,
      end:false,
      data: {},
      emptyPoll:false,
    };
  },
  computed: {
    numberOfAnswers: function () {
      let tot = 0;
      if (typeof this.data =='undefined'){
        return;
      }
      for (let a of Object.keys(this.data)) tot += this.data[a];
      return tot;
    },
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;

    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      console.log(labels);
      this.uiLabels = labels
    })
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
      if(this.questions.length==1){
       this.lastQuestion=true;
     }
     if(this.questions.length==0){
       this.emptyPoll = true;
     }
    });
  },
  methods: {
    runQuestion: function () {
      if (this.questionNumber >= this.questions.length - 2) {
        this.lastQuestion = true;
      }

      this.isClicked = false;
      this.questionNumber += 1;
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      });
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
    resetAnswers: function() {
    this.end = true;
    if(confirm("To reset the answers for this poll press 'ok', otherwise they will be stored as answers")){
      socket.emit("resetPoll", {
        pollId: this.pollId
      })
      }
    },
  },
};
</script>
<style>

header {
  height:auto;
  margin: 0;
  font-family: "Lucida Console", "Monaco", monospace;
  text-align: center;
  color: rgb(224, 100, 187);
  overflow: hidden;
  position: relative;
}
header h2 {
  margin: 0;
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

.theBars {
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  width:100%;
  height:50%;
  padding-bottom: 2em;
  background-color: rgb(243, 220, 243);
  margin: 0 auto;
  border-radius: 25px;
  overflow-y:auto;
  overflow-x:hidden;
}
.showResult {
  background-color:rgb(243, 220, 243);
  padding: 2em;
  height:100vh;
}
.showResult section {
  padding: 1em;
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
.waitingDiv {
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  height: 50%;
  width: 60%;
  background-color: rgb(223, 158, 228);
  margin: 0 auto;
  border-radius: 25px;
}

.endDiv {
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  height: 100vh;
  width: 100%;
  background-color: rgb(223, 158, 228);
  margin: 0 auto;
  border-radius: 25px;
  padding-top: 50px;
}
.endDivBack{
  background-color: rgb(223, 158, 228) ;
}

.youAnswered {
  color: black;
  padding-top: 1em;
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


@media only screen and (max-width: 500px) {
  .showResult{
    padding:1em 1em 0 1em;
  }
  .waitingDiv{
    width:100%;
  }

  .theBars{
    margin:0;
    width:100%;
  }
}
</style>
