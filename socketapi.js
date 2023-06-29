const io = require( "socket.io" )();
const socketapi = {
    io: io
};




 // Socket.IO event handlers
 io.on('connection', (socket) => {
   // Join room event handler
   socket.on('joinRoom', (room) => {
     socket.join(room);
   });

   // Draw event handler
   socket.on('draw', (data) => {
     // Broadcast the drawing data to all clients in the room
     socket.to('whiteboard').emit('draw', data);
   });
 });
// end of socket.io logic

module.exports = socketapi;