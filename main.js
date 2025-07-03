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
let dealerScoreE=document.getElementById("dealerscoreE")
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
  if (!gameOver)
    return Deck[randomInt(0, Deck.length - 1)];
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
  playerHand.push(newCard());
  updatePlayerHandE();

  document.getElementById("dealerScoreE").innerText = "??";

  playerHand.forEach((card) => {
    if (card.value == "Ace") {
      playerScore = playerScore + 11 > 21 ? playerScore + 1 : playerScore + 11;
    } else {
      playerScore += card.value;
    }
  });

  dealerScore += dealerHand[0].value;
  playerScoreE.innerText = "Your total: " + playerScore;

  console.log(playerHand);
  console.log(playerScore);
  console.log(dealerHand);
  console.log(dealerScore);
}

function updatePlayerScore() {
  const card = playerHand[playerHand.length - 1];
  if (card.value == "Ace") {
    playerScore += (playerScore + 11 > 21) ? 1 : 11;
  } else {
    playerScore += card.value;
  }
  playerScoreE.innerText = "Your total: " + playerScore;
}

function hit() {
  if (!gameOver) {
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

    console.log(playerHand);
    console.log(playerScore);
    return;
  }
  console.log("game already over ");
}

function dealerHit() {
  if (dealerScore <= 16) {
    setTimeout(() => {
      const card = newCard();
      dealerHand.push(card);
      updateDealerHandE();

      if (card.value == "Ace")
        dealerScore += dealerScore + 11 > 21 ? 1 : 11;
      else
        dealerScore += card.value;

      document.getElementById("dealerScoreE").innerText = dealerScore;

      if (dealerScore > 21) {
        win = true;
        endGame();
        return;
      }

      dealerHit(); // recurse
    }, 1000);
  }
}

function stand() {
  if (gameOver) return;
  DealerFlipCard();
  document.getElementById("dealerScoreE").innerText = dealerScore;
  dealerHit();

  setTimeout(() => {
    if (!gameOver) {
      win = playerScore > dealerScore;
      endGame();
    }
  }, 1500);
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
  let playerHandE = document.getElementById("player-hand");
  playerHandE.innerHTML += makeCardE(playerHand.at(-1));
}

function updateDealerHandE() {
  let dealerHandE = document.getElementById("dealer-hand");
  dealerHandE.innerHTML += makeCardE(dealerHand.at(-1));
}

function DealerFlipCard() {
  const flipped = document.getElementById("fliped");
  if (flipped) flipped.remove(); // remove the face-down card
  updateDealerHandE(); // show real card
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

  if (playerScore == dealerScore) {
    endgameE.innerText += " tie";
    endgameE.style.backgroundColor = "yellow";
  } else {
    endgameE.innerText += win ? " win" : " lose";
    endgameE.style.backgroundColor = win ? "green" : "red";
  }
}

// Optional: Auto-start
document.addEventListener("DOMContentLoaded", gameStart);
function updateDealerScore(){
  const card = dealerHand[playerHand.length - 1];
  if (card.value == "Ace") {
   dealerScore += (dealerScore + 11 > 21) ? 1 : 11;
  } else {
    dealerScore += card.value;
  }
  dealerScoreE.innerText = "Your total: " + dealerScore;

}