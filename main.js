console.log("JS loaded")

const suits =["c", "d", "h", "s"];
const nums = ["A", "02", "03", "04", "05", "06", "07", "08", "09","10" , "J", "Q", "K"];
const dealerHand =[];
const playerHand =[];
const deck = []; 

suits.forEach(function(suit) {
    nums.forEach(function(num){
        deck.push(suit + num)
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
    if (player === "player"){
       for (var i=0; i < numCards; i++){
           let cardDealt = deck.pop()
           playerHand.push(cardDealt);
        }
    } else {
        for (var i=0; i < numCards; i++){
            let cardDealt = deck.pop()
            dealerHand.push(cardDealt);
        }
    }   
}
    


//         for (var i = 0; i < 2; i++);
//         {
//             for (var j = 0; j < playerHand.length; j++)
//             {
//             cardDealt = cards.pop();
//             playersHand[0].push(cards);

//         }
//     }
// }


