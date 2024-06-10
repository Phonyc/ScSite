let equationET;
let curveET;
let droiteET;
let curveVariSup;
let curveVariInf;
let equationsDS = [["50*Math.sin(x)", "50*Math.cos(x)", "sin(x)", 50], ["x**4", "4*x", "x^4", 20], ["x**3", "3*x", "x^3", 20]];
let curvesDS = [];
function initCurvesExpli() {

    equationET = "((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / (10000000000000000000*1280)";
    curveET = new Curve("expliTangenteSvg", equationET, {defaultTempsAnimation :"2s", "style": "stroke: #e5c185"})
    droiteET = new Droite("expliTangenteSvg", equationET, -120, -20, "2s", "", "tangentePointExpli")
    curveVariSup = new Curve("expliVariSup", "x**3", {"scaleX": 30,"style": "stroke: #e5c185"})
    curveVariInf = new Curve("expliVariInf", "-50*Math.exp(x)", {"scaleX": 50,"style": "stroke: #e5c185"})
    equationsDS.forEach((equation, index) => {
        let crv = new Curve(`expliDSCurveSvg`, equation[0], {"scaleX": equation[3],"style": "stroke: #e5c185"})
        let drv = new Curve(`expliDSDerSvg`, equation[1], {"scaleX": equation[3],"style": "stroke: #e5c185"})
        curvesDS.push([crv, drv])
    });
    curvesDS.forEach((curves, index) => {
        document.getElementById("DSchooser").innerHTML += `<div class="card cardEq" id="curvesDSChoix${index}" onclick="showDSCurve('curvesDSChoix${index}', ${index})"><p>$\\forall x \\in \\mathbb{R}, f(x) = ${equationsDS[index][2]} $</p></div>`
        });
        
        curveVariSup.entree("2s")
        curveVariInf.entree("2s")
        
        let ax = new Droite("expliDSDerSvg", "0", -100, 100, "0S", "stroke:#333333", "hiddenPointTan")
        ax.entree()

}
function showDSCurve(id, index) {
    let element = document.getElementById(id);
    let listElems = Array.from(document.querySelectorAll("#DSchooser .cardEq"))
    listElems.forEach((el, tempIndex) => {
        if (el.classList.contains("cardEqSelected")) {

            curvesDS[tempIndex][0].sortie("1s")
            curvesDS[tempIndex][1].sortie("1s")
            el.classList.remove("cardEqSelected")
        }
    });
        
        element.classList.add("cardEqSelected")
        curvesDS[index][0].entree("1.5s")
        curvesDS[index][1].entree("1.5s")
    
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
