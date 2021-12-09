function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a, result: d.resultType});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
    socket.emit('contentUpdate', data.getAllQuestions(d.pollId));
  });

  socket.on('addSlide', function(d){
    data.addSlide(d.pollId, {q: d.q, a: d.a, result: d.resultType}, d.slide);
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
    socket.emit('contentUpdate', data.getAllQuestions(d.pollId));
  })

  socket.on('deleteQuestion', function(d) {
    data.deleteQuestion(d.pollId, d.index);
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
    socket.emit('contentUpdate', data.getAllQuestions(d.pollId));
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, {q: d.q, a: d.a, result: d.resultType}, d.index, d.slide);
    // socket.emit('questionEdited', data.getAllQuestions(d.pollId));
    socket.emit('contentUpdate', data.getAllQuestions(d.pollId));
    
  });

  socket.on('moveUp', function(d){
    data.moveUp(d.pollId,d.index);
    socket.emit('contentUpdate', data.getAllQuestions(d.pollId));
  });
    
  socket.on('moveDown', function(d){
    data.moveDown(d.pollId,d.index);
    socket.emit('contentUpdate', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
 
}

module.exports = sockets;