let decalage = window.innerWidth / 2;

let main_eq = `((130-x)*(50-x)*(-605-x)*(-250-x)*(500-x))/(20000000*${window.innerWidth})`;

// let main_eq = "(x/50+8)*(x/50-5)*(x/50-10) + 100";
function crea_quadr() {
    let quadr = document.getElementById("quadrillage");
    let innerhtml = ""
    let casemul = 10
    let caseunit = "px"

    // horizontal
    for (let i = 0; i < window.innerHeight / casemul; i+=3) {
        innerhtml += `<line x1="0" y1="${i * casemul}${caseunit}" x2="100%" y2="${i * casemul}${caseunit}"/>`;

    }
    // vertical
    
    for (let i = 0; i < window.innerWidth / casemul; i+=3) {
        innerhtml += `<line x1="${i * casemul}${caseunit}" y1="0" x2="${i * casemul}${caseunit}" y2="100%"/>`;
    }
    quadr.innerHTML = innerhtml;
}

function draw_main_curve() {
    let d = "";
    for (let x = -decalage - 5; x < decalage + 5; x++) {
        let y = -getImage(x, main_eq) + window.innerHeight / 2;
        d += (x + decalage) + ',' + y + ' ';
    }
    document.getElementById('maincurve').setAttribute('d', 'M' + d);
}
function draw_tangente(point, withpoint= false) {
    let d = "";
    for (let x = -decalage - 5; x < decalage + 5; x++) {
        let y = -gettangente(point, x, main_eq) + window.innerHeight / 2;
        d += (x + decalage) + ',' + y + ' ';
    }
    document.getElementById('tangente').setAttribute('d', 'M' + d);
    if (withpoint) {
        document.getElementById('pointtang').setAttribute('cx', point + decalage);
        document.getElementById('pointtang').setAttribute('cy', -getImage(point, main_eq) + window.innerHeight / 2);
    } else {
        document.getElementById('pointtang').setAttribute('cx', -10);
        document.getElementById('pointtang').setAttribute('cy', -10);
    }
}
let actual_tangente = -decalage
function update_tangente() {
    draw_tangente(actual_tangente, withpoint = true)
    if (actual_tangente !== 200) {

    actual_tangente += 1

    }

}
setInterval(update_tangente, 0.1)