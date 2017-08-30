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

socket.on('newLocationMessage', function(location) {
  console.log(location);
  var li = $('<li></li>');
  li.text(location.from+ ": ");

  var a = $('<a>My Current Location</a>');
  a.attr('target', '_blank');
  a.attr('href', location.url);

  li.append(a)
  $('#messages').append(li)
})

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('#text').val()
  }, function() {
    $('#text').val('')
  });
});


var locationButton = $('#location-button');
 locationButton.on('click', function(e) {
  e.preventDefault();

  if(!navigator.geolocation) {
    alert('Geolocation not supported by your browser!');
  } else {
    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.removeAttr('disabled').text('Send Location');
    }, function() {
      alert('Unable to fetch location!')
    })
  }
 })