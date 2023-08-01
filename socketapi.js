// Initialize Socket.IO
const io = require("socket.io")();
const socketapi = {
  io: io,
};

const boards = {};

// Function to send the current board data to all clients in a room
function sendCurrentBoardData(roomId) {
  if (boards[roomId]) {
    io.to(roomId).emit('loadBoard', boards[roomId]);
  }
}

// Handle socket connections
io.on('connection', (socket) => {
  let currentBoard = null;

  // Join a whiteboard room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    currentBoard = roomId;
    sendCurrentBoardData(currentBoard); // Send current board data to the newly joined user
  });

  // Receive drawing data from a client
  socket.on('draw', (data) => {
    if (currentBoard) {
      boards[currentBoard] = data;
      // Broadcast the drawing data to all clients in the room (including the sender)
      io.to(currentBoard).emit('draw', data);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    currentBoard = null;
  });
});

module.exports = socketapi;
