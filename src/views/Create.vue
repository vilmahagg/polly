<template>
  <div class="all">
    <header>
      <router-link v-bind:to="'/'" tag="h1">
        <h1>EasyPoll</h1>
      </router-link>
      <br />
      <button class="helpButton" v-if="isShown" v-on:click="help = !help">
        <img src="..\..\public\img\question-mark-round-line.png" />
        <div class="tooltipExplain">{{uiLabels.showHide}}</div>
      </button>
    </header>

    <div class="createView">
      <div class="helpViewBackground" v-show="help">
        <div class="helpView" v-if="help">
          <h4>{{uiLabels.howCreate}}</h4>
          <ol>
            <li>
              {{uiLabels.instructionAdd1}}
              <span style="font-style: italic">{{uiLabels.instructionAdd2}}</span> {{uiLabels.button}}.
              <ol>
                <li>
                  {{uiLabels.chooseSlide}}
                </li>
                <li>
                  {{uiLabels.chooseHowResult}}
                </li>
              </ol>
            </li>
            <li>
              {{uiLabels.saveYourQ1}}
              <span style="font-style: italic">{{uiLabels.saveYourQ2}}</span> {{uiLabels.button}}.
            </li>
            <li>
              {{uiLabels.instructionRepeat}}
            </li>
            <li>
                {{uiLabels.wellDone}}
              <span style="font-style: italic">{{uiLabels.finish}}</span>
                {{uiLabels.wellDone2}}
            </li>
          </ol>
        </div>
      </div>

      <div class="pollTitle" v-if="!isShown && !isFinished">
        <router-link v-bind:to="'/'" tag="button">
          <button class="back">
            {{ uiLabels.backButton }}
          </button>
        </router-link>

        <h3>{{uiLabels.chooseName}}</h3>

        <div class="createInput">
          <div class="error" v-if="error">
            {{uiLabels.pleaseName}}
          </div>
          <input type="text" v-model="pollId" />
          <button class="createPollButton" v-on:click="createPoll">
            {{ uiLabels.createPoll }}
          </button>
        </div>
        <ul class="tip">
          <li>
            <img src="..\..\public\img\light-bulb-color.png" />
            {{uiLabels.rememberName}}
          </li>
          <li>
            <img src="..\..\public\img\light-bulb-color.png" />
           {{uiLabels.editEx}}
          </li>
        </ul>
      </div>

      <div class="pollCreation" v-if="isShown">
        <div class="storedQuestions">
          <p>{{uiLabels.yourSlides}}</p>
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
              :class="{ thisSlide: selectedSlide == index }"
              v-on:click="showQuestion(question, index)"
            >
              {{ index + 1 }}: {{ question.q }}
            </button>
            <div class="slideDelete">
              <button class="deleteButton" v-on:click="deleteSlide(index)">
                <img src="..\..\public\img\red-x.png" />
                <div class="tooltipDelAns">{{ uiLabels.deleteSlide }}</div>
              </button>
            </div>
          </div>

          <div class="slideButtons">
            <div v-if="slideStatus != 'canSave'">
              <button v-on:click="addSlide">{{uiLabels.addSlide}}</button>
              <div class="error" v-if="error">
                {{uiLabels.saveQuestion}}
              </div>
            </div>

            <div v-if="slideStatus == 'canSave'">
              <button id="saveButton" v-on:click="editQuestion">
               {{uiLabels.saveQuestionButton}}
              </button>
              <div class="error" v-if="error">
                {{uiLabels.fillAll}}
              </div>
            </div>
          </div>
        </div>
        <div class="displayHeader">
          <p>
            {{uiLabels.nameOfPoll}} <span class="pollName">{{ pollId }}</span>
          </p>
        </div>

        <div class="display">
          <div class="startDisplay" v-if="!start && !help">
            <h2>{{uiLabels.addAndSelect}}</h2>
          </div>

          <div v-if="start && !help">
            {{ index + 1 }}
            <input
              id="questionInput"
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
                id="answersInput"
                v-model="answers[i]"
                :placeholder="uiLabels.answer"
              />

              <button class="deleteButton" v-on:click="deleteAnswer(i)">
                <img src="..\..\public\img\red-x.png" />
                <div class="tooltipDelAns">{{uiLabels.deleteAnswers}}</div>
              </button>
            </div>
            <div class="addAnswer">
              <button v-on:click="addAnswer">
                <img src="..\..\public\img\plus.png" />
                <div class="tooltipAddAns">{{uiLabels.addAnswers}}</div>
              </button>
            </div>
          </div>
        </div>

        <div class="resultDesign">
          <p>{{uiLabels.editResultForEach}}</p>
          <div v-if="start && !help">
            <div class="resultDisplay">
              <img
                v-if="resultType == 'bars'"
                src="..\..\public\img\bars.png"
              />
              <img
                v-if="resultType == 'circle'"
                src="..\..\public\img\circle.png"
              />
            </div>
            <div class="resultOptions">
              <button class="bars" v-on:click="resultType = 'bars'">
              {{uiLabels.bars}}
              </button>
              <button class="circle" v-on:click="resultType = 'circle'">
              {{uiLabels.circle}}
              </button>
            </div>
          </div>
        </div>
        <div class="controlpanel">
          <button class="finishButton" v-on:click="finishPresentation">
            {{ uiLabels.finishPresentations }}
          </button>
        </div>
      </div>
      <br />
      <div class="finishedSide" v-if="isFinished">
        <h2>{{ uiLabels.successfullyCreated }}</h2>
        <div class="msg-icn">
          {{ uiLabels.note }}
        </div>

        <div class="wrapper">
          <div class="pollCode2">
            {{ uiLabels.pollCode }}
          </div>
          <div>
            <span class="pollCode"> {{ pollId }}</span>
          </div>
        </div>

        <div class="waitandstartButton">
          <router-link v-bind:to="'/result/' + pollId + '/' + lang">
            <button class="next-button" type="button">Start poll now!</button>
            <div class="next-point"></div>
          </router-link>

          <router-link to="/">
            <button v-on:click="waitUntilLater" class="waitButton">
            {{ uiLabels.waitUntilLater }}
            </button>
          </router-link>

        </div>
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
      slideStatus: "addSlide",
      resultType: "bars",
      isFinished: false,
      help: false,
    };
  },
  computed: {
    slide: function () {
      return this.data.questions.length;
    },
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("pollCreated", (data) => (this.data = data));
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
        this.slideStatus = "addSlide";
      }
    },
    addSlide: function () {
      if (this.slideStatus == "notSaved") {
        this.error = true;
        return;
      }
      socket.emit("addSlide", {
        pollId: this.pollId,
        q: "",
        a: ["", "", "", ""],
        resultType: "bars",
        slide: this.slide,
        index: this.index,
      });
      this.slideStatus = "notSaved";
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
      this.slideStatus = "addSlide";
      this.start = false;
      this.error = false;
    },
    moveUp: function (question, i) {
      if (i <= 0) {
        return;
      }
      this.selectedSlide = i - 1;
      socket.emit("moveUp", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: i,
      });
      this.showQuestion(question, i - 1);
    },
    moveDown: function (question, i) {
      if (i !== this.slide - 1) {
        this.selectedSlide = i + 1;
        socket.emit("moveDown", {
          pollId: this.pollId,
          q: this.question,
          a: this.answers,
          index: i,
        });
        this.showQuestion(question, i + 1);
      }
    },
    addAnswer: function () {
      if (this.answers.length >= 9) {
        alert("That's a bit many answer options for a poll don't you think?");
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
      this.slideStatus = "canSave";
      this.selectedSlide = index;
      this.error = false;
    },
    finishPresentation: function () {
      if (
        confirm(
          "Did you save all questions? You can come back later to edit the poll but unsaved questions will be lost."
        )
      ) {
        socket.emit("finishPresentation", {});
        this.isFinished = true;
        this.isShown = false;
      }
    },
  },
};
</script>

