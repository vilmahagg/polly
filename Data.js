'use strict';

// testar att pusha detta


const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.createQuestion = function(pollId,) {
  poll.question = {};
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.addSlide = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("add slide");
  if (typeof poll !== 'undefined') {
    poll.questions[q.slide]=q;
  }
}

Data.prototype.deleteQuestion = function(pollId,index) {
  const poll = this.polls[pollId];
  console.log("delete: ", poll.questions[index]);
  if (typeof poll !== 'undefined') {
    poll.questions.splice(index,1);
    return poll.questions
  }
  return []
}

Data.prototype.editQuestion = function(pollId, newQuestion, index) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
  console.log("question ", index, " in poll: ", pollId, " updated to:", newQuestion)
}

Data.prototype.moveUp = function(pollId, index){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    let temp = poll.questions[index];
    let temp2 = poll.questions[index-1]
    poll.questions[index] = temp2;
    poll.questions[index-1] = temp;
  }
}

Data.prototype.moveDown = function(pollId, index){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    if (typeof poll.questions[index + 1] !== 'undefined') {
      let temp = poll.questions[index];
      let temp2 = poll.questions[index+1]
      poll.questions[index] = temp2;
      poll.questions[index+1] = temp;
    }
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.getAllQuestions = function(pollId) {
  const poll = this.polls[pollId];
  console.log("get all questions");
  if (typeof poll !== 'undefined') {
    return poll.questions
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined'){
       return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}

Data.prototype.resetPoll = function(pollId) {
  const poll = this.polls[pollId];
  poll.answers = [];
}
module.exports = Data;
