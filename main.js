console.log("JS loaded");

/*
 * CONSTANTS AND CACHED DOM ELEMENTS
 */

const suits =["c", "d", "h", "s"];
const nums = ["A", "02", "03", "04", "05", "06", "07", "08", "09","10" , "J", "Q", "K"];
let dealerHand = [];
let dealerHandValue = 0;
let playerHand =[];
let playerHandValue = 0;
let hitCount = 0;

const deck = [];


suits.forEach(function(suit) {
    nums.forEach(function(num){
        deck.push(suit + num);
    })
})

const playerBox = document.getElementById("player");
const dealerBox = document.getElementById("dealer");
/*
 *  UTILITY FUNCTIONS
 */

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

function toggleButtons(action) {
    switch(action) {
        case "handDealt": 
            deal.disabled = true;
            hit.disabled = false;
            stay.disabled = false;
            break;
        case "handFinished":
            deal.disabled = false;
            hit.disabled = true;
            stay.disabled = true;
            break;
        default:
            break;
        case "handStayed":
            deal.disabled = true;
            hit.disabled = true;
            stay.disabled = false;
            break;
    }
} 

function resetHand() {
    toggleButtons("handFinished");
    playerHand = [];
}

function checkHandValue() {
    let currentHandValue = calcHandValue(playerHand);
    if (currentHandValue === 21) {
        alert('You win');
        resetHand();
    } else if (currentHandValue > 21) {
        alert('Bust');
        resetHand();
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
    console.log(handDivs);
    playerDomNode.innerHTML = handDivs;
}

/*
 *  EVENT LISTENERS
 */
let deal = document.querySelector(".deal");
deal.addEventListener("click", function() {
    dealCards("player", 2);
    displayHands("player");
    toggleButtons("handDealt");
    checkHandValue();
});

let stay = document.querySelector(".stay");
stay.addEventListener("click", function(){
    toggleButtons("handFinished");
});

let hit = document.querySelector(".hit");
hit.addEventListener("click", function(){
    if (playerHand.length >= 5) {
        hit.disabled = true;
        return;
    }
    hitCount++;
    dealCards("player", 1);
    displayHands("player");
    toggleButtons("handStayed");
    checkHandValue();
});


/*
 * RENDER FUNCTIONS
 */

 
 
 //when i click stay i want no cards to be dealt to the player

function startGame() {
    shuffleDeck();
}
startGame();


