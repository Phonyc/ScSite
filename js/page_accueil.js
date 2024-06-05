let BackCurveAccueil = new Curve("svgBackCurve", `((130-x)*(50-x)*(-605-x)*(-250-x)*(500-x))/(20000000*${window.innerWidth})`, "3s", true)
BackCurveAccueil.entree("5s");

document.getElementById("scrollToDiscover").addEventListener("click", goToSommaire);

function goToSommaire() {
    BackCurveAccueil.sortie("1.5s");
    setTimeout(() => {
        window.scrollTo(0, window.innerHeight)
    }, 1500)

}
