<template>
  <div class="all">
    <header>
      <router-link v-bind:to="'/'" tag="h1">
        <h1>EasyPoll</h1>
      </router-link>
      <div class="error" v-if="error">
        Please fill all fields before saving question
      </div>
      <p v-if="!error">
        The name of this poll is <span class="pollName">{{ pollId }}</span>
      </p>
    </header>

    <div class="createView">
      <div class="pollTitle" v-if="!isShown && !isFinished">
        <router-link v-bind:to="'/'" tag="button">
          <button class="back">
            {{ uiLabels.backButton }}
          </button>
        </router-link>

        <h3>Choose a name for your poll!</h3>

        <input type="text" v-model="pollId" />
        <button class="createPollButton" v-on:click="createPoll">
          {{ uiLabels.createPoll }}
        </button>
        <br />
        <!-- <div class="error" v-if="error">
        Please give the poll a title before continuing
      </div> -->
        <ul class="tip">
          <li>
            <img
              src=..\..\public\img\light-bulb-color.png
            />
            Remember the name to access the poll later
          </li>
          <li>
            <img
              src=..\..\public\img\light-bulb-color.png
            />
            Want to edit an existing poll? Enter the name of the poll above to
            continue where you left off!
          </li>
        </ul>
      </div>

      <div class="pollCreation" v-if="isShown">
        <div class="storedQuestions">
          <p>QUESTIONS</p>
         slide: {{ slide }}, index:{{index}}, selected:{{selectedSlide}}<br>
         <!-- {{data.questions}} -->
         
          <div
            class="slides"
            v-for="(question, index) in data.questions"
            v-bind:key="'question' + index"
          >
            <div class="changePlaceButtons">
              <button v-on:click="moveUp(index)">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/467/467293.png"
                />
              </button>
              <button v-on:click="moveDown(index)">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/467/467264.png"
                />
              </button>
            </div>
            
            <button
              class="slide"
              :class="{thisSlide: selectedSlide == index}"
              v-on:click="showQuestion(question, index, slide)"
            >
              {{ index }}: {{ question.q }}
            </button>
            <div class="slideDelete">
              <button class="deleteButton" v-on:click="deleteSlide(index)">
                 <img
                  src=..\..\public\img\red-x.png
                />
                <div class="tooltipDelAns">Delete Slide</div>
              </button>
            </div>
          </div>

          <!-- <div v-for="(slide,index) in slides" v-bind:key="'slide' +index">
          <button>hej</button>
        </div> -->

          <!-- Fråga:{{ question }}, Svar:{{ answers }} -->
          <div class="slideButtons">
            <button v-if="!save" v-on:click="addSlide">Add new slide</button>
            <button v-if="save" v-on:click="editQuestion">Save Question</button>
            <!-- <button class="deleteSlideButton" v-on:click="deleteSlide">
            Delete slide
          </button> -->
          </div>
        </div>

        <div class="display">
          <div class="startDisplay" v-if="!start">
            <h2>Choose Slide to Start Editing</h2>
          </div>
          <div v-if="start">
            {{index +1}}
            <input
              class="questionInput"
              type="text"
              v-model="question"
              :placeholder="uiLabels.question"
            />
            <div
              class="answers"
              v-for="(_, i) in answers"
              v-bind:key="'answer' + i"
            >
              <input
                class="answersInput"
                v-model="answers[i]"
                :placeholder="uiLabels.answer"
              />

              <button class="deleteButton" v-on:click="deleteAnswer(i)">
                <img
                  src=..\..\public\img\red-x.png
                />
                <div class="tooltipDelAns">Delete Answer</div>
              </button>
            </div>
            <div class="addAnswer">
              <button v-on:click="addAnswer">
                <!-- {{ uiLabels.addAnswer }} -->
                <!-- <img
                  src="https://cdn-icons.flaticon.com/png/512/3524/premium/3524388.png?token=exp=1639049491~hmac=d026f57965dbf2b29aea2657e3653a52"
                /> -->
                <img
                  src=..\..\public\img\plus.png
                />
                <div class="tooltipAddAns">Add Answer Alternative</div>
              </button>
            </div>
          </div>
        </div>

        <div class="resultDesign">
          <h4>RESULT (elr annan titel)</h4>
          <h5>Choose how you want the result of your poll to be presented:</h5>
          <div class="resultDisplay">
            <img
              v-if="resultType == 'bars'"
              src="https://www.pngrepo.com/png/326909/512/bar-chart-sharp.png"
            />
            <img
              v-if="resultType == 'pie'"
              src="https://static.thenounproject.com/png/32976-200.png"
            />
          </div>
          <div class="resultOptions">
            <button class="bars" v-on:click="resultType = 'bars'">
              Bar Chart
            </button>
            <button class="pie" v-on:click="resultType = 'pie'">
              Pie Chart
            </button>
          </div>
        </div>

        <br />

        <button class="finishButton" v-on:click="finishPresentation">
          Finish Presentation
          {{ uiLabels.finishPresentation }}
        </button>

        <!--<div class="finishButton">
        <router-link to="/finished">
          <button v-on:click="finishPresentation">Finish Presentation</button>
        </router-link>
      </div>-->

        <div class="controlpanel">
          <!-- <div class="addRemoveButtons">
    
          <button v-on:click="addAnswer">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" />
            {{ uiLabels.addAnswer }}
          </button> -->
          <!-- <button v-on:click="deleteAnswer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            />
            {{ uiLabels.removeAnswer }}
          </button>
        </div> -->

          <!-- <button v-on:click="addQuestion">Add question</button> -->
        </div>
        <!-- <div class="skaFlyttas">
        de här knapparna ska ej vara i denna vy :)
      <input type="number" v-model="questionNumber" />
        <button v-on:click="runQuestion">Run question</button>
        
        <router-link v-bind:to="'/result/' + pollId">Check result</router-link>
      </div> -->
      </div>

      <div class="" v-if="isFinished">
        <h2>You successfully created your poll!!</h2>
        <div>
          <h4>
            THIS IS YOUR POLL-CODE, SAVE AND SHARE IT WITH YOUR PARTICIPANTS :
            <br />
            <br />
            <span class="pollCode"> {{ pollId }}</span>
          </h4>
        </div>

        <section class="waitandstartButton">
          <div class="stButton">
            <router-link v-bind:to="'/result/' + pollId">
              <button class="startButton">Start poll now!</button>
            </router-link>
          </div>

          <br />
          <div class="wtButton">
            <router-link to="/">
              <button v-on:click="waitUntilLater" class="waitButton">
                Wait until later
              </button>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io();
