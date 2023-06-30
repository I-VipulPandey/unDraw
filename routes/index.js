const io = require( "socket.io" )();
const socketapi = {
    io: io
};
var express = require('express');
var router = express.Router();
const crypto = require("crypto");

/* GET home page. */

// Store board data
const boards = {};

function generateBoardId() {
  const id = crypto.randomBytes(16).toString("hex");
  return id;
  
}

router.get('/', function (req, res, next) {
  
  res.render('start');

});

// Create board route
router.get('/create', (req, res) => {
  const newBoardId = generateBoardId();
  boards[newBoardId] = null; 
  res.redirect(`/board/${newBoardId}`);

});

// join board route
router.post('/join/:roomId', (req, res) => {

  const { roomId } = req.body;
  console.log(boards[roomId])
  if (boards[roomId] !== undefined) {
    res.redirect(`/board/${roomId}`);
  } else {
    res.send('Board not found');
  }

});

// // Join board route
// router.get('/join', (req, res) => {
//   res.render('start')
// });

// Board route
router.get('/board/:boardId', (req, res) => {

    res.render('index');
});









module.exports = router;
