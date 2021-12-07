<template>
  <header>
    <div class="lang">
      <button class="languageButton" v-on:click="switchLanguage">
        <!-- {{ uiLabels.changeLanguage }} <br /> -->
        <img v-bind:src="this.flag" style="width: 3rem; height: 2rem" />
      </button>
    </div>
    <router-link v-bind:to="'/'" tag="h1">
      <h1>EasyPoll</h1>
    </router-link>
    <p>
      The name of this poll is <span class="pollName">{{ pollId }}</span>
    </p>
  </header>
  <div class="createView">
    <div class="pollTitle" v-if="!isShown">
      <router-link v-bind:to="'/'" tag="button">
        <button class="back">
          {{ uiLabels.backButton }}
        </button>
      </router-link>

      <h3>Choose a name for your poll!</h3>
      <h5>
        Make sure to remember the name, it will be used to access to poll later.
      </h5>

      <input type="text" v-model="pollId" />
      <button class="createPollButton" v-on:click="createPoll">
        {{ uiLabels.createPoll }}
      </button>
      <div class="error" v-if="error">
        Please give the poll a title before continuing
      </div>
    </div>

    <div class="pollCreation" v-if="isShown">
      <div class="storedQuestions">
        <p>QUESTIONS</p>

        <div
          v-for="(question, index) in data.questions"
          v-bind:key="'question' + index"
        >
          <button class="slide" v-on:click="showQuestion(question, index)">
            {{ index }}: {{ question.q }}
          </button>
        </div>

        <!-- <div v-for="(slide,index) in slides" v-bind:key="'slide' +index">
          <button>hej</button>
        </div> -->

        <!-- Fråga:{{ question }}, Svar:{{ answers }} -->
        <div>
          <button class="addSlideButton" v-on:click="addSlide">
            Add new slide
          </button>
        </div>
      </div>

      <div class="display">
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
          <button v-on:click="deleteAnswer(i)">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            />
          </button>
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
        <button class="bars" v-on:click="resultType = 'bars'">Bar Chart</button>
        <button class="pie" v-on:click="resultType = 'pie'">Pie Chart</button>
      </div>

      <div class="controlpanel">
        <div class="addRemoveButtons">
          <div class="addAnswer">
            <button v-on:click="addAnswer">
              {{ uiLabels.addAnswer }}
              <img
                src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
              />
            </button>
          </div>
          <!-- <button v-on:click="addAnswer">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" />
            {{ uiLabels.addAnswer }}
          </button> -->
          <!-- <button v-on:click="deleteAnswer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            />
            {{ uiLabels.removeAnswer }}
          </button> -->
        </div>
        <div class="error" v-if="error">You have empty fields!</div>
        <button v-on:click="addQuestion">Add question</button>
        <button v-on:click="editQuestion">Save/Edit question</button>
        <input type="number" v-model="questionNumber" />
        <button v-on:click="runQuestion">Run question</button>
        <!-- {{ data }} -->
        <router-link v-bind:to="'/result/' + pollId">Check result</router-link>
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
      pollId: "",
      question: "",
      answers: ["", "", "", ""],
      index: null,
      questionNumber: 0,
      data: {},
      uiLabels: {},
      isShown: false,
      slides: [""],
      error: false,
      resultType: "bars", //försök till att kunna skicka med vilken typ av resultat det ska vara. ej klart.
    };
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("pollCreated", (data) => (this.data = data));
    socket.on("questionEdited", (data) => (this.data = data));
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
    addQuestion: function () {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i] === "" || this.question == "") {
          this.error = true;
        } else {
          this.error = false;
        }
      }
      if (!this.error) {
        socket.emit("addQuestion", {
          pollId: this.pollId,
          q: this.question,
          a: this.answers,
          resultType: this.resultType,
        });
      }
    },

    editQuestion: function () {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i] === "" || this.question == "") {
          this.error = true;
        } else {
          this.error = false;
        }
      }
      if (!this.error) {
        socket.emit("editQuestion", {
          pollId: this.pollId,
          q: this.question,
          a: this.answers,
          index: this.index,
        });
      }
    },

    addSlide: function () {
      this.slides.push("");
      // socket.emit("addSlide", {
      //   pollId: this.pollId,
      //   q: "",
      //   a: ["", "", "", ""]
      // });
      this.answers = ["", "", "", ""];
      this.question = "";
    },
    addAnswer: function () {
      this.answers.push("");
    },
    deleteAnswer: function (i) {
      if (this.answers.length <= 2) {
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
    },
  },
};
</script>

<style scoped>
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
  background-color: lightgoldenrodyellow;
  padding: 0.5em;
}
.slide {
  background-color: white;
  border: 0.1em solid black;
  /* border-radius: 0.5em; */
  transition: 0.3s;
  width: 100%;
  height: 4em;
  margin-bottom: 0.5em;
}
.slide:hover {
  background-color: rgb(223, 223, 219);
}

.addSlideButton {
  width: 100%;
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
.addSlideButton:active {
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

.display {
  background-color: wheat;
  grid-area: b;
  min-height: 25em;
}

.questionInput {
  height: 3em;
  width: 90%;
  margin: 1em;
}
.answers {
  display: inline-block;
  margin: 1em;
}
.answers button {
  border: none;
  border-radius: 2em;
  height: 1.5em;
  width: 1.5em;
  padding: 0.01em;
}
.answers img {
  height: 1.5em;
  width: 1.5em;
}
.answersInput {
  height: 4em;
  width: 10em;
  margin: 0.5em;
}
.display input {
  border: none;
  text-align: center;
  background-size: 300% 100%;
  border-radius: 0.5em;
  transition: 0.3s;
}
.display input:hover {
  background-color: rgb(209, 209, 209);
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
.addAnswer {
  position: relative;
  float: right;
}
.addAnswer img {
  height: 2em;
}

/* CSS för att anpassa header */
header {
  height: 6em;
}
header a {
  text-decoration: none;
}

.pollName {
  font-family: "Lucida Console", "Monaco", monospace;
  font-size: 1em;
}

/* CSS för pollId-sidan */
.pollTitle {
  padding: 3em;
}
.back {
  float: left;
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
</style>
