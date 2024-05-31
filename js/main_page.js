let decalage = window.innerWidth / 2;
let marge = 10
let main_eq = `((130-x)*(50-x)*(-605-x)*(-250-x)*(500-x))/(20000000*${window.innerWidth})`;

// let main_eq = "(x/50+8)*(x/50-5)*(x/50-10) + 100";
function crea_quadr() {
    let quadr = document.getElementById("quadrillage");
    let innerhtml = ""
    let casemul = 10
    let caseunit = "px"

    // horizontal
    for (let i = 0; i < window.innerHeight / casemul; i += 3) {
        innerhtml += `<line x1="0" y1="${i * casemul}${caseunit}" x2="100%" y2="${i * casemul}${caseunit}"/>`;

    }
    // vertical

    for (let i = 0; i < window.innerWidth / casemul; i += 3) {
        innerhtml += `<line x1="${i * casemul}${caseunit}" y1="0" x2="${i * casemul}${caseunit}" y2="100%"/>`;
    }
    quadr.innerHTML = innerhtml;
}

function draw_main_curve() {
    let d = "";
    for (let x = -decalage - marge; x < decalage + marge; x++) {
        let y = -getImage(x, main_eq) + window.innerHeight / 2;
        if (y < window.innerHeight + marge && y > -marge) {
        d += (x + decalage) + ',' + y + ' ';}
    }

    let curve = document.getElementById('maincurve')
    curve.setAttribute('d', 'M' + d);
    let ln =  curve.getTotalLength();
    curve.style.strokeDasharray = ln;
    curve.style.strokeDashoffset = ln;
    curve.style.setProperty("--entrdashoffset", `-${ln}`);

}

function draw_tangente(point, withpoint = false) {
    let d = "";
    for (let x of [-decalage, decalage]) {
        let y = -gettangente(point, x, main_eq) + window.innerHeight / 2;
        d += (x + decalage) + ',' + y + ' ';
    }



        document.getElementById('tangente').setAttribute('d', 'M' + d);
    if (withpoint) {
        document.getElementById('pointtang').setAttribute('cx', point + decalage);
        document.getElementById('pointtang').setAttribute('cy', -getImage(point, main_eq) + window.innerHeight / 2);

    }

}

function findxbordtop() {
    let x = -decalage
    while (getImage(x, main_eq) > window.innerHeight / 2) {
        x++
    }
    return x
}

function findxbordbottom() {
    let x = decalage

    while (getImage(x, main_eq) < -(window.innerHeight / 2)) {
        x -= 1
    }
    return x
}


let actual_tangente = findxbordtop()
let min_tan = findxbordtop()
let max_tan = findxbordbottom()
let vitesse = 1

function update_tangente() {
    draw_tangente(actual_tangente, withpoint = true)

    actual_tangente += vitesse
    if (actual_tangente > max_tan || actual_tangente < min_tan) {
        vitesse *= -1
    }

}
let tangInter = null;
function startTangmove() {
    document.getElementById('tangente').style.opacity = "1"
 tangInter = setInterval(update_tangente, 1)
    document.getElementById('pointtang').style.opacity = "1";
    }

function nextPage1() {
    document.getElementById("maincurve").style.strokeDashoffset = "0%"
    document.getElementById("maincurve").style.animation = "sortie 1s linear forwards"
    document.getElementById("tangente").style.strokeDashoffset = "0%"
    document.getElementById("tangente").style.animation = "sortie 1s linear forwards"
    document.getElementById("tangente").style.opacity = "0"
    document.getElementById("pointtang").style.opacity = "0"
    setTimeout(() => {
        clearInterval(tangInter);
        window.scrollTo(0,  window.innerHeight)
    }, 1000)


}