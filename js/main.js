
// TODO Utiliser des classes
function getImage(x, fonction) {
    return eval(fonction);
}
let ders = Array();

function getDerivee(fonction) {
    // let re = math.derivative(fonction, 'x').toString();
    // console.log(re);

    if (ders[fonction] !== undefined) {

        return ders[fonction];
    } else {
        updateDerivee(fonction);
        return ders[fonction];
    }

}

function updateDerivee(fonction) {
    ders[fonction] = math.derivative(fonction, 'x').toString();
}

function gettangente(point, x, fonction, eq = null) {
    let deri = ""
    if (eq == null) {
        deri = eval(getDerivee(fonction).replaceAll("x", "point"));
    } else {
        deri = eval(eq.replaceAll("x", "point"));
    }

    return deri * (x - point) + getImage(point, fonction);
}