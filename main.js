import "./style.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

function app() {
    let lenis;
    let Sections = gsap.utils.toArray("section"),
        getTotalWidth = () => {
            let width = 0;
            Sections.forEach((el) => (width += el.offsetWidth));
            return width;
        },
        snap;

    lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.to(Sections, {
        x: () => -getTotalWidth() + window.innerWidth,
        ease: "none",
        scrollTrigger: {
            trigger: "#HorizontalWrapper",
            pin: true,
            start: 0,
            end: () =>
                "+=" +
                (document.querySelector("#HorizontalWrapper").scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
            onRefresh() {
                let totalWidth = getTotalWidth(),
                    accumulatedWidth = 0,
                    progressArray = Sections.map((el) => {
                        accumulatedWidth += el.offsetWidth;
                        return accumulatedWidth / totalWidth;
                    });
                progressArray.unshift(0);
                snap = gsap.utils.snap(progressArray);
            },
            scrub: true,
            markers: "true",
        },
    });

    gsap.to("progress", {
        value: 100,
        ease: "none",
        scrollTrigger: { scrub: 0.3 },
    });
}
window.onload = () => {
    app();
};
function getTailleTotalePage() {
    // Sélectionnez le corps de la page
    var body = document.body;

    // Sélectionnez tous les éléments enfants du corps
    var elements = body.getElementsByTagName("*");

    // Initialisez la taille totale à 0
    var tailleTotale = 0;

    // Parcourez tous les éléments et ajoutez leur hauteur à la taille totale
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var elementStyle = window.getComputedStyle(element);

        // Ajoutez la hauteur et la marge supérieure et inférieure de chaque élément
        tailleTotale +=
            element.offsetHeight +
            parseInt(elementStyle.marginTop) +
            parseInt(elementStyle.marginBottom);
    }

    // Retournez la taille totale
    return tailleTotale;
}

let totalSize = getTailleTotalePage();
