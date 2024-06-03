let x2 = 100
function initPage1() {
    document.getElementById("titlePage1").classList.remove("pageTitleHidden")
    document.getElementById("btFermerP1").classList.remove("overElementHidden")
    document.getElementById("scrollToPassP1").classList.remove("overElementHidden")
    for (let ligne of document.getElementById("btFermerP1").children) {
        ligne.classList.add("ligneCroixTourne")
    }
    document.getElementById("page3").addEventListener('wheel', updateProgressBar);
    svgelem = document.getElementById('expliTangenteSvg')
    decalage_expli_tan = svgelem.width.baseVal.value / 2;
    let ExpliTangslider = document.getElementById("sliderExpliTangente");
    let diffpoints = document.getElementById("diffpoints");
    ExpliTangslider.value = x2;
    ExpliTangslider.oninput = function () {
        x2 = parseInt(this.value);
        draw_tangente_expli_droite_at_points(-120, -120 + x2, drcurve, drpoints);
        diffpoints.innerText = `${x2}`
        if (x2 === 0) {
            setTimeout(() => {
                document.getElementById("expliTangenteOptientTang").classList.remove("EtapeExpliHidden");
            }, 500);
        }
    }
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
            draw_tangente_expli_axes()
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
// TODO Ajout "Scroller pour continuer" et "Scroller plus pour changer de page"
// let explitaneq = "((105 - x) * (321 - x) * (94 - x) * (-498 - x) * (-404 - x)) / 10000000000";
// let explitaneq = "((105 - x) * (321 - x) * (94 - x) * (-498 - x) * (-404 - x)) / 10000000000";
// let explitaneq = "((438 - x) * (-293 - x) * (421 - x) * (-168 - x) * (-399 - x) * (337 - x) * (-58 - x) * (-34 - x) * (-180 - x) * (268 - x)) / 100000000000000000000";
let explitaneq = "((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / 10000000000000000000000";
// let explitaneq = "((314 - x) * (-476 - x) * (271 - x) * (-172 - x) * (201 - x) * (484 - x) * (264 - x) * (-460 - x) * (-350 - x)) / 100000000000000000000";
// let explitaneq = "((-351 - x) * (346 - x) * (-312 - x) * (387 - x) * (253 - x) * (-211 - x) * (-183 - x) * (498 - x) * (365 - x)) / 100000000000000000000";
// let explitaneq = "((-457 - x) * (48 - x) * (219 - x) * (-103 - x) * (-468 - x) * (-253 - x) * (125 - x)) / 100000000000000";
// let explitaneq = "((405 - x) * (195 - x) * (27 - x) * (166 - x) * (331 - x) * (-236 - x) * (-181 - x)) / 100000000000000";
// let explitaneq = "((259 - x) * (468 - x) * (-127 - x) * (-19 - x) * (192 - x)) / 1000000000";
// let explitaneq = "((350 - x) * (288 - x) * (427 - x) * (-111 - x) * (32 - x)) / 1000000000";
// let explitaneq = "((-107 - x) * (-489 - x) * (-212 - x) * (-60 - x) * (-225 - x)) / 1000000000";

// let explitaneq = "0";
let svgelem = null
let decalage_expli_tan = 0

let marge_tang_ex = 40;
function draw_tangente_expli_main_curve() {

    let d = "";
    let hgt = svgelem.height.baseVal.value;
    for (let x = -decalage_expli_tan - marge_tang_ex; x < decalage_expli_tan + marge_tang_ex; x++) {
        let y = -getImage(x, explitaneq) + hgt / 2;
        if (y < hgt + marge_tang_ex && y > -marge_tang_ex) {
            d += (x + decalage_expli_tan) + ',' + y + ' ';
        }
    }

    let curve = document.getElementById('expliTangenteCurveMaincurve')
    curve.setAttribute('d', 'M' + d);
    let ln = curve.getTotalLength();
    curve.style.strokeDasharray = ln;
    curve.style.strokeDashoffset = ln;
    curve.style.setProperty("--entrdashoffset-tangente-expli", `-${ln}`);
    curve.style.animation = "entreeTangEx 1s linear forwards"
}

function draw_tangente_expli_axes() {
    let dabs = "";
    let hgt = svgelem.height.baseVal.value;
    for (let x of [-decalage_expli_tan, decalage_expli_tan]) {
        dabs += (x + decalage_expli_tan) + ',' + hgt / 2 + ' ';
    }

    let abs = document.getElementById('expliTangenteCurveAxeAb')
    abs.setAttribute('d', 'M' + dabs);

    let dord = "";
    for (let y of [0, hgt]) {
        dord += decalage_expli_tan + ',' + y + ' ';
    }

    let ord = document.getElementById('expliTangenteCurveAxeOr')
    ord.setAttribute('d', 'M' + dord);
}

function draw_tangente_expli_droite_at_points(x1, x2, courbe = true, points = false) {
    let d = "";
    let hgt = svgelem.height.baseVal.value;
    let y1 = -getImage(x1, explitaneq)
    let y2 = -getImage(x2, explitaneq)

    let temp_eq = equationDroite(x1, -y1, x2, -y2)

    if (points) {
        let pt1 = document.getElementById('expliTangentePTang1')
        let pt2 = document.getElementById('expliTangentePTang2')
        pt1.setAttribute('cx', x1 + decalage_expli_tan);
        pt1.setAttribute('cy', `${y1 + hgt / 2}`);
        pt2.setAttribute('cx', x2 + decalage_expli_tan);
        pt2.setAttribute('cy', `${y2 + hgt / 2}`);
        pt1.style.opacity = "1";
        pt2.style.opacity = "1";
    }

    if (courbe) {
        for (let x of [-decalage_expli_tan, x1, x2, decalage_expli_tan]) {
            let y = 0;
            if (x1 === x2) {
                y = -gettangente(x1, x, explitaneq) + hgt / 2
            } else {
                y = -getImage(x, temp_eq) + hgt / 2;
            }
            d += (x + decalage_expli_tan) + ',' + y + ' ';
        }
        let curve = document.getElementById('expliTangenteCurveTangente')
        curve.setAttribute('d', 'M' + d);
        let ln = curve.getTotalLength();
        curve.style.strokeDasharray = ln;
        curve.style.strokeDashoffset = ln;
        curve.style.setProperty("--entrdashoffset-tangente-expli-tang", `-${ln}`);
        curve.style.animation = "entreeTangEx 1s linear forwards"
    }

}

function expliTan_removepoints() {
    let pt1 = document.getElementById('expliTangentePTang1')
    let pt2 = document.getElementById('expliTangentePTang2')
    pt1.style.opacity = "0";
    pt2.style.opacity = "0";
}

function expliTan_removedroite() {
    let curve = document.getElementById('expliTangenteCurveTangente')
    curve.style.strokeDashoffset = "0"
    curve.style.animation = "sortieTangExTang 1s linear forwards"
}
function expliTan_removecurve() {
    let curve = document.getElementById('expliTangenteCurveMaincurve')
    curve.style.strokeDashoffset = "0"
    curve.style.animation = "sortieTangEx 1s linear forwards"
}
function equationDroite(x1, y1, x2, y2) {
    let a = (y1 - y2) / (x1 - x2);
    let b = y1 - a * x1;
    return `${a}*x + ${b}`;
}


let drpoints = false
let drcurve = false
function validatePoint(point) {
    let pointId = point.parentNode.id;
    let validate = !point.classList.contains("btOkEtapeValide")
    if (validate) {
        point.classList.add("btOkEtapeValide");
    } else {
        point.classList.remove("btOkEtapeValide");
    }
    let idToShowNext = "";
    let time_wait = 800
    switch (pointId) {
        case "expliTangentePrenonsCourbe":
            if (validate) {
                
                draw_tangente_expli_main_curve();
            } else {
                
                expliTan_removecurve();
            }
            idToShowNext = "expliTangentePrenonsPoints";
            break;
        case "expliTangentePrenonsPoints":
            if (validate) {
                drpoints = true;
                draw_tangente_expli_droite_at_points(-120, -120 + x2, false, true);
            } else {
                drpoints = false;
                expliTan_removepoints();
            }
            idToShowNext = "expliTangentePrenonsTracerCourbe";
            time_wait = 100;
            break;
        case "expliTangentePrenonsTracerCourbe":
            if (validate) {
                drcurve = true
                draw_tangente_expli_droite_at_points(-120, x2 - 120);
            } else {
                drcurve = false
                expliTan_removedroite();
            }
            idToShowNext = "expliTangenteBougerPoint";
            time_wait = 100;
            break;
    }
    
    if (idToShowNext !== "" && validate) {
        setTimeout(() => {
            document.getElementById(idToShowNext).classList.remove("EtapeExpliHidden");
        }, time_wait);
    }

}