export default {
  name: "Create",
  data: function () {
    return {
      lang: "",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Svensk_flagg_1815.svg/2560px-Svensk_flagg_1815.svg.png",
      pollId: "",
      question: "",
      answers: ["", "", "", ""],
      index: 0,
      questionNumber: 0,
      data: {},
      uiLabels: {},
      isShown: false,
      selectedSlide: null,
      error: false,
      start: false,
      save: false,
      resultType: "bars", //försök till att kunna skicka med vilken typ av resultat det ska vara. ej klart.
      isFinished: false,
    };
  },
  computed: {
    slide: function() {
      return this.data.questions.length;
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("pollCreated", (data) => (this.data = data));
    // socket.on("questionEdited", (data) => this.data = data);
    socket.on(
      "contentUpdate",
      (questions) => (this.data.questions = questions)
    );
  },
  methods: {
    createPoll: function () {
      this.error = false;
      if (!this.pollId) {
        this.error = true;
      } else {
        socket.emit("createPoll", { pollId: this.pollId, lang: this.lang });
        this.isShown = true;
      }
    },
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
    // addQuestion: function () {
    //   for (let i = 0; i < this.answers.length; i++) {
    //     if (this.answers[i] === "" || this.question == "") {
    //       this.error = true;
    //     } else {
    //       this.error = false;
    //     }
    //   }
    //   if (!this.error) {
    //     socket.emit("addQuestion", {
    //       pollId: this.pollId,
    //       q: this.question,
    //       a: this.answers,
    //       resultType: this.resultType,
    //     });
    //   }
    // },

    editQuestion: function () {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i] === "" || this.question == "") {
          this.error = true;
        } else {
          this.error = false;
        }
      }
      if (!this.error) {
        console.log(this.index,this.slide,this.resultType);
        socket.emit("editQuestion", {
          pollId: this.pollId,
          q: this.question,
          a: this.answers,
          resultType: this.resultType,
          index: this.index,
          slide: this.slide,
        });
        this.save = false;
      }
    },

    addSlide: function () {
      console.log(this.resultType);
      socket.emit("addSlide", {
        pollId: this.pollId,
        q: "",
        a: ["", "", "", ""],
        resultType: this.resultType,
        slide: this.slide,
        index: this.index,
      });
      
    },

    deleteSlide: function (i) {
    
      if (this.slide <= 0) {
        return;
      }
      socket.emit("deleteQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: i,
      });
      this.save = false;
    },

    moveUp: function (i) {
      if (i <= 0) {
        return;
      }
      //2 radern under är ful-lösning...
      this.start=false;
      this.selectedSlide=null;
      socket.emit("moveUp", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: i,
      });
    },

    moveDown: function (i) {
      //2 radern under är ful-lösning...
      this.start=false;
      this.selectedSlide=null;
      socket.emit("moveDown", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: i,
      });
      
    },

    addAnswer: function () {
      if (this.answers.length >= 12) {
        return;
      }
      this.answers.push("");
    },
    deleteAnswer: function (i) {
      if (this.answers.length <= 1) {
        return;
      }
      this.answers.splice(i, 1);
    },
    runQuestion: function () {
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      });
    },
    showQuestion: function (question, index) {
      console.log(this.resultType);
      this.question = question.q;
      this.answers = question.a;
      this.index = index;
      question.resultType = this.resultType;
      this.start = true;
      this.save = true;
      this.selectedSlide = index;
    },
    finishPresentation: function () {
      socket.emit("finishPresentation", {});
      this.isFinished = true;
      this.isShown = false;
    },
  },
};
</script>

