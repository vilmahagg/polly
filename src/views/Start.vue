<template>
  <div id="nav">
    <header>
      <div class="lang">
        <button class="languageButton" v-on:click="switchLanguage">
          {{ uiLabels.changeLanguage }} <br />
          <img v-bind:src="this.flag" style="width: 3rem; height: 2rem" />
        </button>
      </div>
      <h1>EasyPoll</h1>
    </header>

    <div class="startMenu">
      <div class="create">
        <router-link v-bind:to="'/create/' + lang" tag="button">
          <button class="createButton">
            <h3>{{ uiLabels.createPoll }}</h3>
          </button>
        </router-link>
      </div>

      <div class="participate">
        <label>
          Write poll id:
          <input type="text" v-model="id" />
        </label>
        <router-link v-bind:to="'/poll/' + id" tag="button">
          <button class="participateButton">
            <h3>{{ uiLabels.participatePoll }}</h3>
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
.startMenu {
  display: grid;
  grid-gap: 0.3em;
  grid-template-columns: 50% 50%;
}
.startMenu div {
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
  width: 100%;
  height: 80%;
  background-color: lightgreen;
}

.languageButton {
  float: right;
  font-weight: bold;
}

button:hover {
  cursor: pointer;
}
</style>
