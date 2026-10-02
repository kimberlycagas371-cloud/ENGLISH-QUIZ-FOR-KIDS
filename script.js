// ---------- Word list (add more here!) ----------
// Format: [emoji, WORD]
const WORDS = [
  // 🐾 Animals
  ["🐱", "CAT"],
  ["🐶", "DOG"],
  ["🐘", "ELEPHANT"],
  ["🐦", "BIRD"],
  ["🐟", "FISH"],
  ["🐸", "FROG"],
  ["🐴", "HORSE"],
  ["🐮", "COW"],
  ["🐷", "PIG"],
  ["🐔", "CHICKEN"],
  ["🦁", "LION"],
  ["🐵", "MONKEY"],
  ["🐢", "TURTLE"],
  ["🐰", "RABBIT"],
  ["🐝", "BEE"],
  ["🦋", "BUTTERFLY"],

  // 🍎 Food
  ["🍎", "APPLE"],
  ["🍌", "BANANA"],
  ["🍞", "BREAD"],
  ["🍇", "GRAPES"],
  ["🍓", "STRAWBERRY"],
  ["🍉", "WATERMELON"],
  ["🥕", "CARROT"],
  ["🍕", "PIZZA"],
  ["🥛", "MILK"],
  ["🍚", "RICE"],
  ["🥚", "EGG"],
  ["🍪", "COOKIE"],

  // 🎨 Colors
  ["🔴", "RED"],
  ["🔵", "BLUE"],
  ["🟢", "GREEN"],
  ["🟡", "YELLOW"],
  ["🟠", "ORANGE"],
  ["🟣", "PURPLE"],
  ["🟤", "BROWN"],
  ["⚫", "BLACK"],
  ["⚪", "WHITE"],

  // 🏠 Things around us
  ["🚗", "CAR"],
  ["🏠", "HOUSE"],
  ["⚽", "BALL"],
  ["📖", "BOOK"],
  ["✏️", "PENCIL"],
  ["🎒", "BAG"],
  ["⏰", "CLOCK"],
  ["🪑", "CHAIR"],
  ["🔑", "KEY"],
  ["👟", "SHOE"],
  ["🎩", "HAT"],
  ["✈️", "PLANE"],
  ["🚌", "BUS"],
  ["🚲", "BIKE"],
  ["🚢", "SHIP"],

  // 🌈 Nature
  ["☀️", "SUN"],
  ["🌙", "MOON"],
  ["🌳", "TREE"],
  ["⭐", "STAR"],
  ["🌧️", "RAIN"],
  ["🌸", "FLOWER"],
  ["☁️", "CLOUD"],
  ["🔥", "FIRE"],
  ["🌈", "RAINBOW"],

  // 🧍 Body parts
  ["👁️", "EYE"],
  ["👂", "EAR"],
  ["👃", "NOSE"],
  ["👄", "MOUTH"],
  ["✋", "HAND"],
];

const TOTAL_QUESTIONS = 100;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ---------- Game state ----------
let questions = [];
let currentIndex = 0;
let score = 0;
let correctLetter = "";

// ---------- Page elements ----------
const gameEl = document.getElementById("game");
const endEl = document.getElementById("end");
const questionNumberEl = document.getElementById("question-number");
const scoreEl = document.getElementById("score");
const emojiEl = document.getElementById("emoji");
const wordEl = document.getElementById("word");
const choicesEl = document.getElementById("choices");
const messageEl = document.getElementById("message");

// ---------- Helpers ----------
function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

// ---------- Game flow ----------
function startGame() {
  questions = shuffle(WORDS).slice(0, TOTAL_QUESTIONS);
  currentIndex = 0;
  score = 0;

  gameEl.hidden = false;
  endEl.hidden = true;

  showQuestion();
}

function showQuestion() {
  const [emoji, word] = questions[currentIndex];
  const missingPosition = Math.floor(Math.random() * word.length);
  correctLetter = word[missingPosition];

  questionNumberEl.textContent = currentIndex + 1;
  scoreEl.textContent = score;
  emojiEl.textContent = emoji;
  messageEl.textContent = "";
  wordEl.textContent = word
    .split("")
    .map((letter, i) => (i === missingPosition ? "_" : letter))
    .join(" ");

  showChoices(word);
}

function showChoices(word) {
  // 1 correct letter + 2 random wrong letters
  const wrongLetters = shuffle(ALPHABET.filter((l) => l !== correctLetter)).slice(0, 2);
  const options = shuffle([correctLetter, ...wrongLetters]);

  choicesEl.innerHTML = "";
  options.forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => checkAnswer(button, letter, word));
    choicesEl.appendChild(button);
  });
}

function checkAnswer(button, letter, word) {
  if (letter !== correctLetter) {
    button.classList.add("wrong");
    messageEl.textContent = "Try again! 💪";
    return;
  }

  button.classList.add("right");
  score++;
  messageEl.textContent = "🎉 Great job!";
  wordEl.textContent = word.split("").join(" ");
  disableButtons();
  setTimeout(nextQuestion, 1000);
}

function disableButtons() {
  choicesEl.querySelectorAll("button").forEach((b) => (b.disabled = true));
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < TOTAL_QUESTIONS) {
    showQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  const stars = score >= 9 ? "🏆🏆🏆" : score >= 6 ? "⭐⭐" : "⭐";

  gameEl.hidden = true;
  endEl.hidden = false;
  endEl.innerHTML = `
    <div class="emoji">${stars}</div>
    <h2>You got ${score} out of ${TOTAL_QUESTIONS}!</h2>
    <button class="play-again" id="play-again">Play Again</button>
  `;
  document.getElementById("play-again").addEventListener("click", startGame);
}

// ---------- Start ----------
startGame();
