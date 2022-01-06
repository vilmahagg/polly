<template>
  <div class="all">
    <header>
      <router-link v-bind:to="'/'" tag="h1">
        <h1>EasyPoll</h1>
      </router-link>

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

        <div class="createInput">
          <input type="text" v-model="pollId" />
          <button class="createPollButton" v-on:click="createPoll">
            {{ uiLabels.createPoll }}
          </button>
        </div>
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
          {{slide}}
          <div
              class="slides"
              v-for="(question, index, slide) in data.questions"
              v-bind:key="'question' + index + slide"
          >
            <div class="changePlaceButtons">
              <button v-on:click="moveUp(question, index)">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/467/467293.png"
                />
              </button>
              <button v-on:click="moveDown(question, index)">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/467/467264.png"
                />
              </button>
            </div>

            <button
                class="slide"
                :class="{thisSlide: selectedSlide == index}"
                v-on:click="showQuestion(question, index)"
            >
              {{ index+1 }}: {{ question.q }}
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

          <div class="slideButtons">
            <button v-if="!save" v-on:click="addSlide">Add new slide</button>
            <button v-if="save" v-on:click="editQuestion">Save Question</button>
            <div class="error" v-if="error">
              Please fill all fields before saving question
            </div>

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

        <!--<div class="finishButton">
        <router-link to="/finished">
          <button v-on:click="finishPresentation">Finish Presentation</button>
        </router-link>
        </div>-->

        <div class="controlpanel">
          <button class="finishButton" v-on:click="finishPresentation">
            Finish Presentation
            {{ uiLabels.finishPresentation }}
          </button>
        </div>

      </div>
      <br>

      <div class="finishedSide" v-if="isFinished">
        <h2>YOU SUCCESSFULLY CREATED YOUR POLL!!</h2>
        <div class="msg-icn"  >
          Note: This code is also used to edit the poll later on!
        </div>


        <div class="wrapper">
          <div class="pollCode2">
            THIS IS YOUR POLL-CODE, SAVE AND SHARE IT WITH YOUR PARTICIPANTS :
          </div>
          <div >
            <span class="pollCode"> {{ pollId }}</span>
          </div>


        </div>

        <section class="waitandstartButton">
          <router-link v-bind:to="'/result/' + pollId">
            <div>
              <button class="next-button" type="button">Start poll now!</button><div class="next-point"></div>
            </div>
          </router-link>

          <br />
          <div class="wtButton">
            <router-link to="/">
              <button v-on:click="waitUntilLater" class="waitButton">
                Wait until later
              </button>
            </router-link>

          </div>
        </section>

          <!--<div class="stButton">
                      <router-link v-bind:to="'/result/' + pollId">
                        <button class="startButton">Start poll now!</button>
                      </router-link>
                    </div>
                    -->

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
    editQuestion: function () {
      this.error = false;
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i] === "" || this.question == "") {
          this.error = true;
        }
      }
      if (!this.error) {
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
      socket.emit("addSlide", {
        pollId: this.pollId,
        q: "",
        a: ["", "", "", ""],
        resultType: "bars",
        slide: this.slide,
        index: this.index,
      });

    },
    deleteSlide: function (i) {
      if (this.slide <= 1) {
        return;
      }
      socket.emit("deleteQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: i,
      });
      this.save = false;
      this.start = false;
    },
    moveUp: function (question, i) {
      if (i <= 0) {
        return;
      }
      this.selectedSlide = i-1;
      socket.emit("moveUp", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: i,
      });
      this.showQuestion(question,i-1);
    },
    moveDown: function (question, i) {
      this.selectedSlide = i+1;
      socket.emit("moveDown", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: i,
      });
      this.showQuestion(question,i+1);
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
      this.question = question.q;
      this.answers = question.a;
      this.index = index;
      this.resultType = question.result;
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
  max-height: 80vh;
  overflow-y:auto;
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
.slideButtons{
  width:100%;
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
  width: 50%;
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
  height: 15em;
  padding-bottom: 2em;
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
  width:100%;
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
.createInput {
  display: inline-block;
  width:100%;
}
.createInput input {
  height: 2.6em;
  width: 40%;
  margin: 2em;
}
.createPollButton {
  /* height: 3em;
  width: 10em;
  border-radius: 0.5em; */
  width: 40%;
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
.error {
  margin:1em;
  display: inline-block;
  padding: 0.5em;
  color: red;
  background-color: rgba(255, 255, 255, 0.658);
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
  color: #10080e;
  font-family: "Roboto", sans-serif;
  border: 5px solid;
  border-color: #e16c76;
}
.pollCode2 {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  margin-left:150px;
}
.finishButton {
  height: 50px;
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
  margin-top: 140px;
  display: grid;
  grid-template-columns: 60% 1% 2%;
}

  .wrapper {
  display: grid;
  grid-template-columns: 50% 5% 30%;
}
.msg-icn {
  position: relative;
  background: #e16c76;
  border-radius: .4em;
  margin-left:900px;
  margin-right:80px;
  font-weight: bold;
  font-family: "American Typewriter";
  box-shadow: 10px 5px 5px grey;
  color: #2a2727;
}
.msg-icn:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 33px solid transparent;
  border-top-color: #e16c76;
  border-bottom: 0;
  border-left: 0;
  margin-left: -16.5px;
  margin-bottom: -33px;
}
.next-button {
  font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
  text-decoration: none;
  color: #fff;
  text-align: center;
  border: none;
  background-color: #60c265;
  display: inline-block;
  line-height: 80px;
  height: 80px;
  padding: 0 1rem;
  font-weight: bold;
  color: #113952;
  background-color: #60c265;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
  text-transform: uppercase;
}
.next-point{
  vertical-align: top;
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent;
  border-left: 40px solid #60c265;
  border-right: 40px solid transparent;
}
.finishedSide{
  height: 30em;
  background-color: #f0e7f3;
  margin-bottom: 200px;
}

.all {
  font-size: 16px;
}
/* FÖR MOBIL */
@media only screen and (max-width: 500px) {
  .all {
    font-size: 8px;
  }
  .pollCreation {
    display: grid;
    grid-gap: 1%;
    grid-auto-columns: minmax(0, 1fr);
    grid-template-areas:
    "b b b b b"
    "b b b b b"
    "b b b b b"
    "d d a a a"
    "d d a a a"
    "c c c c c";
  }
  .display {
    position: relative;
    background-color: wheat;
    grid-area: b;
    min-height: 40em;
    padding-bottom: 2em;
  }
  .startDisplay{
    font-size: 2em;
  }
  .answersInput {
    height: 4em;
    width: 8em;
    margin: 0.5em;
  }
  .resultDesign{
    padding:0.5em;
  }
  .resultDesign button {
    width: 80%;
    height: 4em;
    padding:0;
    font-size: 10px;
  }
  .slide{
    height:3em;
  }

  }
@media only screen and (max-width: 500px){
  .finishedSide{
    height:400px;
  }
  .msg-icn{
    margin-left: 235px;
    margin-right: 20px;
    margin-bottom: 40px;
  }

  .msg-icn:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #e16c76;
    border-bottom: 0;
    border-left: 0;
    margin-left: -16.5px;
    margin-bottom: -19px;
  }

  .pollCode2{
    margin-left:20px;
  }
  .pollCode{
    font-size: 18px;

  }
  .waitButton{
    width: 8em;
    height: 4em;

  }
  .waitButton{
    text-align: center;
    position: relative;



  }
  .next-button{
    width: 8em;
    height: 4em;
    text-align: center;
    position: relative;
    font-siez: 1px;

  }
  .next-point{
    border-top: 27px solid transparent;
    border-bottom: 27px solid transparent;
    border-left: 28px solid #60c265;
    border-right: 28px solid transparent;

  }

}
</style>