const redBtn = document.getElementById("red");
const blueBtn = document.getElementById("blue");
const greenBtn = document.getElementById("green");
const yellowBtn = document.getElementById("yellow");
const container = document.getElementById("level-title");
const startBtn = document.getElementById("startBtn");
const mobileTitle = document.getElementById("mobileH1");

const buttonEls = { 1: redBtn, 2: blueBtn, 3: greenBtn, 4: yellowBtn };
const soundNames = { 1: "red", 2: "blue", 3: "green", 4: "yellow" };
const idToNumber = { red: 1, blue: 2, green: 3, yellow: 4 };

let gameOn = 0;
let level = 0;
let isPlaying = false;
let resetTimer = null;

let randomSequence = [];
let followedSequence = [];

function startGame() {
  if (gameOn === 0) {
    gameOn = 1;
    nextRound();
  }
}

document.addEventListener("keydown", startGame);
startBtn.addEventListener("click", startGame);

function playSound(name) {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play().catch(() => {});
}

// Flash + sound for any button (used for both computer and player)
function flashButton(number) {
  const el = buttonEls[number];
  el.classList.add("pressed");
  playSound(soundNames[number]);
  setTimeout(() => el.classList.remove("pressed"), 500);
}

function setTitle(text) {
  container.textContent = text;
  mobileTitle.textContent = text;
}

function playSequence() {
  isPlaying = true;
  randomSequence.forEach((num, i) => {
    setTimeout(() => {
      flashButton(num);
      if (i === randomSequence.length - 1) {
        setTimeout(() => {
          isPlaying = false;
        }, 700);
      }
    }, i * 1000);
  });
}

function nextRound() {
  // Cancel any pending "Press Any Key to Restart" text from a previous game over
  clearTimeout(resetTimer);
  container.classList.remove("game-over");
  mobileTitle.classList.remove("game-over");
  
  level++;
  setTitle("Level " + level);
  startBtn.classList.add("is-playing");
  followedSequence = [];
  randomSequence.push(Math.floor(Math.random() * 4) + 1);
  
  isPlaying = true; // block clicks until the sequence finishes
  setTimeout(playSequence, 1000);
}

function checkAnswer(currentIndex) {
  if (followedSequence[currentIndex] === randomSequence[currentIndex]) {
    if (followedSequence.length === randomSequence.length) {
      isPlaying = true; // block clicks while waiting for next round
      setTimeout(nextRound, 1000);
    }
  } else {
    playSound("wrong");
    gameOver();
  }
}

function gameOver() {
  gameOn = 0;
  level = 0;
  randomSequence = [];
  followedSequence = [];
  isPlaying = false;
  
  setTitle("Wrong Button, Game Over");
  container.classList.add("game-over");
  mobileTitle.classList.add("game-over");
  startBtn.classList.remove("is-playing");
  startBtn.textContent = "Restart";
  
  resetTimer = setTimeout(() => {
    container.classList.remove("game-over");
    mobileTitle.classList.remove("game-over");
    container.textContent = "Press Any Key to Restart";
    mobileTitle.textContent = "Click 'Restart' to Restart";
  }, 2000);
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function() {
    if (isPlaying || gameOn === 0) return;
    
    const number = idToNumber[this.id];
    flashButton(number);
    followedSequence.push(number);
    checkAnswer(followedSequence.length - 1);
  });
});