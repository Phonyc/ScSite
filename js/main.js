let BackCurveAccueil = new Curve("svgBackCurve", `((130-x)*(50-x)*(-605-x)*(-250-x)*(500-x))/(20000000*${window.innerWidth})`, "3s", true)


let  BackCurveAccueil1 = new Curve("svgBackCurve", `((105 - x) * (321 - x) * (94 - x) * (-498 - x) * (-404 - x)) / (10000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil4 = new Curve("svgBackCurve", `((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / (10000000000000000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil5 = new Curve("svgBackCurve", `((314 - x) * (-476 - x) * (271 - x) * (-172 - x) * (201 - x) * (484 - x) * (264 - x) * (-460 - x) * (-350 - x)) / (100000000000000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil6 = new Curve("svgBackCurve", `((-351 - x) * (346 - x) * (-312 - x) * (387 - x) * (253 - x) * (-211 - x) * (-183 - x) * (498 - x) * (365 - x)) / (100000000000000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil7 = new Curve("svgBackCurve", `((-457 - x) * (48 - x) * (219 - x) * (-103 - x) * (-468 - x) * (-253 - x) * (125 - x)) / (100000000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil8 = new Curve("svgBackCurve", `((405 - x) * (195 - x) * (27 - x) * (166 - x) * (331 - x) * (-236 - x) * (-181 - x)) / (100000000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil9 = new Curve("svgBackCurve", `((259 - x) * (468 - x) * (-127 - x) * (-19 - x) * (192 - x)) / (1000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil10 = new Curve("svgBackCurve", `((350 - x) * (288 - x) * (427 - x) * (-111 - x) * (32 - x)) / (1000000*${window.innerWidth})`, "3s", false);
let  BackCurveAccueil11 = new Curve("svgBackCurve", `((-107 - x) * (-489 - x) * (-212 - x) * (-60 - x) * (-225 - x)) / (1000000*${window.innerWidth})`, "3s", false, undefined, undefined, "stroke: green");

// BackCurveAccueil1.entree("1s")

// BackCurveAccueil3.entree("3s")
// BackCurveAccueil4.entree("4s")
// BackCurveAccueil5.entree("5s")
// BackCurveAccueil6.entree("6s")
// BackCurveAccueil7.entree("7s")
// BackCurveAccueil8.entree("8s")
// BackCurveAccueil9.entree("9s")
// BackCurveAccueil10.entree("10s")
// BackCurveAccueil11.entree("3s")
BackCurveAccueil.entree("3s");

createQuadrillage()
document.getElementById("pageTE").scrollTo(0, 0)
window.scrollTo(0, 0)
// TODO Scroller tous les éléments scrollables à 0

// scrollTo(0, window.innerHeight * 2)

