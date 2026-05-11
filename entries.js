const entriesList = document.getElementById("entriesList");
const backButton = document.getElementById("backButton");



// Bereits gespeicherte Einträge laden
let entries = JSON.parse(localStorage.getItem("entries")) || [];

// Bereits vorhandene Einträge direkt anzeigen 
function renderEntries(filteredEntries = entries) {

    entriesList.innerHTML = "";

    filteredEntries.slice().reverse().forEach(function(entry, index) {

        const entryDiv = document.createElement("div");

        entryDiv.innerHTML = `
             <div class="entry-card">
                 <p class="entry-date">
                     ${entry.date}
                 </p>
            
                 <p class="entry-info">
                    <span>Kategorien:</span>
                    ${entry.tags.join(", ") || "Keine Kategorie"}
                 </p>

                 <p class="entry-info">
                    <span>Notiz:</span>
                     ${entry.note || "Keine Notiz"}
                 </p>

                 <button onclick="deleteEntry(${entries.indexOf(entry)})" class="delete-button">
                    Löschen
                </button>
             </div>
        `;

        entriesList.appendChild(entryDiv);
    });
}

// Filterfunktion 
function filterEntries(tag, clickedButton) {

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    clickedButton.classList.add("active");

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


// direkt beim Laden alle Einträge anzeigen
renderEntries();