<style>
.helpViewBackground {
  position: absolute;
  top: 7em;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-image: url("../../public/img/transparent.png");
  background-repeat: repeat;
}
.helpView {
  margin: 2em 25% 0 25%;
  text-align: left;
  color: #10080e;
}
.createView {
  height: 100vh;
  background-color: #ffffff;
  padding: 0 1em 1em 1em;
}
.pollCreation {
  display: grid;
  grid-gap: 1%;
  grid-auto-columns: minmax(0, 1fr);
  grid-template-areas:
    "a e e e d"
    "a b b b d"
    "a b b b d"
    "a b b b d"
    "a c c c d";
}
.storedQuestions {
  grid-area: a;
  background-color: #df9ee480;
  min-height: 80vh;
  overflow-y: auto;
  border-radius: 0.3em;
}

.storedQuestions p,
.resultDesign p {
  font-size: 20px;
  font-weight: bold;
  color: #e23315;
  margin: 0.5em;
}

.slides {
  width: 100%;
  display: inline-block;
}
.slideDelete {
  display: inline-block;
  width: 10%;
}

.slide {
  background-color: white;
  border: 0.1em solid rgb(177, 177, 177);
  overflow: hidden;
  transition: 0.3s;
  height: 5em;
  width: 60%;
  border-radius: 0em;
  margin: 0.5em;
}
.thisSlide {
  border: 2px solid #a074f0;
}
.slide:hover {
  background-color: rgb(226, 224, 224);
}

.changePlaceButtons {
  display: inline-block;
  vertical-align: middle;
  width: 10%;
}
.changePlaceButtons img {
  width: 80%;
}
.changePlaceButtons button {
  display: block;
  border-radius: 1em;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  padding: 0;
}

.slideButtons {
  width: 100%;
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
  background-color: #ab87ee;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.slideButtons button:active {
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  transform: translateY(0.1em);
}

.resultDesign {
  background-color: #df9ee48e;
  grid-area: d;
  border-radius: 0.3em;
}
.helpButton {
  float: right;
  border-radius: 50%;
  position: relative;
  background-color: #ab87ee00;
  border: none;
}
.helpButton img {
  height: 2em;
  vertical-align: middle;
}
.tooltipExplain {
  visibility: hidden;
  font-family: arial;
  padding: 1em;
  width: 5em;
  background-color: rgba(97, 95, 95, 0.87);
  color: white;
  text-align: center;
  border-radius: 0.5em;
  position: absolute;
  margin: 1em 0 0 -5em;
}

