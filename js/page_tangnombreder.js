let equationET = "((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / 10000000000000000000000";
let curveET = new Curve("expliTangenteSvg", equationET, "2s", false)
let droiteET = new Droite("expliTangenteSvg", equationET, -120, -20)
// TODO ajouter les axes

actions = new Map([
    ["expliTangentePrenonsCourbe", ["curveET.entree('2s')", "curveET.sortie('2s')"]],
    ["expliTangentePrenonsPoints", ["droiteET.entree('0.5s', false, true)", "droiteET.sortie('0.5s', false, true)"]],
    ["expliTangenteTracerDroite", ["droiteET.entree('1s', true, false)", "droiteET.sortie('1s', true, false)"]],
    ["expliTangenteBougerPoint", ["sliderTEClick(true)", "sliderTEClick(false)"]],
])

let pageScrollerTangExpli = new PageScroller("pageTE", "scrollIndicatorTang", actions);

document.getElementById("pageTE").addEventListener('wheel', pageScrollerTangExpli.onScroll.bind(pageScrollerTangExpli));

function validatePointTE(point) {
    pageScrollerTangExpli.validatePoint(point, false);
}
let sliderET = document.getElementById("sliderET");
let diffpointsText = document.getElementById("diffpoints");
sliderET.value = 100

sliderET.oninput = function () {
    let distance = parseInt(this.value)
    updateSliderTE(distance);
    if (distance === 0) {
        sliderTEClick(true)
        document.getElementById("shwETSlid").click();
    } else {
        document.getElementById("shwETSlid").classList.remove("btOkEtapeValide")

        sliderTEClick(false, distance)
    }
}

function updateSliderTE(distance) {
    sliderET.value = distance
    droiteET.drawDroite(-120, -120 + distance)
    diffpointsText.innerText = `${distance}`

}

function sliderTEClick(valider = true, value = 100) {
    if (valider) {
        updateSliderTE(0)
    } else {
        updateSliderTE(value)
    }

}