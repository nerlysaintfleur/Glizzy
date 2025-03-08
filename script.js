let score = 0;
let timeLeft = 30;
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const hotdogArea = document.getElementById("hotdog-area");

// Load 7 different pop sounds
const popSounds = [
  new Audio("pop1.mp3"),
  new Audio("pop2.mp3"),
  new Audio("pop3.mp3"),
  new Audio("pop4.mp3"),
  new Audio("pop5.mp3"),
  new Audio("pop6.mp3"),
  new Audio("pop7.mp3"),
];

// Make sure to add a pop.mp3 file

function createHotdog() {
  const hotdog = document.createElement("span");
  hotdog.innerHTML = "🌭";
  hotdog.classList.add("hotdog");

  // Random positioning

  hotdog.style.left = Math.random() * 90 + "vw";
  hotdog.style.top = "-50px";

  // Random falling speed (2s to 5s)

  let fallDuration = Math.random() * 3 + 2;
  hotdog.style.animation = `fall ${fallDuration}s linear`;

  // Click event for desktop & mobile

  const collectHotdog = () => {
    score++;
    scoreDisplay.textContent = score;

    //Play a random pop sound
    let randomPop = popSounds[Math.floor(Math.random() * popSounds.length)];
    randomPop.currentTime = 0; //Reset sound to start if played in quick succession
    randomPop.play();

    hotdog.remove();
  };
  hotdog.onclick = collectHotdog;
  hotdog.ontouchstart = collectHotdog;

  // Mobile touch event

  hotdogArea.appendChild(hotdog);

  // Remove hotdog after it falls

  setTimeout(() => hotdog.remove(), fallDuration * 1000);
}

// Generate hotdogs at intervals

let hotdogInterval = setInterval(createHotdog, 700);

// Timer countdown

let timerInterval = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(hotdogInterval);
    clearInterval(timerInterval);
    localStorage.setItem("finalScore", score);
    window.location.href = "gameover.html";
  }
}, 1000);