.helpButton:hover .tooltipExplain {
  visibility: visible;
  z-index: 2;
}

.resultDisplay img {
  width: 70%;
  margin: auto;
  margin: 4em 0 1em 0;
}
.resultOptions {
  padding-top: 1em;
}
.resultOptions button {
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
  background-color: #ab87ee;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.resultDesign button:active {
  box-shadow: 0 -0.2em 0 -0.35em rgba(0, 0, 0, 0.17);
  transform: translateY(0.1em);
}

.displayHeader {
  grid-area: e;
  color: #ab87ee;
}
.displayHeader p {
  margin: 0.1em;
}
.startDisplay {
  padding-bottom: 2em;
  padding: 5rem;
  color: rgb(161, 161, 161);
}
.display {
  position: relative;
  background-color: #df9ee47c;
  grid-area: b;
  min-height: 25em;
  padding-bottom: 2em;
  border-radius: 0.3em;
}
#questionInput {
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
  padding: 0;
  background-color: rgb(255, 255, 255);
}
.deleteButton img {
  height: 1.2rem;
}
.tooltipDelAns {
  visibility: hidden;
  font-family: arial;
  width: 7em;
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
#answersInput {
  height: 4em;
  width: 10em;
  margin: 0.5em;
}
.display input {
  border: none;
  text-align: center;
  border-radius: 0.5em;
  transition: 0.3s;
}
.display input:hover {
  background-color: rgb(226, 224, 224);;
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
.addAnswer button img {
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
.controlpanel {
  grid-area: c;
  width: 100%;
  padding-top: 0.8em;
}
header {
  height: 6em;
}
.pollName {
  font-weight: bold;
  font-size: 1em;
}
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
  width: 6em;
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
  width: 100%;
}
.createInput input {
  height: 2.6em;
  width: 40%;
  margin: 2em;
}
.createPollButton {
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
  margin: 1em;
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
.stButton {
  width: available;
  height: available;
  position: relative;
  margin-left: 25%;
}
.pollCode {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 25px;
  color: #10080e;
  font-family: "Roboto", sans-serif;
  border: 5px solid;
  border-color: #e16c76;
  padding: 0.5em;
}
.pollCode2 {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  margin-left: 150px;
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
  background-color: #e23315;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none;
}
.waitandstartButton {
  margin: 10em auto auto auto;
  width: 70%;
}
.wrapper {
  display: grid;
  grid-template-columns: 50% 5% 30%;
}
.msg-icn {
  position: relative;
  background: #e16c76;
  border-radius: 0.4em;
  margin-left: 900px;
  margin-right: 80px;
  font-weight: bold;
  font-family: "American Typewriter";
  box-shadow: 10px 5px 5px grey;
  color: #2a2727;
}
.msg-icn:after {
  content: "";
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
.next-button {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
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
.next-point {
  vertical-align: top;
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent;
  border-left: 40px solid #60c265;
  border-right: 40px solid transparent;
}
.finishedSide {
  background-color: #f0e7f3;
  height: 100vh;
}
.all {
  font-size: 16px;
}

@media only screen and (max-width: 500px) {
  .all {
    font-size: 8px;
  }
  .helpView {
    font-size: 16px;
    margin: 1em;
  }
  .helpButton img {
    height: 1.2em;
    vertical-align: middle;
  }
  .pollCreation {
    display: grid;
    grid-gap: 1%;
    grid-auto-columns: minmax(0, 1fr);
    grid-template-areas:
      "e e e e e"
      "b b b b b"
      "b b b b b"
      "b b b b b"
      "d d a a a"
      "d d a a a"
      "c c c c c";
  }
  .displayHeader p {
    font-size: 12px;
  }
  .display {
    position: relative;
    grid-area: b;
    min-height: 40em;
    padding-bottom: 2em;
  }
  .startDisplay {
    font-size: 2em;
  }
  #answersInput {
    height: 4em;
    width: 8em;
    margin: 0.5em;
    background-color: #ffffff;
  }
  .resultDesign {
    min-height: 30em;
    max-height: 25vh;
  }
  .resultDesign button {
    width: 80%;
    height: 4em;
    padding: 0;
    font-size: 10px;
  }
  .storedQuestions {
    min-height: 30em;
    max-height: 25vh;
  }
  .storedQuestions p,
  .resultDesign p {
    font-size: 16px;
  }
  .slide {
    height: 3em;
  }

  .pollTitle {
    width: 90%;
  }

  .pollTitle h3 {
    margin: 32px 0;
    font-size: 28px;
  }
  .error {
    font-size: 12px;
    margin: 0;
  }
  .tip {
    width: 100%;
    margin: auto;
    padding: 0;
    list-style-type: none;
    text-align: left;
    font-size: 16px;
  }
  .waitandstartButton {
    width: 100%;
  }
  .waitandstartButton a {
    width: 30%;
  }
}
</style>
