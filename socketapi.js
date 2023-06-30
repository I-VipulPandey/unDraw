const io = require( "socket.io" )();
const socketapi = {
    io: io
};


const boards = {};

// Handle socket connections
io.on('connection', (socket) => {
  let currentBoard = null;

  // Join a whiteboard room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    currentBoard = roomId;

    // Load board data (if available)
    if (boards[currentBoard]) {
      socket.emit('loadBoard', boards[currentBoard]);
    }
  });

  // Receive drawing data from a client
  socket.on('draw', (data) => {
    if (currentBoard) {
      boards[currentBoard] = data;
      // Broadcast the drawing data to all clients in the room
      socket.to(currentBoard).emit('draw', data);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    currentBoard = null;
  });
});
// end of socket.io logic

module.exports = socketapi;