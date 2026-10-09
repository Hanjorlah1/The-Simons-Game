const redBtn = document.getElementById("red");
const blueBtn = document.getElementById("blue");
const greenBtn = document.getElementById("green");
const yellowBtn = document.getElementById("yellow");
const container = document.getElementById("level-title");
let gameOn = 0;
let level = 0;
let isPlaying = false;

document.addEventListener("keydown", () => {
  if (gameOn === 0) {
    nextRound();
    gameOn = 1;
  }
});

let randomSequence = [];
let followedSequence = [];

function randomBtn(number) {
  if (number === 1) {
    redBtn.classList.add("pressed");
    const redAudio = new Audio("./sounds/red.mp3");
    redAudio.play();
    setTimeout(() => {
      redBtn.classList.remove("pressed");
    }, 500);
  } else if (number === 2) {
    blueBtn.classList.add("pressed");
    const blueAudio = new Audio("./sounds/blue.mp3");
    blueAudio.play();
    setTimeout(() => {
      blueBtn.classList.remove("pressed");
    }, 500);
  } else if (number === 3) {
    const greenAudio = new Audio("./sounds/green.mp3");
    greenAudio.play();
    greenBtn.classList.add("pressed");
    setTimeout(() => {
      greenBtn.classList.remove("pressed");
    }, 500);
  } else {
    yellowBtn.classList.add("pressed");
    const yellowAudio = new Audio("./sounds/yellow.mp3");
    yellowAudio.play();
    setTimeout(() => {
      yellowBtn.classList.remove("pressed");
    }, 500);
  }
}

function playSequence() {
  isPlaying = true;
  for (let i = 0; i < randomSequence.length; i++) {
    setTimeout(() => {
      randomBtn(randomSequence[i]);
      if (i === randomSequence.length - 1) {
        setTimeout(() => {
          isPlaying = false;
        }, 1000);
      }
    }, i * 1000);
  }
}

function nextRound() {
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  followedSequence = [];
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  randomSequence.push(randomNumber);

  setTimeout(() => {
    playSequence();
  }, 1000);
}

function checkAnswer(currentLevel) {
  if (followedSequence[currentLevel] === randomSequence[currentLevel]) {
    if (followedSequence.length === randomSequence.length) {
      console.log("Round finished! Moving to next round...");
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  } else {
    gameOn = 0;
    const wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    console.log("Wrong button! Game over.");
    resetGame();
  }
}

function resetGame() {
  level = 0;
  document.getElementById("level-title").textContent = "Press Any Key to Start";
  randomSequence = [];
  followedSequence = [];
  console.log("Game reset! Press start or call nextRound() to play again.");
  container.textContent = "Wrong Button, Game Over";
  container.classList.add("game-over");
  setTimeout(() => {
    container.classList.remove("game-over");
    container.textContent = "Press Any Key to Restart";
  }, 1500);
}

const btn = document.querySelectorAll(".btn");
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    if (isPlaying) return;
    let btnId = this.id;
    if (btnId === "red") {
      redBtn.classList.add("pressed");
      setTimeout(() => {
        redBtn.classList.remove("pressed");
      }, 500);
      followedSequence.push(1);
      checkAnswer(followedSequence.length - 1);
      if (gameOn === 1) {
        const redAudio = new Audio("./sounds/red.mp3");
        redAudio.play();
      }
    } else if (btnId === "blue") {
      followedSequence.push(2);
      blueBtn.classList.add("pressed");
      setTimeout(() => {
        blueBtn.classList.remove("pressed");
      }, 500);
      checkAnswer(followedSequence.length - 1);
      if (gameOn === 1) {
        const blueAudio = new Audio("./sounds/blue.mp3");
        blueAudio.play();
      }
    } else if (btnId === "green") {
      greenBtn.classList.add("pressed");
      setTimeout(() => {
        greenBtn.classList.remove("pressed");
      }, 500);
      followedSequence.push(3);
      checkAnswer(followedSequence.length - 1);
      if (gameOn === 1) {
        const greenAudio = new Audio("./sounds/green.mp3");
        greenAudio.play();
      }
    } else if (btnId === "yellow") {
      yellowBtn.classList.add("pressed");
      setTimeout(() => {
        yellowBtn.classList.remove("pressed");
      }, 500);
      followedSequence.push(4);
      checkAnswer(followedSequence.length - 1);
      if (gameOn === 1) {
        const yellowAudio = new Audio("./sounds/yello.mp3");
        yellowAudio.play();
      }
    }
  });
}
