var socket = io();

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = $('#messages li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params , function(err) {
    if(err) {
      alert(err)
      window.location.href = "/";
    } else {
      console.log('No Error');
    }
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('updateUserList', function(users) {
  var ol = $('<ol></ol>');

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage', function(msg) {
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: msg.createdAt
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(location) {
  var template = $('#location-template').html();
  var html = Mustache.render(template, {
    from: location.from,
    url: location.url,
    createdAt: location.createdAt
  })

  $('#messages').append(html);
  scrollToBottom();
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