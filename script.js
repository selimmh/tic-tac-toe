// CONSTANTS

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMsgElement = document.getElementById('winMsg')
const restartButton = document.getElementById('restartButton')
const resetButton = document.getElementById('resetButton')
const darkmodeButton = document.getElementById('darkMode')
const winMsgTextElement = document.querySelector('[data-msg-win-text]')
var scoreX = document.getElementById('scoreX')
var scoreO = document.getElementById('scoreO')
let circleTurn


// main calls
restartGame()
restartButton.addEventListener('click', restartGame)
darkmodeButton.addEventListener('click', darkMode)
resetButton.addEventListener('click', resetScores)


// FUNCTIONS
// resets all data
function restartGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winMsgElement.classList.remove('show')
}

// handles user click
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } 
  else if (isDraw()) {
    endGame(true)
  } 
  else {
    swapTurns()
    setBoardHoverClass()
  }
}


function endGame(draw) {
  if (draw) {
    winMsgTextElement.innerText = 'Draw ❌'
  } 
  else if (circleTurn){
    winMsgTextElement.innerText = "O wins 🎉"
    scoreO.innerText++
  }
  else if (!circleTurn){
    winMsgTextElement.innerText = "X wins 🎉"
    scoreX.innerText++
  }

  winMsgElement.classList.add('show')
}

// checks if game was draw
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

// places mark on the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// swaps turns
function swapTurns() {
  circleTurn = !circleTurn
}

// enables hover
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

// checks if there is winner
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

// dark mode
function darkMode() {
    var element = document.body
    element.classList.toggle("dark-mode-toggler")
    if(darkmodeButton.innerText === "🌕 Light Mode") {
      darkmodeButton.innerText = "🌑 Dark Mode";
    }
    else {
      darkmodeButton.innerText = "🌕 Light Mode"
    }
  } 

  //score table

  function resetScores() {
    scoreO.innerText = 0
    scoreX.innerText = 0
  }