<style scoped>
/* createview = hela bakgrunden i allt*/
.createView {
  height: 100vh;
  background-color: white;
}
.pollCreation {
  display: grid;
  grid-gap: 1%;
  grid-auto-columns: minmax(0, 1fr);
  grid-template-areas:
    "a b b b d"
    "a b b b d"
    "a b b b d"
    "a c c c d";
}

/* "Slides" aka sparade frågor*/
.storedQuestions {
  grid-area: a;
  background-color: rgba(111, 168, 128, 0.507);
}
.slides {
  width: 100%;
  display: inline-block;
}
.slideDelete {
  display: inline-block;
  width: 15%;
}
.changePlaceButtons {
  display: inline-block;
  vertical-align: middle;
  width: 15%;
}
.changePlaceButtons img {
  height: 1em;
}
.changePlaceButtons button {
  height: 2em;
  width: 2em;
  display: block;
  border-radius: 1em;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}

.slide {
  background-color: white;
  border: 0.1em solid rgb(177, 177, 177);
  /* border:none; */
  /* border-radius: 0.5em; */
  transition: 0.3s;
  height: 4em;
  width: 60%;
  border-radius: 0.3em;
  margin: 0.5em;
}
.thisSlide {
  border:2px solid black;
}
.slide:hover {
  background-color: rgb(223, 223, 219);
}

.slideButtons {
  display: inline-block;
}

.slideButtons button {
  width: 80%;
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 1em 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  background-color: #e765d6;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.slideButtons button:active {
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  transform: translateY(0.1em);
}

/* Resultat */
.resultDesign {
  background-color: lightgoldenrodyellow;
  grid-area: d;
}

.resultDisplay img {
  width: 90%;
  height: 20%;
  margin: auto;
}

.resultOptions {
  padding-top: 1em;
  padding-bottom: 1em;
}

.resultDesign button {
  width: 80%;
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  background-color: #e765d6;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.resultDesign button:active {
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  transform: translateY(0.1em);
}

/* Skapa fråga */
.startDisplay {
  height: 100%;
  padding: 5rem;
  color: rgb(161, 161, 161);
}
.display {
  position: relative;
  background-color: wheat;
  grid-area: b;
  min-height: 25em;
  padding-bottom: 2em;
}

.questionInput {
  height: 3em;
  width: 80%;
  margin: 1em;
}
.answers {
  display: inline-block;
  margin: 1em;
}
.deleteButton {
  border: none;
  border-radius: 50%;
  height: 1.2rem;
  width: 1.2rem;
  vertical-align: middle;
  padding:0;
  background-color: rgb(255, 255, 255);
}
.deleteButton img{
  height:1.2rem;
}

