var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(msg) {
  console.log(msg);
  var li = $('<li></li>');
  li.text(msg.from+ ": " + msg.text)
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('#text').val()
  }, function() {
    console.log('Got it');
  });

})