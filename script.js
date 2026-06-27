const symptomData = {
    skin: {
        title: "Skin symptoms",
        copy: "Skin symptoms can be the first clue: hives, flushing, swelling, or intense itching. Watch for symptoms in another body system too."
    },
    mouth: {
        title: "Mouth and throat symptoms",
        copy: "Tingling, itching, throat tightness, or swelling of the lips, tongue, or throat can be allergy warning signs."
    },
    breathing: {
        title: "Breathing symptoms",
        copy: "Wheezing, shortness of breath, repetitive coughing, or trouble speaking can mean the reaction is becoming serious."
    },
    stomach: {
        title: "Stomach symptoms",
        copy: "Food allergy reactions can include nausea, stomach cramps, vomiting, or diarrhea, especially when they appear with other symptoms."
    },
    danger: {
        title: "Danger signs",
        copy: "Severe dizziness, fainting, severe trouble breathing, or swelling that affects breathing should be treated as an emergency. Call 911."
    }
};

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.matches("a")) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

const symptomTiles = document.querySelectorAll(".symptom-tile");
const symptomTitle = document.querySelector("#symptom-title");
const symptomCopy = document.querySelector("#symptom-copy");

symptomTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        const panel = tile.dataset.panel;
        const next = symptomData[panel];

        if (!next || !symptomTitle || !symptomCopy) {
            return;
        }

        symptomTiles.forEach((item) => item.classList.remove("active"));
        tile.classList.add("active");
        symptomTitle.textContent = next.title;
        symptomCopy.textContent = next.copy;
    });
});

const checklistInputs = document.querySelectorAll(".checklist input");
const scanResult = document.querySelector(".scan-result");

function updateScanResult() {
    if (!scanResult) {
        return;
    }

    const checkedCount = Array.from(checklistInputs).filter((input) => input.checked).length;
    scanResult.classList.toggle("warning", checkedCount > 0);
    scanResult.textContent = checkedCount > 0
        ? `${checkedCount} risk ${checkedCount === 1 ? "flag" : "flags"} found. Do not serve it to David unless a trusted adult or clinician-approved plan clears it.`
        : "Check any risk you find.";
}

checklistInputs.forEach((input) => {
    input.addEventListener("change", updateScanResult);
});

const ingredientButtons = document.querySelectorAll(".ingredient-cloud button");
const ingredientTip = document.querySelector("#ingredient-tip");

ingredientButtons.forEach((button) => {
    button.addEventListener("click", () => {
        ingredientButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        if (ingredientTip) {
            ingredientTip.textContent = button.dataset.tip || "Ask about ingredients and shared equipment before eating.";
        }
    });
});

document.querySelectorAll(".myth-card").forEach((card) => {
    const original = card.innerHTML;
    const answer = card.dataset.answer;

    card.addEventListener("click", () => {
        const isRevealed = card.classList.toggle("revealed");
        card.innerHTML = isRevealed
            ? `<span>Reality</span><strong>${answer}</strong>`
            : original;
    });
});

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        navAnchors.forEach((anchor) => {
            anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));
