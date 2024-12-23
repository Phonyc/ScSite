class PageScroller {
    constructor(pageContainerId, indicatorId, actions, backgroundGest) {
        this.canPassToNext = true;
        this.actions = actions;
        this.backgroundGest = backgroundGest;
        this.indicatorId = indicatorId;
        this.timerReset = null; // Timer pour reset la scrollValue
        this.scrollBeforePass = 300; // combien scroller avant de considérer qu'il faut passer à la suite
        this.pageContainerId = pageContainerId;
        this.elements = Array.from(document.getElementById(this.pageContainerId).querySelectorAll(".btOkEtape"));
        this.actualElement = 0;
        this.scrollValue = 0; // Valeur du scroll (en dessous scrollBeforePass, au dessus -> passToNext)
        this.scrollSens = 1; // Sens du scroll (1 = descendre, -1 = monter)
        this.updateSlideIndicator(0);
        this.indexLastDiscovered = 0;

        document.getElementById(this.pageContainerId).scrollTo(0, 0)
        // document.getElementById(this.pageContainerId).scrollTo(0, window.innerHeight * 4)
        this.backgroundGest.drawCurves(0);
    }

    passToNext() {
        this.validatePoint(this.elements[this.actualElement], this.scrollSens === -1, true);
    }

    setActualElement(value) {
        this.actualElement = value;
        this.updateSlideIndicator();
    }

    setScrollPass(value) {
        this.scrollValue = value;
        let indicator = document.getElementById(this.indicatorId).querySelector(".passIndicator");
        indicator.style.setProperty("--avancee-pass", `${this.scrollValue / this.scrollBeforePass}`);
    }

    updateSlideIndicator() {
        let indicator = document.getElementById(this.indicatorId).querySelector(".slideIndicator");
        indicator.style.setProperty("--avancee-slide", `${(this.actualElement + 1) / (this.elements.length)}`);
    }

    onScroll(event) {
        let prevSens = this.scrollSens;
        this.scrollSens = event.deltaY >= 0 ? 1 : -1;
        if (prevSens !== this.scrollSens) {
            // On reset la scrollValue si elle était pas dans le même sens
            this.setScrollPass(0);
        } else {
            clearTimeout(this.timerReset);
        }

        this.setScrollPass(Math.min(this.scrollValue + Math.abs(event.deltaY), this.scrollBeforePass));
        this.timerReset = setTimeout(() => {
            this.setScrollPass(0);
        }, 200);
        if (this.scrollValue >= this.scrollBeforePass && this.canPassToNext) {
            this.passToNext();

            // pour pas pouvoir passer plusieurs à la fois
            this.canPassToNext = false;
            setTimeout(() => {
                this.canPassToNext = true;
            }, 500);
        }
    }

    validatePoint(button, scrollup, byScroll = false) {
        let valider = !(button.dataset["novalidate"] === "true")
        let pageTourne = button.dataset["pagetourne"] === "true"
        let goTop = button.dataset["gotop"] === "true"
        let goTopbyScroll = button.dataset["gotopbyscroll"] === "true"
        let aValider = !button.classList.contains("btOkEtapeValide") && valider;
        let btIndex = this.elements.indexOf(button)

        let nextIndex;
        if (aValider || !scrollup) {

            nextIndex = Math.min(btIndex + 1, this.elements.length - 1);
            if ((goTop && !byScroll) || (goTopbyScroll)) {
                nextIndex = 0;
            }
        } else {
            nextIndex = Math.max(btIndex - 1, 0);
        }
        let allerSimple = button.dataset["allersimple"] === "true"
        if (scrollup && allerSimple) {
            for (let i = btIndex; i >= 0; i -= 1) {
                if (this.elements[i].dataset["allersimple"] !== "true") {
                    nextIndex = i;
                    break;
                }
            }

        }

        if (!scrollup && !valider && !goTop) {
            let maxIndexInNextPage = this.elements.findLastIndex(e => Math.floor(e.getBoundingClientRect().top / window.innerHeight) === 1);
            nextIndex = Math.min(Math.max(this.indexLastDiscovered, nextIndex), maxIndexInNextPage);
        }

        let nextElement = this.elements[nextIndex];
        this.indexLastDiscovered = Math.max(nextIndex, this.indexLastDiscovered);
        let expliId = button.parentNode.id;
        if (!(allerSimple && nextIndex < btIndex) || !allerSimple || (scrollup && nextIndex < btIndex)) {

            let pageToScroll = Math.floor(nextElement.getBoundingClientRect().top / window.innerHeight);
            let actualTop = Math.round(document.getElementById(this.pageContainerId).scrollTop / window.innerHeight) * window.innerHeight
            let endroit_to_Scroll = actualTop + pageToScroll * window.innerHeight;
            let numPageReel = Math.floor(endroit_to_Scroll / window.innerHeight);
            let numPageReelOld = Math.floor(actualTop / window.innerHeight);
            if (pageToScroll !== 0) {
                this.backgroundGest.drawCurves(numPageReel);
                this.backgroundGest.removeCurves(numPageReelOld);
            }
            document.getElementById(this.pageContainerId).scrollTo(0, endroit_to_Scroll)

        }
        if (!(allerSimple && nextIndex < this.indexLastDiscovered) || !allerSimple || (scrollup && nextIndex < this.indexLastDiscovered || pageTourne)) {
            this.setActualElement(nextIndex);
        }
        nextElement.parentElement.classList.remove("EtapeExpliHidden");


        if (aValider && !scrollup) {
            button.classList.add("btOkEtapeValide");
            if (this.actions.has(expliId)) {
                eval(this.actions.get(expliId)[0])
            }
        } else {
            button.classList.remove("btOkEtapeValide");

            if (this.actions.has(expliId)) {
                eval(this.actions.get(expliId)[1])
            }
        }
    }
}