let deriveesStorage = new Map([
    ["((464 - x) * (112 - x) * (-255 - x) * (-446 - x) * (-21 - x) * (168 - x) * (-373 - x) * (-115 - x) * (427 - x) * (293 - x)) / 10000000000000000000000", "(((((((((2 * x - 576) * (-x - 255) + (x - 464) * (112 - x)) * (-x - 446) + (x - 464) * (112 - x) * (-x - 255)) * (-x - 21) + (x - 464) * (112 - x) * (-x - 255) * (-x - 446)) * (168 - x) + (x - 464) * (112 - x) * (-x - 255) * (-x - 446) * (-x - 21)) * (-x - 373) + (x - 464) * (112 - x) * (-x - 255) * (-x - 446) * (-x - 21) * (168 - x)) * (-x - 115) + (x - 464) * (112 - x) * (-x - 255) * (-x - 446) * (-x - 21) * (168 - x) * (-x - 373)) * (427 - x) + (x - 464) * (112 - x) * (-x - 255) * (-x - 446) * (-x - 21) * (168 - x) * (-x - 373) * (-x - 115)) * (293 - x) + (x - 464) * (112 - x) * (-x - 255) * (-x - 446) * (-x - 21) * (168 - x) * (-x - 373) * (-x - 115) * (427 - x)) / 1e+22"]
]);

function getDerivee(fonction) {
    // let re = math.derivative(fonction, 'x').toString();
    // console.log(re);

    if (!deriveesStorage.has(fonction)) {
        updateDerivee(fonction);
    }
        return deriveesStorage.get(fonction);

}

function updateDerivee(fonction) {
    deriveesStorage.set(fonction, math.derivative(fonction, 'x').toString());
}

function getImage(x, fonction) {
    return eval(fonction);
}

function getTangImage(point, x, fonction, derivee = null) {
    let deri;
    if (derivee == null) {
        deri = eval(getDerivee(fonction).replaceAll("x", "point"));
    } else {
        deri = eval(derivee.replaceAll("x", "point"));
    }
    return deri * (x - point) + getImage(point, fonction);
}

// function to generate the hash of the actual timestamp
function getTimestamp( withrandom = false) {
    let date = new Date();
    if (withrandom) {
        return date.getTime().toString() + Math.random().toString();
    } else {
        return date.getTime().toString();

    }
}
function equationDroite(x1, y1, x2, y2) {
    let a = (y1 - y2) / (x1 - x2);
    let b = y1 - a * x1;
    return `${a}*x + ${b}`;
}