<template>
  <header>
    <div class="lang">
      <button class="languageButton" v-on:click="switchLanguage">
        <!-- {{ uiLabels.changeLanguage }} <br /> -->
        <img v-bind:src="this.flag" style="width: 3rem; height: 2rem" />
      </button>
    </div>
    <h1>EasyPoll</h1>
  </header>
  <div class="createView">
    <div class="pollTitle" v-if="!isShown">
      <router-link v-bind:to="'/'" tag="button">
        <button class="back">
          {{ uiLabels.backButton }}
        </button>
      </router-link>

      <input type="text" v-model="pollId" />
      <button class="createPollButton" v-on:click="createPoll">
        {{ uiLabels.createPoll }}
      </button>
    </div>

    <div class="pollCreation" v-if="isShown">
      <div class="storedQuestions">
        <p>här ska frågorna lagras på ngt vis</p>

        <div v-for="(question,index) in data.questions" v-bind:key="'question' + index">
          <button v-on:click="showQuestion(question, index)">
             {{index}}: {{ question.q }}
          </button>
        </div>

        <!-- Fråga:{{ question }}, Svar:{{ answers }} -->
        <div>
          <button v-on:click="addSlide">Add new slide/question</button>
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
        <p>här ska man fixa resultatet</p>
        <div class="resultDisplay">
          <p>shows example of result</p>
        </div>
        <button class="bars" v-on:click="resultType = 'bars'">Bars</button
        ><br />
        <button class="circle" v-on:click="resultType = 'circle'">
          Circle
        </button>
        {{ resultType }}
      </div>

      <div class="controlpanel">
        <div class="addRemoveButtons">
           <div class="addAnswer">
          <button v-on:click="addAnswer">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" />
            {{ uiLabels.addAnswer }}
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
      socket.emit("createPoll", { pollId: this.pollId, lang: this.lang });
      this.isShown = true;
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
      socket.emit("addQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
      });
    },

    editQuestion: function () {
      console.log("EDIT");
      socket.emit("editQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        index: this.index
      });
    },

    addSlide: function () {
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
.storedQuestions {
  grid-area: a;
  background-color: lightgoldenrodyellow;
}
.resultDesign {
  background-color: lightgoldenrodyellow;
  grid-area: d;
}

.resultDisplay {
  background-color: white;
  width: 90%;
  height: 20%;
  margin: auto;
}

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
.addAnswer{
  position: relative;
  float: right;
}
.addAnswer img{
  height:2em;
}
.createPollButton {
  height: 3em;
  width: 10em;
}
.pollTitle input {
  height: 2.6em;
  width: 12em;
  margin: 2em;
}
.pollTitle {
  padding: 3em;
}
</style>
