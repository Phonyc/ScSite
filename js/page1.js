function initPage1() {
    document.getElementById("titlePage1").classList.remove("pageTitleHidden")
    document.getElementById("btFermerP1").classList.remove("overElementHidden")
    document.getElementById("scrollToPassP1").classList.remove("overElementHidden")
    for (let ligne of document.getElementById("btFermerP1").children) {
        ligne.classList.add("ligneCroixTourne")
    }
    document.getElementById("page3").addEventListener('wheel', updateProgressBar);
    console.log(document.getElementById("page3").scrollTop)
}

function resetPassBar() {
    passProgress = 0
    setTimeout(() => {
        passProgress = 0
        document.getElementById("passIndicatorP1").style.setProperty("--avancee", "0");
    }, 500);
}

let phase = 0
let passProgress = 0;
let max_before_pass = 300;
let reseter = null;
let pageProgress = 0.1;
let endroitScroll = 0

function updateProgressBar(e) {
    if (phase === 0 || phase === 1) {
        clearTimeout(reseter);
        passProgress = Math.min(Math.max(passProgress + e.deltaY, -max_before_pass), max_before_pass);
        document.getElementById("passIndicatorP1").style.setProperty("--avancee", `${Math.abs(passProgress) / max_before_pass}`);
        if (passProgress >= max_before_pass) {
            endroitScroll = 1;
            document.getElementById("page3").scrollTo(0, window.innerHeight * endroitScroll)
            resetPassBar()
        } else if (passProgress <= -max_before_pass) {
            endroitScroll = 0
            document.getElementById("page3").scrollTo(0, endroitScroll)
            resetPassBar()
        } else {
            reseter = setTimeout(() => {
                passProgress = 0
                document.getElementById("passIndicatorP1").style.setProperty("--avancee", "0");
            }, 500);
        }

        pageProgress = endroitScroll * 0.1 + 0.1

    }
    document.getElementById("progressIndicatorP1").style.setProperty("--avancee-page", `${pageProgress}`);
}
