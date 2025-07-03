
//!(restart when the game ends ) problem
/**
 *
 * @param {int} min
 * @param {int} max
 * @returns random element betwiin max and min
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * the cards that u can drow from (simplified , ace logic verfied in the methodes)
 */
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
//* some variables
let playerScoreE = document.getElementById("playerscore");
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;
let win;
/**
 *
 * @returns generates a random new card
 */
function newCard() {
  if(!gameOver)
  return Deck[randomInt(0, Deck.length - 1)];
}

function gameStart() {
 //TODO: u have to add a variable : cantRestart to fix the (restart when the game ends ) problem
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

  dealerHand.push(newCard());
  updateDealerHandE();
  console.log("dealer:" + dealerScore);
  playerHand.push(newCard());
  updatePlayerHandE();
  playerHand.push(newCard());
  updatePlayerHandE();
  document.getElementById("dealerScoreE").innerText = "??";
  playerHand.forEach((card) => {
    if (card.value == "Ace") {
      playerScore = playerScore + 11 > 21 ? 1 : 11;
    } else {
      playerScore += card.value;
    }
  });
  dealerHand.forEach((card) => {
    if (card.value == "Ace") {
      dealerScore += 11 > 21 ? 1 : 11;
    } else {
      dealerScore += card.value;
    }
  });
  playerScoreE.innerText = "Your total: " + playerScore;

  console.log(playerHand);
  console.log(playerScore);
  console.log(dealerHand);
  console.log(dealerScore);
}
function updatePlayerScore() {
  card = playerHand[playerHand.length - 1];
  if (card.value == "Ace") {
    playerScore += (playerScore + 11 > 21) ? 1 : 11;
  } else {
    playerScore += card.value;
  }
  playerScoreE.innerText = "Your total: " + playerScore;
}
/**
 * !the players hit (accuers when pressing a button)
 * @returns void
 */
function hit() {
  if (!gameOver) {
    playerHand.push(newCard());
    updatePlayerHandE();
    updatePlayerScore();

    if (playerScore > 21) {
      gameOver=true
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
      dealerHand.push(newCard());
      updateDealerHandE();
      const card = dealerHand.at(-1);
      console.log(card);
      if (card.value == "Ace") dealerScore += dealerScore + 11 > 21 ? 1 : 11;
      else dealerScore += card.value;
      document.getElementById("dealerScoreE").innerText = dealerScore;
      if (dealerScore > 21) {
        win = true;

        endGame();
        return;
      }
      dealerHit(); //? recurcive call
    }, 1000);
  }
}

function stand() {
  if(gameOver==true)
    return
  document.getElementById("dealerScoreE").innerText = dealerScore;

  dealerHit();
  setTimeout(() => {
    win = playerScore > dealerScore;

    endGame();
  }, 1500);
}
function makeCardE(card) {
  let cardE = `  <div class="card-front w-20 h-28 bg-white rounded-md border-2 border-gray-300 flex flex-col p-1 shadow-md">
                <div class="text-red-600 font-bold text-left text-xl leading-none">${card.name}</div>
                <div class="flex-grow flex items-center justify-center text-red-600 text-4xl">TBD</div>
                <div class="text-red-600 font-bold text-right text-xl leading-none rotate-180">${card.name} </div>
            </div>`;
  return cardE;
}
/**
 * & updates the players cards , must be done after each push
 */
function updatePlayerHandE() {
  let playerHandE = document.getElementById("player-hand");
  playerHandE.innerHTML += makeCardE(playerHand.at(-1));
}
/**
 * & updates the dealers cards , must be done after each push 
 */
function updateDealerHandE() {
  let dealerHandE = document.getElementById("dealer-hand");
  dealerHandE.innerHTML += makeCardE(dealerHand.at(-1));
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
    endgameE.innerText += "tie";
    endgameE.style.backgroundColor = "yellow";
  } else {
    endgameE.innerText += win ? " win" : " lose";
    endgameE.style.backgroundColor = win ? "green" : "red";
  }
 

  // return gameOver;
}
console.log("thing")


