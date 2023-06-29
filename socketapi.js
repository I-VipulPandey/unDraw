const io = require( "socket.io" )();
const socketapi = {
    io: io
};




 // Socket.IO event handlers
// socketapi.js

// Keep track of drawing data
let drawingData = null;

// Event listener for new connections
io.on('connection', function(socket) {
  console.log('A user connected');

  // Join a room
  socket.on('joinRoom', function(room) {
    socket.join(room);
    console.log('User joined room: ' + room);

    // If drawing data is available, send it to the newly joined user
    if (drawingData) {
      socket.emit('draw', drawingData);
    }
  });

  // Event listener for receiving drawing data from clients
  socket.on('draw', function(data) {
    // Update the drawing data
    drawingData = data;

    // Broadcast the drawing data to all other clients in the room
    socket.to('whiteboard').emit('draw', data);
  });

  // Event listener for disconnecting users
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

// end of socket.io logic

module.exports = socketapi;