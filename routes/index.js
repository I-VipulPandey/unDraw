var express = require('express');
var router = express.Router();
const crypto = require("crypto");

/* GET home page. */

const boards = [];

function generateBoardId() {
  const id = crypto.randomBytes(16).toString("hex");
  return id;
  
}

router.get('/', function (req, res, next) {
  
  res.render('start');

});

// Create board route
router.get('/create', (req, res) => {
  const boardId = generateBoardId();
  boards.push(boardId); 
  res.redirect(`/board/${boardId}`);
});

// join board route
router.post('/join/:boardId', (req, res) => {
  const boardId = req.body.boardId;
  res.redirect(`/board/${boardId}`);
});

// // Join board route
// router.get('/join', (req, res) => {
//   res.render('start')
// });

// Board route
router.get('/board/:boardId', (req, res) => {
  const { boardId } = req.params;
  if (boards.includes(boardId)) {
    res.render('index',{boardId});
  } else {
    res.send(`<h1>Board not found!</h1>`);
  }
});




module.exports = router;
