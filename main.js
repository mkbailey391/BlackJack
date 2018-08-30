/*
 * CONSTANTS AND STATE
 */

const suits =["c", "d", "h", "s"];
const nums = ["A", "02", "03", "04", "05", "06", "07", "08", "09","10" , "J", "Q", "K"];
const deck = [];
let winner = false;
let allMonies = 150;
let currentBet = 0;

let dealerHand = [];
let playerHand =[];
let dealerHandValue = 0;
let playerHandValue = 0;

/*
 * CACHED DOM ELEMENTS
 */

const hit = document.querySelector(".hit");
const stay = document.querySelector(".stay");
const deal = document.querySelector(".deal");
const winnerMessage = document.querySelector('.winner-message');
const playerBox = document.getElementById("player");
const dealerBox = document.getElementById("dealer");
const reload = document.querySelector('.replay');
const chip = document.querySelector('.chip');
const currentBetNode = document.querySelector('#currentBet');
const currentMoneyNode = document.querySelector('#currentMoney');


/*
*  UTILITY FUNCTIONS
*/

suits.forEach(function(suit) {
    nums.forEach(function(num){
        deck.push(suit + num);
    })
})

//shuffle deck
function shuffleDeck(){
    for (let i = deck.length -1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function toggleClass(card, newClass) {
    let currentClass = card.classList[1];
    card.classList.remove(currentClass);
    card.classList.add(newClass);
}

function dealCards(player, numCards){
    if (player === "player") {
       for (var i=0; i < numCards; i++){
           let cardDealt = deck.pop();
           playerHand.push(cardDealt);
        }
    } else {
        for (var i=0; i < numCards; i++){
            let cardDealt = deck.pop();
            dealerHand.push(cardDealt);
        }
    }   
}

function checkHandValue() {
    let playerHandValue = calcHandValue(playerHand);
    let dealerHandValue = calcHandValue(dealerHand);

    if (playerHandValue > 21) {
        winnerMessage.innerText = "Dealer Won! Player bust!";
        currentBet = 0;
        winner = true;
        renderBets();
    } else if (dealerHandValue > 21) {
        winnerMessage.innerText = "Player Won! Dealer bust!";
        allMonies += 2 * currentBet;
        currentBet = 0;
        winner = true;
        renderBets();
    } else {
        if (playerHandValue >= dealerHandValue) {
            winnerMessage.innerText = "Player won!";
            allMonies += 2 * currentBet;
            currentBet = 0;
            winner = true;
            renderBets();
        } else {
            winnerMessage.innerText = "Dealer won!";
            currentBet = 0;
            winner = true;
            renderBets();
        }
    }
}

function calcHandValue(hand) {
    let currentHandValue = 0;
    hand.forEach(function(card) {
        let cardValue = card.substr(1);
        if (cardValue === "J" ||  cardValue === "Q" || cardValue === "K") {
            currentHandValue = currentHandValue + 10;    
        } else if (cardValue === "A") {
            currentHandValue = currentHandValue + 11;
        } else {
            currentHandValue = currentHandValue + parseInt(cardValue);
        }
    })
    return currentHandValue;
}

function displayHands(player){
    let handDivs = "";
    if ("player" === player) {
        for (var i=0; i<playerHand.length; i++){
            handDivs += `<div class="card ${playerHand[i]}"></div>`;
        }
    } else {
        for (var i=0; i<dealerHand.length; i++){
            handDivs += `<div class="card ${dealerHand[i]}"></div>`;
        }
    }
    
    let playerDomNode = player === "player" ? playerBox : dealerBox;
    playerDomNode.innerHTML = handDivs;
}

function renderBets() {
    currentBetNode.innerText = `$${currentBet}`;
    currentMoneyNode.innerText = `$${allMonies}`;
}
    
/*
 *  EVENT LISTENERS
 */

deal.addEventListener("click", function() {
    dealCards("player", 2);
    dealCards("dealer", 2);
    displayHands("player");
    displayHands("dealer");
    
    const firstDealerCard = document.querySelector('#dealer .card:first-child');
    firstDealerCard.classList.remove(firstDealerCard.classList[1]);
    firstDealerCard.classList.add('back');

    deal.disabled = true;
    hit.disabled = false;
    stay.disabled = false;

});

stay.addEventListener("click", function(){
    stay.disabled = true;
    hit.disabled = true;

    while (calcHandValue(dealerHand) < 17) {
        dealCards("dealer", 1);
        displayHands(playerHand);
    }

    checkHandValue();

});

hit.addEventListener("click", function() {

    dealCards("player", 1);
    displayHands("player");

    if (calcHandValue(playerHand) > 21) {
        checkHandValue();
    }

    if (playerHand.length >= 5 || winner) {
        hit.disabled = true;
    }

    if (winner) {
        stay.disabled = true;
    }

});

chip.addEventListener('click', function(evt) {
    

    if (evt.target.classList[0] === "chip10" && allMonies >= 10) {
        allMonies -= 10;
        currentBet += 10;
    }

    if (evt.target.classList[0] === "chip5" && allMonies >= 5) {
        allMonies -= 5;
        currentBet += 5;
    }

    renderBets();
})


reload.addEventListener('click', function() {
    window.location.reload();
})

/*
 * RENDER FUNCTIONS
 */

function startGame() {
    shuffleDeck();
}

startGame();


