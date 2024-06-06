let equationET = "((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / 10000000000000000000000";
let curveET = new Curve("expliTangenteSvg", equationET, "2s", false, undefined, undefined, "stroke: #e5c185")
let droiteET = new Droite("expliTangenteSvg", equationET, -120, -20, "2s", "", "tangentePointExpli")
// TODO ajouter les axes

actions = new Map([
    ["btFirst", ["BackCurveAccueil.entree('3s')", "BackCurveAccueil.sortie('1s');BackCurveAccueil1.entree('2s');BackCurveAccueil4.entree('4s')", 1000]],
    ["expliTangentePrenonsCourbe", ["curveET.entree('2s')", "curveET.sortie('2s')", 0]],
    ["expliTangentePrenonsPoints", ["droiteET.entree('0.5s', false, true)", "droiteET.sortie('0.5s', false, true)", 0]],
    ["expliTangenteTracerDroite", ["droiteET.entree('1s', true, false)", "droiteET.sortie('1s', true, false)", 0]],
    ["expliTangenteBougerPoint", ["sliderTEClick(true)", "sliderTEClick(false)", 0]],
])


let pageScrollerTangExpli = new PageScroller("pageTE", "scrollIndicatorTang", actions);

document.getElementById("pageTE").addEventListener('wheel', pageScrollerTangExpli.onScroll.bind(pageScrollerTangExpli));

function validatePointTE(point) {
    pageScrollerTangExpli.validatePoint(point, false, false);
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
    if (distance === 0) {
        diffpointsText.innerText = "0.01"
    } else {
        diffpointsText.innerText = `${distance}`
    }
}

function sliderTEClick(valider = true, value = 100) {
    if (valider) {
        updateSliderTE(0)
    } else {
        updateSliderTE(value)
    }
}
