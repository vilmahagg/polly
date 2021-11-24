<template>
  <div id="nav">
    <div class="lang">
          <button class="languageButton" v-on:click="switchLanguage">
            <img v-bind:src="this.flag" />
          </button>
        </div>
   
      <header>
        
        <h1 id="header">EasyPoll</h1>
        <p>
          Welcome to our poll application EasyPoll! <br />
          Choose if you want to create or participate in a poll
        </p>
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
          <h3>{{ uiLabels.participatePoll }}</h3>
        </button>
      </div>
    </div>

    <div class="start" v-if="ready">
      <button class="back" v-on:click="ready = false">Back</button>
      <div>
        <label id ="pollName">
          Enter poll name:
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
  background: rgb(199, 205, 212);
  height: 10em;
  margin:0;
}
header h1 {
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

h3{
  font-size: 2em;

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
  height: 10em;
}

.createButton {
  width: 80%;
  height: 100%;
  background-color: rgb(159, 208, 236);
}

.participate {
  height: 10em;
}

.participateButton {
  width: 80%;
  height: 50%;
  background-color: rgb(164, 209, 164);
}

.readyButton {
  width: 80%;
  height: 100%;
  background-color: rgb(161, 209, 161);
}
.lang{margin:0; padding:0;}

.languageButton {
  float:right;
  font-weight: bold;
  width: 5em;
  height: 3em;
}
.languageButton img {
  width: 4em;
  height: 2em;
}

button:hover {
  cursor: pointer;
}

.start {
  height: 30em;
  background-color: rgb(240, 181, 158);
  padding: 2em;
}
.start div {
  padding: 1em;
}

#pollName{
font-size: 1.5em;

}

#pollName input{height: 1.5em; width: 12em;}

</style>
