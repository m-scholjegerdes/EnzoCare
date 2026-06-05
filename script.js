// DOM Elemente

const form = document.getElementById("entryForm");
const errorMessage = document.getElementById("errorMessage");
const showEntriesButton = document.getElementById("showEntriesButton");

// Übersetzungstabelle 

const tagLabels = {

    spritze: "Spritze",

    medikamente: "Medikamente",

    arztbesuch: "Arztbesuch",

    zittern: "Zittern",

    stress: "Stress",

    blasenschwaeche: "Blasenschwäche",

    "verlaengertes-wasserlassen":
        "Verlängertes Wasserlassen",

    trinkverhalten: "Trinkverhalten"
};

// Navigation zur Einträge-Seite

showEntriesButton.addEventListener("click", function() {

    window.location.href = "entries.html";
});

// Neuen Eintrag speichern

form.addEventListener("submit", function(event) {
    
    event.preventDefault();

    const checkedBoxes = 
        document.querySelectorAll(
            'input[type="checkbox"]:checked'
        );

    let tags = [];

    checkedBoxes.forEach(function(box) {
        
        tags.push(box.value);
    });

    if (tags.length === 0) {

        errorMessage.textContent =
            "Bitte wähle mindestens eine Kategorie aus.";

        return;
    }

    errorMessage.textContent = "";

    const note = 
        document.getElementById("note").value;

   const currentDate = new Date();

const entry = EnzoCareStorage.createEntry({
    date: currentDate.toLocaleString("de-DE", {
        dateStyle: "short",
        timeStyle: "short"
    }),

    occurredAt: currentDate.toISOString(),

    tags,
    note
});

if (!entry) {
    errorMessage.textContent =
        "Der Eintrag konnte nicht gespeichert werden.";

    return;
}

form.reset();
});