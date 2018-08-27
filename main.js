console.log("JS loaded")


//let cards = ["cA", "c02", "c03", "c04", "c05", "c06", "c07", "c08", "c09", "c10", "cJ", "cQ", "cK"];
//let card = document.querySelector(".card");

const suits =["c", "d", "h", "s"];
const nums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"];
var dealerHand =[];
var playerHand= [];

const cards = [];
suits.forEach(function(suit){
    nums.forEach(function(num){
        cards.push(suit + num)
    })
})
console.log(cards)


// Shuffle the deck


function shuffleCards(){
    for (let i = cards.length -1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

//function toggleClass(className) {
  //let currentClass = card[0].classList[1];
    //card[0].classList.remove(currentClass);
    //card[0].classList.add(className);
//}

//toggleClass("cJ");
//toggleClass("c02");