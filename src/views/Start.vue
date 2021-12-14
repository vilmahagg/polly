<template>
  <div class="all">
  <div id="nav">
    <header>
      <h1 id="header">EasyPoll</h1>

      <p class="welcomeMessage">
        {{ uiLabels.welcome }} <br />
        {{ uiLabels.choose }}
      </p>

      <div class="lang">
        <button class="languageButton" v-on:click="switchLanguage">
          <img v-bind:src="this.flag" />
          <div class="hoverLang">Change Language</div>
        </button>
      </div>
      <button class="aboutUs" v-on:click="showInfo">
        {{ uiLabels.aboutUs }}
      </button>

      <!--<button class="aboutUs">{{ uiLabels.aboutUs }}</button>-->
      <!--<button class="service">{{ uiLabels.service }}</button>-->
      <button class="service" v-on:click="showHelp">
        {{ uiLabels.service }}
      </button>
    </header>

    <div class="firstMenu" v-if="!wantInfo && !wantHelp">

      <div class="create" v-if="!ready && !start">
        <router-link v-bind:to="'/create/' + lang" tag="button">
          <button class="createButton">
            <h3>{{ uiLabels.createPoll }}</h3>
            <h5>{{ uiLabels.existing }}</h5>
          </button>
        </router-link>
      </div>

      <div class="participate" v-if="!ready && !start">
        <button class="readyButton" v-on:click="isReady">
          <h3>{{ uiLabels.participatePoll }}</h3>
        </button>
      </div>

    <div class="buttonDiv">
      <button class="startExistButton" v-on:click="startPoll" v-if="!start && !isClicked">
        <h4> {{uiLabels.startExistingPoll}} </h4>
      </button>
    </div>
    </div>

    <div class="start" v-if="start && !ready">
      <button class="back" v-on:click="isReady">
        {{ uiLabels.backButton }}
      </button>
      <div>
      <label id="pollName">
        {{ uiLabels.pollName }}
        <input type="text" v-model="pollId" />
      </label>
    </div>

    <div>
        <router-link v-bind:to="'/result/' + pollId" tag="button">
          <button class="participateButton" v-on:click="runQuestion">
          <h3>START</h3>
          </button>
        </router-link>
      </div>
    </div>

    <div class="start" v-if="ready">
      <button class="back" v-on:click="isReady">
        {{ uiLabels.backButton }}
      </button>
      <div>
        <label id="pollName">
          {{ uiLabels.pollName }}
          <input type="text" v-model="id" />
        </label>
      </div>

      <div>
        <router-link v-bind:to="'/poll/' + id" tag="button">
          <button class="participateButton" v-on:click="isClicked = true">
            <h3>Start</h3>
          </button>
        </router-link>
      </div>
    </div>

    <div class="help" v-if="wantHelp">
      <button class="back" v-on:click="wantHelp = false" style="float: left">
        {{ uiLabels.backButton }}
      </button>

      <h3>Customer Information</h3>
      <p>If you have any concerns regarding the website please call: 073-397 70 53</p>

    </div>

    <div class="info" v-if="wantInfo">
      <button class="back" v-on:click="wantInfo = false" style="float: left">
        {{ uiLabels.backButton }}
      </button>

      <h3>General info and bussiness idea</h3>

      <p>
        The best webapplication ever made, easy pollcreation 4 the win <br />
        EasyPoll works best in a classroom so the result can be shown on a big
        screen for the students
      </p>
      <h3>The creators</h3>
      <div class="creatorInfo">
        <div class="vilmaInfo">
          <p>Vilma Hägg Edelönn</p>
          <img
            class="vilma"
            src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.18169-9/14600832_1364866180211034_1798950174594637318_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=QEsj39RxgkQAX9eqH_1&_nc_ht=scontent-arn2-1.xx&oh=17508b40364919d9ae6db547e369a9d1&oe=61D62D74"
          />
          <p>
            Instagram:
            <a href="https://www.instagram.com/vilmahggedelnn/?hl=sv"
              >VilmasInstagram</a
            >
          </p>
          <p>Mail: vilmahggedelnn@gmail.com</p>
        </div>

        <div class="viktoriaSInfo">
          <p>Viktoria Svensson</p>
          <img
            class="viktoriaS"
            src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.18169-9/22310701_1197227793711557_2200564642596610941_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=bjgP2Grj6N0AX9S451u&_nc_ht=scontent-arn2-1.xx&oh=ec3a8246e4883f999f04a34a5b609593&oe=61D82352"
          />
          <p>
            Instagram :<a
              href="https://www.instagram.com/viktoria_svensson/?hl=sv"
              >VickansInstagram</a
            >
          </p>
          <p>Mail: vilmahggedelnn@gmail.com</p>
        </div>

        <div class="viktoriaZInfo">
          <p>Viktoria Zubenko</p>
          <img
            class="viktoriaZ"
            src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.6435-9/62450140_10156688965284055_2495346217672769536_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vrKwecNNKPsAX-B2SIm&_nc_ht=scontent-arn2-1.xx&oh=679f4db2cc0df53639e7c43be4f014f5&oe=61D79D55"
          />
          <p>
            Instagram:<a
              href="https://www.instagram.com/victoriiazubenko/?hl=sv"
              >VickansInstagram</a
            >
          </p>
          <p>Mail: vilmahggedelnn@gmail.com</p>
        </div>

        <div class="aliceInfo">
          <p>Alice Gardell</p>
          <img
            class="alice"
            src="https://avatars.githubusercontent.com/u/93650060?v=4"
          />
          <p>
            Instagram:<a href="https://www.instagram.com/alicegardell/?hl=sv"
              >AliceInstagram</a
            >
          </p>
          <p>Mail: alice.gardell@icloud.com</p>
        </div>
      </div>
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
      wantInfo: false,
      wantHelp: false,
      start:false,
      isClicked: false,
      pollId: "",
      questionNumber: 0,
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
    startPoll: function(){
      this.start=true;
      this.isClicked=true;
    },
    isReady: function() {
      if (this.ready==false && this.isClicked == false){
   this.ready=true;
   this.isClicked=true;
 }
 else{
   this.ready=false;
   this.isClicked=false;
 }
 this.start=false;
 },

 showInfo: function(){
   this.wantInfo = true;
   this.wantHelp = false;
 },
 showHelp: function(){
   this.wantInfo = false;
   this.wantHelp = true;
 }
