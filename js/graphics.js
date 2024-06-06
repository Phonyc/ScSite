function createQuadrillage() {
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

class Curve {
    constructor(svgSupportId, equationCurve, defaultTempsAnimation = "1s", withTangente = false, tangentePoint = undefined, tangenteVitesse = 1, style = "") {
        this.tangenteInterval = null;
        this.curveIsentree = false;
        this.withTangente = withTangente;
        this.svgSupport = document.getElementById(svgSupportId);
        this.equationCurve = equationCurve;
        this.defaultTempsAnimation = defaultTempsAnimation;
        this.idCurve = getTimestamp(true);
        this.idTangente = this.idCurve + "_tangente"
        // Initialiser la courbe

        this.dpoints = "";
        this.decalage = this.svgSupport.width.baseVal.value / 2;
        let hauteur = this.svgSupport.height.baseVal.value;
        this.mihauteur = hauteur / 2;

        for (let x = -this.decalage - margeForCurves; x < this.decalage + margeForCurves; x++) {
            let y = -getImage(x, this.equationCurve) + this.mihauteur; // - & + On met la courbe au milieu et dans le bon sens
            if (y < hauteur + margeForCurves && y > -margeForCurves) { // On dessine pas si la courbe est trop en dehors du cadre
                this.dpoints += (x + this.decalage) + ',' + y + ' ';
            }
        }
        // Ajouter les courbes
        this.svgSupport.innerHTML += `<path id="${this.idCurve}" fill="none" class="curve" style="${style}"/>`
        document.getElementById(this.idCurve).setAttribute("d", `M ${this.dpoints}`)
        if (withTangente) {
            this.svgSupport.innerHTML += `<path id="${this.idTangente}" fill="none" class="curve tangente"/>`
            this.svgSupport.innerHTML += `<circle id="${this.idTangente}_point" class="tangentePoint" r="5"></circle>`
        }

        if (withTangente) {
            if (tangentePoint !== undefined) {
                this.drawTangente(tangentePoint);
            } else {
                this.tangenteVitesse = tangenteVitesse;
                this.mintanX = this.findMinXTangente()
                this.maxtanX = this.findMaxTangente()
                this.tangentePosition = this.mintanX;
                this.animTangente();
            }
        }

        // Régler son pointillé pour qu'elle soit hors de l'écran
        this.curveLength = document.getElementById(this.idCurve).getTotalLength();
        document.getElementById(this.idCurve).style.strokeDasharray = this.curveLength;
        document.getElementById(this.idCurve).style.strokeDashoffset = this.curveLength;
        this.setTempsAnimation("0s");

    }

    drawTangente(point) {
        let dpointstan = ""
        for (let x of [-this.decalage - margeForCurves, this.decalage + margeForCurves]) {
            let y = -getTangImage(point, x, this.equationCurve) + this.mihauteur; // - & + On met la courbe au milieu et dans le bon sens
            dpointstan += (x + this.decalage) + ',' + y + ' ';
        }
        document.getElementById(this.idTangente).setAttribute("d", `M ${dpointstan}`)
        document.getElementById(`${this.idTangente}_point`).setAttribute('cx', point + this.decalage);
        document.getElementById(`${this.idTangente}_point`).setAttribute('cy', `${-getImage(point, this.equationCurve) + this.mihauteur}`);

    }

    entree(tempsAnimation = null) {
        if (!this.curveIsentree) {
            this.curveIsentree = true;
            setTimeout(() => {
                this.setTempsAnimation(tempsAnimation);
                document.getElementById(this.idCurve).style.strokeDashoffset = "0";
                if (this.withTangente) {

                document.getElementById(this.idTangente).style.opacity = "1";
                document.getElementById(`${this.idTangente}_point`).style.opacity = "1";
                }
            }, 1);
        }
    }

    sortie(tempsAnimation = null) {
        if (this.curveIsentree) {
            this.curveIsentree = false;
            setTimeout(() => {
                this.setTempsAnimation(tempsAnimation);
                document.getElementById(this.idCurve).style.strokeDashoffset = `-${this.curveLength}`;
                if (this.withTangente) {

                document.getElementById(this.idTangente).style.opacity = "0";
                document.getElementById(`${this.idTangente}_point`).style.opacity = "0";
                }

            }, 0);
            setTimeout(() => {
                clearInterval(this.tangenteInterval);
            }, 1000)
        }
    }

    setTempsAnimation(tempsAnimation = null) {
        if (tempsAnimation == null) {
            document.getElementById(this.idCurve).style.transition = `${this.defaultTempsAnimation} linear`;
        } else {
            document.getElementById(this.idCurve).style.transition = `${tempsAnimation} linear`;
        }
    }

    moveTangente() {
        this.drawTangente(this.tangentePosition);
        this.tangentePosition += this.tangenteVitesse;
        if (this.tangentePosition > this.maxtanX || this.tangentePosition < this.mintanX) {
            this.tangenteVitesse *= -1
        }
    }

    animTangente() {
        this.tangenteInterval = setInterval(this.moveTangente.bind(this), 1)
    }

    findMinXTangente() {
        let x = -this.decalage
        while (getImage(x, this.equationCurve) > this.mihauteur) {
            x++
        }
        return x
    }

    findMaxTangente() {
        let x = this.decalage
        while (getImage(x, this.equationCurve) < -this.mihauteur) {
            x -= 1
        }
        return x
    }

}

class Droite {
    constructor(svgSupportId, supportEquation, x1, x2, defaultTempsAnimation = "1s", style = "", customPointClass = "") {
        this.customPointClass = customPointClass;
        this.supportEquation = supportEquation;
        this.deriveeEquation = getDerivee(this.supportEquation);
        this.curveIsentree = false;
        this.svgSupport = document.getElementById(svgSupportId);
        this.defaultTempsAnimation = defaultTempsAnimation;
        this.idDroite = getTimestamp(true);

        // Initialiser la courbe
        this.decalage = this.svgSupport.width.baseVal.value / 2;
        let hauteur = this.svgSupport.height.baseVal.value;
        this.mihauteur = hauteur / 2;

        // Ajouter les droites
        this.svgSupport.innerHTML += `<path id="${this.idDroite}" fill="none" class="droite" style="${style}"/>`
        this.svgSupport.innerHTML += `<circle id="${this.idDroite}_P1" class="tangentePoint ${this.customPointClass}" r="5"></circle>`
        this.svgSupport.innerHTML += `<circle id="${this.idDroite}_P2" class="tangentePoint ${this.customPointClass}" r="5"></circle>`


        this.drawDroite(x1, x2);

        // Régler son pointillé pour qu'elle soit hors de l'écran
        this.droiteLength = document.getElementById(this.idDroite).getTotalLength();
        document.getElementById(this.idDroite).style.strokeDasharray = this.droiteLength;
        document.getElementById(this.idDroite).style.strokeDashoffset = this.droiteLength;
        this.setTempsAnimation("0s");

    }

    drawDroite(x1, x2) {
        let dpoints = "";
        let y1 = -getImage(x1, this.supportEquation)
        let y2 = -getImage(x2, this.supportEquation)

        let temp_eq = equationDroite(x1, -y1, x2, -y2)
        for (let x of [-this.decalage - margeForCurves, x1, x2, this.decalage + margeForCurves]) {
            let y;
            if (x1 === x2) {
                y = -getTangImage(x1, x, this.supportEquation, this.deriveeEquation) + this.mihauteur
            } else {
                y = -getImage(x, temp_eq) + this.mihauteur;
            }
            dpoints += (x + this.decalage) + ',' + y + ' ';
        }

        document.getElementById(this.idDroite).setAttribute("d", `M ${dpoints}`)

        document.getElementById(`${this.idDroite}_P1`).setAttribute('cx', x1 + this.decalage);
        document.getElementById(`${this.idDroite}_P1`).setAttribute('cy', `${-getImage(x1, this.supportEquation) + this.mihauteur}`);
        document.getElementById(`${this.idDroite}_P2`).setAttribute('cx', x2 + this.decalage);
        document.getElementById(`${this.idDroite}_P2`).setAttribute('cy', `${-getImage(x2, this.supportEquation) + this.mihauteur}`);

    }


    entree(tempsAnimation = null, droite = true, points = true) {
        // if (!this.curveIsentree) {
        //     this.curveIsentree = true;
            setTimeout(() => {
                this.setTempsAnimation(tempsAnimation);
                if (droite) {
                    document.getElementById(this.idDroite).style.strokeDashoffset = "0";
                }
                if (points) {
                    document.getElementById(`${this.idDroite}_P1`).style.opacity = "1";
                    document.getElementById(`${this.idDroite}_P2`).style.opacity = "1";
                }
            }, 1);
        // }
    }

    sortie(tempsAnimation = null, droite = true, points = true) {
        // if (this.curveIsentree) {
        //     this.curveIsentree = false;
            setTimeout(() => {
                this.setTempsAnimation(tempsAnimation);
                if (droite) {
                    document.getElementById(this.idDroite).style.strokeDashoffset = `-${this.droiteLength}`;
                }
                if (points) {
                    document.getElementById(`${this.idDroite}_P1`).style.opacity = "0";
                    document.getElementById(`${this.idDroite}_P2`).style.opacity = "0";
                }
            }, 0);
        // }
    }

    setTempsAnimation(tempsAnimation = null) {
        if (tempsAnimation == null) {
            document.getElementById(this.idDroite).style.transition = `stroke-dashoffset ${this.defaultTempsAnimation} linear`;
            document.getElementById(`${this.idDroite}_P1`).style.transition = `opacity ${this.defaultTempsAnimation} linear`;
            document.getElementById(`${this.idDroite}_P2`).style.transition = `opacity ${this.defaultTempsAnimation} linear`;
        } else {
            document.getElementById(this.idDroite).style.transition = `stroke-dashoffset ${tempsAnimation} linear`;
            document.getElementById(`${this.idDroite}_P1`).style.transition = `opacity ${tempsAnimation} linear`;
            document.getElementById(`${this.idDroite}_P2`).style.transition = `opacity ${tempsAnimation} linear`;
        }
    }

}