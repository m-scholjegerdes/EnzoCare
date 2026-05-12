// DOM Elemente

const form = document.getElementById("entryForm");
const errorMessage = document.getElementById("errorMessage");
const showEntriesButton = document.getElementById("showEntriesButton");

// Gespeicherte Einträge aus WebStorage laden oder leere Liste erstellen

let entries =
    JSON.parse(localStorage.getItem("entries")) || [];

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

// Speichern im Browser

function saveEntries() {

    localStorage.setItem(
        "entries",
        JSON.stringify(entries)
    );
}

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

    const entry = {

        date: new Date().toLocaleString("de-DE", {
            
            dateStyle: "short",
            timeStyle: "short"
        }),

        tags,
        note
    };

    entries.push(entry);

    saveEntries();

    form.reset();
});