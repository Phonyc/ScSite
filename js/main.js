let margeForCurves = 30

createQuadrillage()


actions = new Map([
    ["expliTangentePrenonsCourbe", ["curveET.entree('2s')", "curveET.sortie('2s')"]],
    ["expliTangentePrenonsPoints", ["droiteET.entree('0.5s', false, true)", "droiteET.sortie('0.5s', false, true)"]],
    ["expliTangenteTracerDroite", ["droiteET.entree('1s', true, false)", "droiteET.sortie('1s', true, false)"]],
    ["expliTangenteBougerPoint", ["sliderTEClick(true)", "sliderTEClick(false)"]],
])

let listCurves = [
    [`((130-x)*(50-x)*(-605-x)*(-250-x)*(500-x))/(20000000*1280)`],
    [`((105 - x) * (321 - x) * (94 - x) * (-498 - x) * (-404 - x)) / (10000000*1280)`,
        `((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / (10000000000000000000*1280)`,
        `((314 - x) * (-476 - x) * (271 - x) * (-172 - x) * (201 - x) * (484 - x) * (264 - x) * (-460 - x) * (-350 - x)) / (100000000000000000*1280)`,
        `((405 - x) * (195 - x) * (27 - x) * (166 - x) * (331 - x) * (-236 - x) * (-181 - x)) / (100000000000*1280)`],
    [`((-351 - x) * (346 - x) * (-312 - x) * (387 - x) * (253 - x) * (-211 - x) * (-183 - x) * (498 - x) * (365 - x)) / (100000000000000000*1280) - ${window.innerHeight / 4}`,
    `((-457 - x) * (48 - x) * (219 - x) * (-103 - x) * (-468 - x) * (-253 - x) * (125 - x)) / (100000000000*1280) - ${window.innerHeight / 5}`,
    `((259 - x) * (468 - x) * (-127 - x) * (-19 - x) * (192 - x)) / (1000000*1280) - ${window.innerHeight / 5}`,
    `((350 - x) * (288 - x) * (427 - x) * (-111 - x) * (32 - x)) / (1000000*1280) - ${window.innerHeight / 5}`,
    `((-107 - x) * (-489 - x) * (-212 - x) * (-60 - x) * (-225 - x)) / (1000000*1280) - ${window.innerHeight / 5}`]
]

let bgGest;
let pageScrollerTangExpli;
function initMainGests() {
    bgGest = new BackGroudCurveGest("svgBackCurve", listCurves, [1, 5], [1, 2], [0])
    
    pageScrollerTangExpli = new PageScroller("pageTE", "scrollIndicatorTang", actions, bgGest);

}

setTimeout( () => {
    initMainGests()
    initCurvesExpli();
    document.getElementById("pageTE").addEventListener('wheel', pageScrollerTangExpli.onScroll.bind(pageScrollerTangExpli));
    document.getElementById("btFermerP1").addEventListener('click', changeRadius);
}, 100)

document.addEventListener("DOMContentLoaded", function () {

    renderMathInElement(document.body, {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
    });
});

