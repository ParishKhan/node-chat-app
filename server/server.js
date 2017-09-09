const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');

const app = express();
const PORT = process.env.PORT || 3002;
var users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');

 // socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));

 // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


  socket.on('join', (params, callback) => {
     if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room required');
     }
     socket.join(params.room);
     users.removeUser(socket.id);
     users.addUser(socket.id, params.name, params.room);

     io.to(params.room).emit('updateUserList', users.getUserList(params.room));
     socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
     socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

     callback()
  })


  socket.on('createMessage', (msg, callback) => {
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date()
    // })
  });


  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });  
});



server.listen(PORT, () => console.log('App is listening on PORT '+PORT));