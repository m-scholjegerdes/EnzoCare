// DOM Elemente

const entriesList = document.getElementById("entriesList");
const backButton = document.getElementById("backButton");
const filterButtons = document.querySelectorAll(".filter-btn");

// Bereits gespeicherte Einträge laden

let entries = JSON.parse(localStorage.getItem("entries")) || [];

// Übersetzungstabelle

const tagLabels = {
    spritze: "Spritze",
    medikamente: "Medikamente",
    arztbesuch: "Arztbesuch",
    zittern: "Zittern",
    stress: "Stress",
    blasenschwaeche: "Blasenschwäche",
    "verlaengertes-wasserlassen": "Verlängertes Wasserlassen",
    trinkverhalten: "Trinkverhalten"
};

// Einträge speichern

function saveEntries() {
    localStorage.setItem("entries", JSON.stringify(entries));
}

// Einträge rendern 

function renderEntries(filteredEntries = entries) {
    entriesList.innerHTML = "";

    if (filteredEntries.length === 0) {
        entriesList.innerHTML = `
            <p class="empty-message">
                Noch keine Einträge vorhanden.
            </p>
        `;

        return;
    }

    filteredEntries.slice().reverse().forEach(function(entry) {
        const readableTags = entry.tags
            .map(function(tag) {
                return tagLabels[tag] || tag;
            })
            .join(", ");

        const entryDiv = document.createElement("div");

        entryDiv.innerHTML = `
            <div class="entry-card">
                <p class="entry-date">
                    ${entry.date}
                </p>

                <p class="entry-info">
                    <span>Kategorien:</span>
                    ${readableTags}
                </p>

                <p class="entry-info">
                    <span>Notiz:</span>
                    ${entry.note || "Keine Notiz"}
                </p>

                <button
                    class="delete-button"
                    data-index="${entries.indexOf(entry)}"
                >
                    Löschen
                </button>
            </div>
        `;

        entriesList.appendChild(entryDiv);

        const deleteButton = entryDiv.querySelector(".delete-button");

        deleteButton.addEventListener("click", function() {
            const index = deleteButton.dataset.index;

            deleteEntry(index);
        });
    });
}

// Filterfunktion

function filterEntries(tag, clickedButton) {
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

// Eintrag löschen

function deleteEntry(index) {
    entries.splice(Number(index), 1);

    saveEntries();

    renderEntries();
}

// Klick-Events für alle Filterbuttons

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const tag = button.dataset.tag;

        filterEntries(tag, button);
    });
});

// Zurück-Button

backButton.addEventListener("click", function() {
    window.location.href = "index.html";
});

// Einträge zu Beginn rendern

renderEntries();