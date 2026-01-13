// Selectăm elementele din DOM
const foxImage = document.getElementById('foxImage');
const foxSpecies = document.getElementById('foxSpecies');
const loadBtn = document.getElementById('loadBtn');

/**
 * Funcție asincronă pentru a prelua datele de la API
 */
async function fetchRandomFox() {
    // Schimbăm textul butonului și imaginea în timpul încărcării (opțional, pentru UX)
    loadBtn.innerText = "Se încarcă...";
    loadBtn.disabled = true;

    try {
        // Realizăm cererea către API
        const response = await fetch('https://randomfox.ca/floof/');

        // Verificăm dacă răspunsul este de succes (status 200-299)
        if (!response.ok) {
            throw new Error(`Eroare HTTP! Status: ${response.status}`);
        }

        // Parsăm datele JSON
        const data = await response.json();

        // Populăm elementele din pagină
        // API-ul returnează un obiect de forma: { image: "url", link: "url" }
        foxImage.src = data.image;

        /* Notă: Deoarece API-ul randomfox.ca returnează doar imaginea, 
           nu și specia exactă, vom păstra sau reseta câmpul speciei.
        */
        foxSpecies.innerText = "Vulpes vulpes (Vulpe roșie)";

    } catch (error) {
        // Afișăm eroarea în consolă și informăm utilizatorul
        console.error("A apărut o problemă la preluarea datelor:", error);
        alert("Nu am putut încărca imaginea. Verifică conexiunea la internet sau API-ul.");
        
        // În caz de eroare, putem pune o imagine de tip placeholder
        foxImage.alt = "Eroare la încărcare";
    } finally {
        // Resetăm butonul indiferent dacă cererea a reușit sau a eșuat
        loadBtn.innerText = "Afișează o vulpe nouă";
        loadBtn.disabled = false;
    }
}

// Adăugăm un Event Listener pe buton pentru a încărca o imagine nouă la click
loadBtn.addEventListener('click', fetchRandomFox);

// Apelăm funcția o dată la încărcarea paginii pentru a nu avea un container gol
window.addEventListener('DOMContentLoaded', fetchRandomFox);