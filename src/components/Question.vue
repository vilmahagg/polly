<template>

 <button class="themeButton" v-on:click="theme">Dark theme</button>

 <div v-if="!dark">
  <div class="question" v-if="selectedAnswer == null || answered == false">
   
    <p class="theQuestion">{{ question.q }}</p>
    
    <div class="answers">
      <button
        class="answerOption"
        :class="{ selectedAnswer: selectedAnswer == index }"
        v-for="(a, index) in question.a"
        v-on:click="answer(a, index)"
        v-bind:key="a"
      >
        <h2>{{ a }}</h2>
      </button>
    </div>
    </div>
  </div>

  

 <div v-if="dark">
<div class="questionDark" v-if="selectedAnswer == null || answered == false">
 
    <p class="theQuestionDark" >{{ question.q }}</p>
    <div class="answers">
      <button
        class="answerOption"
        :class="{ selectedAnswer: selectedAnswer == index }"
        v-for="(a, index) in question.a"
        v-on:click="answer(a, index)"
        v-bind:key="a"
      >
        <h2>{{ a }}</h2>
      </button>
    </div>
    </div>
  </div>
  
  <div class="waitingBackground" v-if="answered && !dark">
    <div
      class="waitingDiv" v-if="!dark"
      :class="{ selectedAnswer: selectedAnswer == index }"
    >
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <br />
      <h1 class="youAnswered">
        You answered:
        <h1 class="waitingAnswer">{{ question.a[selectedAnswer] }}</h1>
      </h1>
      <h2 class="getready">Get ready for the next question</h2>
    </div>
    </div>

    <div class="waitingBackgroundDark" v-if="answered && dark">
    <div
      class="waitingDivDark" v-if="dark"
      :class="{ selectedAnswer: selectedAnswer == index }"
    >
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <br />
      <h1 class="youAnswered">
        You answered:
        <h1 class="waitingAnswer">{{ question.a[selectedAnswer] }}</h1>
      </h1>
      <h2 class="getreadyDark" >Get ready for the next question</h2>
     
    </div>
  </div>
 
</template>

<script>
export default {
  name: "Question",
  props: {
    question: Object,
  },
  watch: {
    question: function () {
      this.answered = false;
    },
  },
  data: function () {
    return {
      selectedAnswer: null,
      answered: false,
      dark:false,
    };
  },

  methods: {
    answer: function (answer, index) {
      this.$emit("answer", answer);
      this.selectedAnswer = index;
      this.answered = true;
    },
    theme: function(){
      

      if(this.dark==true){
        this.dark=false;
      }
      else{
        this.dark=true;
      }

    }
  },
};
</script>


<style scoped>

.themeButton{
  
  margin-top: 1em;
  border-radius: 0.5em;
  background-color: #e89aeb;

}

.question {
  background-color: rgb(226, 201, 238);
  height: 60em;
  overflow-y: auto;
}

.questionDark{
  background-color: rgb(46, 48, 46);
  height: 60em;
  overflow-y: auto;
}


.answers {
  padding: 1em;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.answerOption {
  height: 4em;
  width: 10em;
  margin: 2em;
  border: none;
  color: #fff;
  cursor: pointer;
  text-align: center;
  background-size: 300% 100%;
  border-radius: 0.5em;
  width: auto;
  height: auto;
  padding-left: 1.2em;
  padding-right: 1.2em;
  transition: 0.3s;
  background-image: linear-gradient(
    to right,
    #e89aeb,
    #b67ee4,
    #b9a0e9,
    #dc3cf1
  );
}

.answerOption:hover {
  background-position: 100% 0;
 
}

.lds-ring {
  margin: 0;
  width: 70px;
  height: 70px;
  top: 10%;
  position: relative;
  margin: 0 auto;
 
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 70px;
  height: 70px;
  margin: 0px;
  border: 9px solid #fdd;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fdd transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.waitingDiv {
  display: inline-block;
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  height: 20em;
  width: 50%;
  background-color: rgb(223, 158, 228);
  top: 10em;
  margin: 0 auto;
  border-radius: 25px;
}

.waitingBackground{
  background-color: rgb(226, 201, 238);
  height: 60em;
}
.waitingBackgroundDark{
  background-color:  rgb(44, 42, 44);
  height: 60em;
}
.waitingDivDark {
  display: inline-block;
  position: relative;
  font-family: "Lucida Console", "Monaco", monospace;
  height: 20em;
  width: 50%;
  background-color: rgb(44, 42, 44);
  top: 10em;
  margin: 0 auto;
  border-radius: 25px;
}

.waitingDiv h1 {
  display: inline;
}
.waitingAnswer {
  color: rgb(226, 51, 21);
  font-size: 1.3em;
  padding: 0em;
}

.youAnswered {
  color: rgb(160, 116, 240);
  font-size: 2em;
  padding: 0em;
  top: 8%;
}

.getready {
  margin-top: 8%;
}
.getreadyDark {
  margin-top: 8%;
  color: #fff;
}

.theQuestion {
  font-size: 2.5em;
  font-family: "Lucida Console", "Monaco", monospace;
  text-align: center;
  color: rgb(224, 100, 187);
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
}
.theQuestionDark {
  font-size: 2.5em;
  font-family: "Lucida Console", "Monaco", monospace;
  text-align: center;
  color: rgb(250, 250, 250);
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
}

@media only screen and (max-width: 500px) {
  .all {
    font-size: 8px;
  }

  .waitingDiv {
    text-align: center;
    position: relative;
    font-family: "Lucida Console", "Monaco", monospace;
    height: 20em;
    width: 100%;
    background-color: rgb(223, 158, 228);
    top: 10em;
    margin: 0 auto;
    border-radius: 25px;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    border: 8px solid #fdd;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fdd transparent transparent transparent;
  }
}
</style>