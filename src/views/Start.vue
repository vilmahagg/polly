<template>
  <div id="nav">
    <header>
      <div class="lang">
        <button class="languageButton" v-on:click="switchLanguage">
          {{ uiLabels.changeLanguage }} <br />
          <img v-bind:src="this.flag" />
        </button>
      </div>
      <h1>EasyPoll</h1>
    </header>

    <div class="firstMenu">
      <div class="create" v-if="!ready">
        <router-link v-bind:to="'/create/' + lang" tag="button">
          <button class="createButton">
            <h3>{{ uiLabels.createPoll }}</h3>
          </button>
        </router-link>
      </div>

      <div class="participate" v-if="!ready">
        <button class="readyButton" v-on:click="ready = true">
          {{ uiLabels.participatePoll }}
        </button>
      </div>
    </div>

    <div class="start" v-if="ready">
      <button class="back" v-on:click="ready = false">Back</button>
      <div>
        <label>
          Write poll id:
          <input type="text" v-model="id" />
        </label>
      </div>
      <div>
        <router-link v-bind:to="'/poll/' + id" tag="button">
          <button class="participateButton">
            <h3>Start</h3>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Start",
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Svensk_flagg_1815.svg/2560px-Svensk_flagg_1815.svg.png",
      ready: false,
    };
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels;
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
  },
};
</script>

<style>
header {
  background: rgb(139, 139, 133);
}
.firstMenu {
  display: grid;
  grid-gap: 0.3em;
  grid-template-columns: 50% 50%;
}
.firstMenu div {
  padding: 1em;
}
.create {
  background-color: aqua;
  height: 10em;
}

.createButton {
  width: 100%;
  height: 100%;
  background-color: lightgreen;
}

.participate {
  background-color: blueviolet;
  height: 10em;
}

.participateButton {
  width: 50%;
  height: 50%;
  background-color: lightgreen;
}

.languageButton {
  float: right;
  font-weight: bold;
  width: 6em;
  height: 4em;
}
.languageButton img {
  width: 2em;
  height: 1em;
}

button:hover {
  cursor: pointer;
}

.start {
  height: 20em;
  background-color: lightsalmon;
  padding: 2em;
}
.start div {
  padding: 1em;
}

#nav {
  padding: 0;
}
</style>
