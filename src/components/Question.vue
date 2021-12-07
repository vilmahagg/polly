<template>
  <div class="question" v-if="selectedAnswer == null || answered==false">
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
  <div v-if="answered">
  <div
    class="waitingDiv"
    :class="{ selectedAnswer: selectedAnswer == index }"
    
  > 
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    
    
      <h1> You answered: <h1 class = "waitingAnswer"> {{question.a[selectedAnswer]}}</h1></h1>
      <h2>Get ready for the next question</h2>
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
    question: function() {
      this.answered = false;
    }
  },
  data: function () {
    return {
      selectedAnswer: null,
      answered: false,
    };
  },
  
  methods: {
    answer: function (answer, index) {
      this.$emit("answer", answer);
      this.selectedAnswer = index;
      this.answered = true;
      
    },
  },
};
</script>


<style scoped>
.question {
  background-color: rgb(186, 226, 176);
  height: 30em;
  overflow: hidden;
}

.answers {
  padding: 1em;
}

/* Lekte med css för att göra coola knappar här nedan,
fritt att ändra/radera hur man vill */

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

  /* moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out; */

  background-image: linear-gradient(
    to right,
    #25aae1,
    #40e495,
    #30dd8a,
    #2bb673
  );
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}

.answerOption:hover {
  background-position: 100% 0;
  /* moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out; */
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  z-index: 999;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fdd;
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
  position:relative;
 
  font-family: "Lucida Console", "Monaco", monospace;
  height: 20em;
  width: 40em;
  background-color: rgb(223, 158, 228);
   position: fixed;
    top: 30%;
    left: 30%;
}
.waitingAnswer{
  color:rgb(226, 51, 21);
  font-size: 1em;
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
/* Här tar knapplekandet slut */
</style>