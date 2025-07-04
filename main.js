function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Deck = [
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 10 },
  { name: "Q", value: 10 },
  { name: "K", value: 10 },
  { name: "A", value: "Ace" },
];

let playerScoreE = document.getElementById("playerscore");
let dealerScoreE = document.getElementById("dealerScoreE");

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;
let win;

const faceDownCardE = `
  <div id="fliped" class='card-back w-20 h-28 rounded-md border-2 border-gray-300 shadow-md overflow-hidden'>
    <div class='bg-blue-800 w-full h-full flex items-center justify-center p-1'>
      <div class='bg-white w-full h-full rounded-sm flex items-center justify-center'>
        <div class="bg-blue-800 w-[90%] h-[90%] rounded-sm grid grid-cols-5 grid-rows-5 gap-1">
          <div class="bg-white rounded-full"></div>
          <div class="bg-white rounded-full"></div>
          <div class="bg-white rounded-full"></div>
          <div class="bg-white rounded-full"></div>
          <div class="bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
`;

function newCard() {
  if (!gameOver) return Deck[randomInt(0, Deck.length - 1)];
}

function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;

  for (let card of hand) {
    if (card.value === "Ace") {
      aceCount++;
      score += 11;
    } else {
      score += card.value;
    }
  }

  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
}

function gameStart() {
  console.clear();
  document.getElementById("gameBord").style.display = "block";
  const endgameE = document.getElementById("endgametext");
  endgameE.style.display = "none";
  endgameE.innerText = "haha , u";

  document.getElementById("player-hand").innerHTML = "";
  document.getElementById("dealer-hand").innerHTML = "";

  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;

  dealerHand.push(newCard());
  updateDealerHandE();
  document.getElementById("dealer-hand").innerHTML += faceDownCardE;

  playerHand.push(newCard());
  updatePlayerHandE();
  updatePlayerScore();

  playerHand.push(newCard());
  updatePlayerHandE();
  updatePlayerScore();

  document.getElementById("dealerScoreE").innerText = "??";

  console.log(playerHand);
  console.log(playerScore);
  console.log(dealerHand);
  console.log(dealerScore);
}

function updatePlayerScore() {
  playerScore = calculateScore(playerHand);
  playerScoreE.innerText = "Your total: " + playerScore;
}

function updateDealerScore() {
  dealerScore = calculateScore(dealerHand);
  dealerScoreE.innerText = dealerScore;
}

function hit() {
  if (gameOver) return;

  playerHand.push(newCard());
  updatePlayerHandE();
  updatePlayerScore();

  if (playerScore > 21) {
    gameOver = true;
    setTimeout(() => {
      win = false;
      endGame();
    }, 1000);
  }
}

async function dealerHit() {
  while (calculateScore(dealerHand) <= 16) {
    const card = newCard();
    dealerHand.push(card);
    updateDealerHandE();
    updateDealerScore();

    if (dealerScore > 21) {
      win = true;
      endGame();
      return;
    }

    await delay(1000);
  }
}

async function stand() {
  if (gameOver) return;

  DealerFlipCard();
  updateDealerScore();
  await dealerHit();
  await delay(1500);

  if (!gameOver) {
    win = playerScore > dealerScore;
    endGame();
  }
}

function makeCardE(card) {
  return `
    <div class="card-front w-20 h-28 bg-white rounded-md border-2 border-gray-300 flex flex-col p-1 shadow-md">
      <div class="text-red-600 font-bold text-left text-xl leading-none">${card.name}</div>
      <div class="flex-grow flex items-center justify-center text-red-600 text-4xl">TBD</div>
      <div class="text-red-600 font-bold text-right text-xl leading-none rotate-180">${card.name}</div>
    </div>`;
}

function updatePlayerHandE() {
  document.getElementById("player-hand").innerHTML += makeCardE(playerHand.at(-1));
}

function updateDealerHandE() {
  document.getElementById("dealer-hand").innerHTML += makeCardE(dealerHand.at(-1));
}

function DealerFlipCard() {
  const flipped = document.getElementById("fliped");
  if (flipped) flipped.remove();
  updateDealerHandE();
}

function endGame() {
  gameOver = true;
  document.getElementById("gameBord").style.display = "none";
  const endgameE = document.getElementById("endgametext");
  endgameE.style.display = "block";

  if (dealerScore > 21) {
    endgameE.innerText += " win";
    endgameE.style.backgroundColor = "green";
    return;
  }

  if (playerScore === dealerScore) {
    endgameE.innerText += " tie";
    endgameE.style.backgroundColor = "yellow";
  } else {
    endgameE.innerText += win ? " win" : " lose";
    endgameE.style.backgroundColor = win ? "green" : "red";
  }
}

document.addEventListener("DOMContentLoaded", gameStart);