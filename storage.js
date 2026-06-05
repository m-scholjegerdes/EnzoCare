// Zentrale Speicherung der EnzoCare-Einträge.
//
// Aktuell verwendet EnzoCare weiterhin localStorage.
// Später können wir die Funktionen in dieser Datei
// schrittweise durch Supabase-Abfragen ersetzen.

const EnzoCareStorage = (function () {
    const STORAGE_KEY = "entries";

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

            return parsedEntries;
        } catch (error) {
            console.error(
                "Die Einträge konnten nicht geladen werden:",
                error
            );

            return [];
        }
    }

    return {
        getEntries
    };
})();