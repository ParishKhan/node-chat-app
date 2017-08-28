const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.on('disconnect', () => {
    console.log("User Disconnected");
  });

  socket.on('createMessage', (msg) => {
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date()
    });
  });

  
});



server.listen(PORT, () => console.log('App is listening on PORT '+PORT));