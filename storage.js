// Zentrale Speicherung der EnzoCare-Einträge.
//
// Aktuell verwendet EnzoCare weiterhin localStorage.
// Später können wir die Funktionen in dieser Datei
// schrittweise durch Supabase-Abfragen ersetzen.

const EnzoCareStorage = (function () {
    const STORAGE_KEY = "entries";

    function createId() {
        if (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
        ) {
            return window.crypto.randomUUID();
        }

        return (
            "entry-" +
            Date.now() +
            "-" +
            Math.random().toString(16).slice(2)
        );
    }

    function getEntries() {
        try {
            const storedEntries =
                localStorage.getItem(STORAGE_KEY);

            if (!storedEntries) {
                return [];
            }

            const parsedEntries =
                JSON.parse(storedEntries);

            if (!Array.isArray(parsedEntries)) {
                console.warn(
                    "Die gespeicherten Einträge haben ein ungültiges Format."
                );

                return [];
            }

            let entriesWereUpdated = false;

            const entries = parsedEntries.map(function (entry) {
                if (entry.id) {
                    return entry;
                }

                entriesWereUpdated = true;

                return {
                    ...entry,
                    id: createId()
                };
            });

            if (entriesWereUpdated) {
                saveEntries(entries);
            }

            return entries;
                    } catch (error) {
                        console.error(
                            "Die Einträge konnten nicht geladen werden:",
                            error
                        );

                        return [];
                    }
                }

    function saveEntries(entries) {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(entries)
            );

            return true;
        } catch (error) {
            console.error(
                "Die Einträge konnten nicht gespeichert werden:",
                error
            );

            return false;
        }
    }

    function createEntry(entryData) {
        const entries = getEntries();

        const entry = {
            id: createId(),
            ...entryData
        };

        entries.push(entry);

        const wasSaved = saveEntries(entries);

        if (!wasSaved) {
            return null;
        }

        return entry;
    }

    return {
        getEntries,
        createEntry
    };
})();