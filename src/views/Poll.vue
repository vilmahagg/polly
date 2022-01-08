  <template>
    <div id="nav">
  <header>

        <h1>EasyPoll</h1>
      <div class="pollName">
      <p>{{uiLabels.pollId}}:{{pollId}}</p>
      <Question v-bind:question="question"
                v-on:answer="submitAnswer"/>
    </div>
    </header>
    <div class="page" v-if="emptyPoll">
      <p id= "noQuestion"> {{uiLabels.noQuestions}}</p>
      <router-link v-bind:to="'//'" tag="button">
        <button class="tillbakaTillStart">{{uiLabels.backToStart}}</button>
      </router-link>
    </div>

  <main class="page" v-if="!emptyPoll">
    <div class ="finishDiv" v-if="isFinished && !emptyPoll">
      <h2 v-if="!emptyPoll">{{uiLabels.pollCompleted}}</h2>
      <p style ="font-weight:bold">{{uiLabels.youAns}}:</p>
      <p v-for="(answer,key) in answers" v-bind:key="answer">
       {{uiLabels.q}} {{key+1}}: {{answer}}
        </p>
        <div v-if="!emptyPoll">
         <router-link v-bind:to="'//'" tag="button">
                <button class="startRouter">{{uiLabels.backToStart}}</button>
              </router-link>
              </div>
    </div>
  </main>
</div>
  </template>

  <script>
  // @ is an alias to /src
  import Question from '@/components/Question.vue';
  import io from 'socket.io-client';
  const socket = io();

  export default {
    name: 'Poll',
    components: {
      Question
    },
    data: function () {
      return {
        question: {
          q: "",
          a: [],
        },
        lang:"",
        uiLabels:{},
        result:"",
        answers:[],
        isFinished:false,
        pollId: "inactive poll",
        emptyPoll:false,
      }
    },
    created: function () {
      this.pollId = this.$route.params.id
      this.lang = this.$route.params.lang;

      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.emit('joinPoll', this.pollId)
      socket.on("newQuestion", q =>
        this.question = q
      )
      socket.on("allQuestions", (questions) => {
        this.questions = questions;
        if(this.questions.length==0){
          this.emptyPoll = true;
        }
      });
    },


    methods: {
      submitAnswer: function (answer) {
        socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
        if (JSON.stringify(this.question)=== JSON.stringify(this.questions[this.questions.length-1])){
          this.isFinished = true;
        }
        this.answers.push(answer);

      },
    }
  }
  </script>

  <style>
  .errortext{
    position:absolute;
  }
  .finishDiv {
    display: inline-block;
    position: relative;
    font-family: "Lucida Console", "Monaco", monospace;
    height: 50vh;
    width: 100%;
    background-color: rgb(223, 158, 228);
    top: 5em;
    margin: 0 auto;
    border-radius: 25px;
  }
  .startRouter{
    display: inline-block;
    padding: 0.7em 1.4em;
    margin: 1em 0.3em 0.3em 0;
    border-radius: 0.15em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Lucida Console", "Monaco", monospace;
    text-transform: uppercase;
    font-weight: 400;
    color: white;
    background-color: #ab87ee;
    box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
    text-align: center;
    position: relative;
    border: none;
  }
  .tillbakaTillStart {
    display: inline-block;
    padding: 0.7em 1.4em;
    margin: 1em 0.3em 0.3em 0;
    border-radius: 0.15em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Lucida Console", "Monaco", monospace;
    text-transform: uppercase;
    font-weight: 400;
    color: white;
    background-color: #ab87ee;
    box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
    text-align: center;
    position: relative;
    border: none;
  }
  header {
    height:auto;
    margin: 0;
    font-family: "Lucida Console", "Monaco", monospace;
    text-align: center;
    color: rgb(224, 100, 187);
    overflow: hidden;
    position: relative;
  }
  .noQuestion{
    position: static;
  }
  #page{
    background-color: rgb(226, 201, 238);
    height: 60em;
    overflow-y: auto;
  }
  .colour{
    background-color: black;
    height: 100000em;

    height: 60em;
  }
  #nav {
    background: rgb(243, 220, 243);
    height: 100vh;
  }
  </style>
