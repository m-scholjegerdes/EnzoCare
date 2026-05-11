const form = document.getElementById("entryForm");
const entriesList = document.getElementById("entriesList");
const showEntriesBtn = document.getElementById("showEntriesBtn");
const entriesCategory = document.getElementById("entriesCategory");
const errorMessage = document.getElementById("errorMessage");

// Bereits gespeicherte Einträge laden
let entries = JSON.parse(localStorage.getItem("entries")) || [];

// Bereits vorhandene Einträge direkt anzeigen 
function renderEntries(filteredEntries = entries) {

    entriesList.innerHTML = "";

    filteredEntries.slice().reverse().forEach(function(entry, index) {

        const entryDiv = document.createElement("div");

        entryDiv.innerHTML = `
            <hr>
            <p><strong>Datum:</strong> ${entry.date}</p>
            <p><strong>Kategorien:</strong> ${entry.tags.join(", ")}</p>
            <p><strong>Notiz:</strong> ${entry.note}</p>
            <button onclick="deleteEntry(${entries.indexOf(entry)})">Löschen</button>
        `;

        entriesList.appendChild(entryDiv);
    });
}

// Filterfunktion 

function filterEntries(tag) {

    if (tag === "all") {
        renderEntries(entries);
        return;
    }

    const filtered = entries.filter(function(entry) {
        return entry.tags.includes(tag);
    });

    renderEntries(filtered);
}


function deleteEntry(index) {

    // Eintrag aus Array entfernen
    entries.splice(index, 1);

    // Local Storage aktualisieren
    localStorage.setItem("entries", JSON.stringify(entries));

    // Anzeige neu laden
    renderEntries();
}



form.addEventListener("submit", function(event) {
    event.preventDefault();

    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

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

    const note = document.getElementById("note").value;

    const entry = {
        date: new Date().toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short"
        }),
        tags: tags,
        note: note

    };

    // Eintrag hinzufügen
    entries.push(entry);

    // Speichern
    localStorage.setItem("entries", JSON.stringify(entries));

    // Neu anzeigen
    renderEntries();

    // Formular zurücksetzen
    form.reset();
});