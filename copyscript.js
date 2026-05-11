const form = document.getElementById("entryForm");
const entriesList = document.getElementById("entriesList");
const showEntriesBtn = document.getElementById("showEntriesBtn");
const entriesCategory = document.getElementById("entriesCategory");


// Gespeicherte Einträge aus WebStorage laden oder leere Liste erstellen

let entries = JSON.parse(localStorage.getItem("entries")) || [];


// Leeren und Erstellen der Eintragsliste in umgekehrter Reihenfolge

function renderEntries(filteredEntries = entries) {

    entriesList.innerHTML = "";

    filteredEntries.slice().reverse().forEach(function(entry, index) {

        const entryDiv = document.createElement("div");

        entryDiv.innerHTML = `
            <hr>
            <p><strong>Datum:</strong> ${entry.date}</p>
            <p><strong>Kategorien:</strong> ${entry.tags.join(", ")}</p>
            <p><strong>Notiz:</strong> ${entry.note}</p>
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

