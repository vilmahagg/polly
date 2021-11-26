<template>
  <div class="question">
    <p>{{question.q}}</p>

    <div class="answers">
     <button class="answerOption" :class="{'selectedAnswer':selectedAnswer == index}" v-for="(a, index) in question.a" v-on:click="answer(a, index)" v-bind:key="a">
       <h2> {{ a }} </h2>
      </button>
    </div>
  </div>

</template>

<script>
export default {
  name: "Bars",
  props: {
    question: Object,
  },
  data: function(){
      return{
        selectedAnswer: null
      }
      
  },
  methods: {
    answer: function (answer, index) {
      this.$emit("answer", answer);
      this.selectedAnswer = index;
    },
  },
};
</script>


<style scoped>
.question {
  background-color:rgb(243, 219, 167);
  height: 20em;
}

.answers{
  padding: 1em;
}

/* Lekte med css för att göra coola knappar här nedan,
fritt att ändra/radera hur man vill */

*{
  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.answerOption{
  height: 4em;
  width: 10em;
  margin: 2em;
  border: none;
  color: #fff;
  cursor: pointer;
  text-align:center;
  background-size: 300% 100%;

    border-radius: 0.5em;
    
    /* moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out; */

    background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);

}

.answerOption:hover {
    background-position: 100% 0;
    /* moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out; */
}

.selectedAnswer{
  color: black;
  
} 

/* Här tar knapplekandet slut */



</style>