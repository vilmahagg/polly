<template>
  <div id="nav">
    <header>
      <div class="lang">
         <button v-on:click="switchLanguage">{{ uiLabels.changeLanguage }}</button>
      </div>
      <h1>EasyPoll</h1>
    </header>

    <div class="startMenu">
  
      <div class="create">
      <router-link v-bind:to="'/create/' + lang" tag="button">
        <button>
          <h3>{{uiLabels.createPoll}}</h3>
          </button>
      </router-link>
      </div>

      
      <div class="participate">
        <label>
          Write poll id:
          <input type="text" v-model="id" />
        </label>
        <router-link v-bind:to="'/poll/' + id" tag="button">
        <button>
        <h3>{{uiLabels.participatePoll}}</h3>
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
      lang: "en"
    };
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en") this.lang = "sv";
      else this.lang = "en";
      socket.emit("switchLanguage", this.lang);
    },
  },
};
</script>

<style>
header{
  background: yellow;
}
.startMenu {
  display: grid;
  grid-gap: 0.3em;
  grid-template-columns: 50% 50%;
}
.startMenu div{
  padding: 1em;
}
.create {
  background-color: aqua;
  height: 10em;
}

.participate {
  background-color: blueviolet;
  height: 10em;
}
</style>
