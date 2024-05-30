

function getImage(x, fonction) {
    return eval(fonction);
}
function getDerivee(fonction) {

    // let re = math.derivative(fonction, 'x').toString();
    // console.log(re);
    let re = "((((2 * x - 180) * (-x - 605) + (x - 130) * (50 - x)) * (-x - 250) + (x - 130) * (50 - x) * (-x - 605)) * (500 - x) + (x - 130) * (50 - x) * (-x - 605) * (-x - 250)) / 3.84e+10";
    return re;

}

function gettangente(point, x, fonction) {
    let der = eval(getDerivee(fonction).replaceAll("x", "point"));

    return der * (x - point) + getImage(point, fonction);
}