
// let curve_transition_card = `((-400 - x)*(-350 - x)*(-200 - x)*(-100+x)*(80 + x)*(200 - x)*(250 - x))/(1.858e17*${window.innerWidth})`;
//

function goToCard1(card) {
     if (card.id === "sommaireCard2") {
         card.style.top = "-44vh"
         card.style.left = "0"
     } else if (card.id === "sommaireCard3") {
         card.style.top = "-86vh"
         card.style.right = "0"
     }
    card.classList.add("clickedCard");

    setTimeout(() => {
        window.scrollTo(0, 2 * window.innerHeight);
    }, 1000)
    setTimeout(() => {
        card.classList.remove("clickedCard");
    }, 2000)

}