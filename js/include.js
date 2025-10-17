document.addEventListener("DOMContentLoaded", function() {

    /**
     * Funzione riutilizzabile per caricare un componente HTML in un placeholder.
     * Questa versione è in grado di eseguire i tag <script> presenti nel file caricato.
     * @param {string} componentPath - Il percorso del file HTML (es. 'components/navbar.html').
     * @param {string} placeholderId - L'ID dell'elemento dove inserire il componente (es. 'navbar-placeholder').
     */
    const loadComponent = (componentPath, placeholderId) => {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.warn(`Attenzione: Placeholder con ID "${placeholderId}" non trovato.`);
            return;
        }

        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Stato: ${response.status} - Impossibile trovare ${componentPath}`);
                }
                return response.text();
            })
            .then(data => {
                // --- MODIFICA CHIAVE: Usiamo un metodo che esegue gli script ---
                // Sostituiamo il semplice 'placeholder.innerHTML = data;'

                // 1. Svuotiamo il placeholder precedente, se necessario
                placeholder.innerHTML = '';

                // 2. Creiamo un "frammento" di documento dal testo HTML ricevuto
                const range = document.createRange();
                const fragment = range.createContextualFragment(data);
                
                // 3. Aggiungiamo il frammento al placeholder. Questo processo
                //    attiverà l'esecuzione degli script contenuti nel frammento.
                placeholder.appendChild(fragment);
            })
            .catch(error => {
                console.error(`Errore nel caricamento del componente "${componentPath}":`, error);
                placeholder.innerHTML = `<p style="color:red; text-align:center;">Errore caricamento componente.</p>`;
            });
    };

    // --- CARICA TUTTI I COMPONENTI ---
    loadComponent('components/navbar.html', 'navbar-placeholder');
    loadComponent('components/cursor.html', 'cursor-placeholder'); // Assumendo che il cursore sia ancora separato in HTML
    loadComponent('components/footer.html', 'footer-placeholder');

});