.tooltipDelAns {
  visibility: hidden;
  font-family: arial;
  width:7em;
  font-size: 0.8em;
  padding: 0.4em;
  background-color: black;
  color: white;
  position: absolute;
  text-align: center;
  border-radius: 0.5em;
}
.deleteButton:hover .tooltipDelAns {
  visibility: visible;
  z-index: 1;
}
.deleteButton .tooltipDelAns::after {
  content: " ";
  position: absolute;
  bottom: 95%;
  right: 80%;
  margin-left: -0.5em;
  border-width: 0.4em;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.answersInput {
  height: 4em;
  width: 10em;
  margin: 0.5em;
}
.display input {
  border: none;
  text-align: center;
  /* background-size: 300% 100%; */
  border-radius: 0.5em;
  transition: 0.3s;
}
.display input:hover {
  background-color: rgb(209, 209, 209);
}

.addAnswer {
  position: absolute;
  right: 0;
  bottom: 0;
}

.addAnswer button {
  float: right;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0em;

  margin: 0 0.3em 0.3em 0;
  border-radius: 2em;
  box-sizing: border-box;
  background-color: #90e494;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
  
}

.addAnswer button img{
  height: 1.7em;
}

.addAnswer button:active {
  box-shadow: 0 -0.2rem 0 -0.35rem rgba(0, 0, 0, 0.17);
  transform: translateY(0.1rem);
}

.tooltipAddAns {
  visibility: hidden;
  width: 9rem;
  font-family: arial;
  font-size: 0.8rem;
  padding: 0.4rem;
  background-color: black;
  color: white;
  position: absolute;
  text-align: center;
  border-radius: 0.5rem;
}
.addAnswer button:hover .tooltipAddAns {
  visibility: visible;
  z-index: 1;
}
.addAnswer button:hover .tooltipAddAns::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  right: 80%;
  margin-left: -0.5em;
  border-width: 0.3em;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

/* Knapparna nedanför display*/
.controlpanel {
  margin: 1em;
  grid-area: c;
}
.controlpanel img {
  height: 1em;
}
.controlpanel button {
  margin: 0.3em;
}

/* CSS för att anpassa header */
header {
  height: 6em;
}

.pollName {
  font-weight: bold;
  font-size: 1em;
}

/* CSS för pollId-sidan */
.pollTitle {
  width: 65%;

  margin: auto;
  padding: 3em;
}
.pollTitle img {
  height: 2em;
}
.tip {
  width: 80%;
  margin: auto;
  list-style-type: none;
  text-align: left;
}
.tip img {
  display: inline-block;
  vertical-align: middle;
}
.tip li {
  margin: 1em;
}
.back {
  float: left;
  width: 5em;
  height: 2em;
  padding: 0.35em 0.7em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  background-color: #e765d6;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.createPollButton {
  /* height: 3em;
  width: 10em;
  border-radius: 0.5em; */
  width: 10em;
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  background-color: #e765d6;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.createPollButton:active {
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  transform: translateY(0.1em);
}
.pollTitle input {
  height: 2.6em;
  width: 18em;
  margin: 2em;
}
.error {
  display: inline-block;
  padding: 0.5em;
  width: auto;
  color: red;
  font-weight: bold;
  border: solid 1px red;
}
.startButton {
  float: left;
  width: 12em;
  height: 6em;
  padding: 0.35em 0.7em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: #113952;
  background-color: #60c265;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.waitButton {
  width: 12em;
  height: 6em;
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  background-color: #e765d6;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.stButton {
  width: available;
  height: available;
  position: relative;
  margin-left: 25%;
}
/* .wtButton{


} */

.pollCode {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 25px;
  color: #b6409b;
  font-family: monaco;
  border: 5px solid;
  border-color: #392873;
}

.finishButton {
  height: 50px;
  /* height: 50px; */
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  background-color: #397194;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}

.waitandstartButton {
  margin-top: 130px;
}

.all {
  font-size: 16px;
}

@media only screen and (max-width: 700px) {
  .all {
    font-size: 12px;
  }
}
</style>