/* runQuestion: function () {
   socket.emit("runQuestion", {
     pollId: this.pollId,
     questionNumber: this.questionNumber,
   });
 },*/
  },
};
</script>

<style>
header {
  background-image: url("https://data.whicdn.com/images/334251300/original.gif");
  height: 12em;
  margin: 0;
  margin-bottom:0.5em;
  /* border-radius: 25px; */
}

header h1 {
  text-align: center;
  margin: 0;
  font-size: 3.5em;
  font-family: "Lucida Console", "Monaco", monospace;

  color: rgb(224, 100, 187);
  text-transform: uppercase;

  position: relative;
  display: inline-block;
}

.welcomeMessage {
  margin-bottom: 2.3em;
}

#nav {
  background: rgb(243, 220, 243);
  height: 50em;
}

.firstMenu {
  margin-top: 5em;
}

.aboutUs {
  padding-left: 3em;
  padding-right: 3em;
  margin: 0;
  float: left;
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: bold;
}

.vilmaInfo {
  display: inline-block;
}
.viktoriaSInfo {
  display: inline-block;
}

.viktoriaZInfo {
  display: inline-block;
}

.aliceInfo {
  display: inline-block;
}

.vilma {
  width: 10em;
  border-radius: 50px;
}

.viktoriaS {
  border-radius: 50px;
  width: 10em;
}

.viktoriaZ {
  border-radius: 50px;
  width: 10em;
}

.alice {
  border-radius: 50px;
  width: 10em;
}

.creatorInfo {
  background: thistle;
  border-radius: 25em;
}
.creatorInfo img {
  padding-left: 2.6em;
  padding-right: 2.8em;
}

.info {
  height: 20em;
  background: thistle;
  border-radius: 25em;
}
.service {
  float: left;

  background: none;
  border: none;
  text-decoration: underline;
  font-weight: bold;
}

h3 {
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
.startExisting {
  display: grid;
  grid-gap: 0.3em;
  grid-template-columns: 50% 50%;
}

.startExisting div {
  padding: 1em;
}

.create {
  height: 10em;
}

.createButton {
  width: 70%;
  height: 100%;
  background-size: 300% 100%;
  border-radius: 25px;
  text-transform: uppercase;

  background-image: linear-gradient(
    to right,
    #e89aeb,
    #b67ee4,
    #b9a0e9,
    #dc3cf1
  );
  box-shadow: 7px 7px 15px 0 rgba(199, 23, 190, 0.75);
}

.createButton:hover {
  background-position: 100% 0;
}

.startExistButton{
  width: 50%;
  height: 100%;
  background-size: 300% 100%;
  border-radius: 25px;
  text-transform: uppercase;
  grid-template-columns: 50% 50%;

  background-image: linear-gradient(
    to right,
    #e89aeb,
    #b67ee4,
    #b9a0e9,
    #dc3cf1
  );
  box-shadow: 7px 7px 15px 0 rgba(199, 23, 190, 0.75);
}

.startExistButton:hover{
  background-position: 100% 0;
}

.participate {
  height: 10em;
}

.participateButton {
  width: 80%;
  height: 50%;
  background-color: rgb(164, 209, 164);
  border-radius: 25px;
}

.readyButton {
  width: 70%;
  height: 100%;
  background-color: rgb(161, 209, 161);
  border-radius: 25px;
  text-transform: uppercase;
  background-size: 300% 100%;

  background-image: linear-gradient(
    to right,
    #e89aeb,
    #b67ee4,
    #b9a0e9,
    #dc3cf1
  );
  box-shadow: 7px 7px 15px 0 rgba(199, 23, 190, 0.75);
}
.readyButton:hover {
  background-position: 100% 0;
}
.lang {
  margin: 0;
  padding: 0;
}

.languageButton {
  float: left;
  margin-left: 1em;
  font-weight: bold;
  width: 4em;
  height: 2em;
  border:none;
  background-color: rgba(0, 0, 0, 0);
}
.languageButton img {


  width: 3.3em;
  height: 1.6em;
}
.hoverLang {
  visibility: hidden;
  font-family: arial;
  font-size: 0.9em;
  padding: 0.5em;
  background-color: black;
  color: white;
  position: absolute;
  text-align: center;
  border-radius: 0.5em;
}
.languageButton:hover .hoverLang {
  visibility: visible;
}

button:hover {
  cursor: pointer;
}

.start {
  height: 30em;
  background-color: rgb(243, 220, 243);
  padding: 2em;
}
.start div {
  padding: 1em;
}


#pollName {
  font-size: 1.5em;
}

#pollName input {
  height: 1.5em;
  width: 12em;
}


@media only screen and (max-width: 500px) {
  .all {
    font-size: 12px;
  }

  h3{
    font-size:1em;
  }

}
</style>
