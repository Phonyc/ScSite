let equationET;
let curveET;
let droiteET;
let curveVariSup;
let curveVariInf;
function initCurvesExpli() {

    equationET = "((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / (10000000000000000000*1280)";
    curveET = new Curve("expliTangenteSvg", equationET, {defaultTempsAnimation :"2s", "style": "stroke: #e5c185"})
    droiteET = new Droite("expliTangenteSvg", equationET, -120, -20, "2s", "", "tangentePointExpli")
    curveVariSup = new Curve("expliVariSup", "x**3", {"scaleX": 30,"style": "stroke: #e5c185"})
    curveVariInf = new Curve("expliVariInf", "-50*Math.exp(x)", {"scaleX": 50,"style": "stroke: #e5c185"})
    curveVariSup.entree("2s")
    curveVariInf.entree("2s")
}


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
