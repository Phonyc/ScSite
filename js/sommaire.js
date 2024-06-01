
function goToCard1(card) {
     if (card.id === "sommaireCard2") {
         card.style.top = "-44vh"
         card.style.left = "0"
     } else if (card.id === "sommaireCard3") {
         card.style.top = "-86vh"
         card.style.right = "0"
     }
    document.querySelectorAll(".sommaireCard").forEach((tpcard) => {
        tpcard.classList.add("unclickedCard")
    });
     card.classList.add("clickedCard");

    setTimeout(() => {
        window.scrollTo(0, 2 * window.innerHeight);
    }, 1000)
        // TODO Remove clickedCardClass en revenant
}

