const foxImage = document.getElementById('foxImage');
const foxIdCell = document.getElementById('foxId');
const foxSpeciesCell = document.getElementById('foxSpecies');
const loadBtn = document.getElementById('loadBtn');
const statusBadge = document.getElementById('status-badge');

/**
 * SIMULARE!(e foarte greu ca apelul sa fie real: Multa jucarie): Funcție care imită un proces de analiză a imaginii
 * Nu face apeluri externe, doar simulează o întârziere și un diagnostic.
 */
async function simulateSpeciesAnalysis() {
    // Simulăm timpul de procesare (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Logica de simulare a rezultatelor
    const results = [
        "Vulpes vulpes (Vulpe roșie)",
        "Alopex lagopus (Vulpe polară)",
        "Vulpes zerda (Fenec)",
        "Urocyon cinereoargenteus (Vulpe cenușie)"
    ];

    // Simulare eroare (15% șanse) pentru a testa scenariul "Specie nedeterminată"
    const shouldFail = Math.random() < 0.15;

    if (shouldFail) {
        throw new Error("Analysis failed");
    }

    // Returnăm un rezultat aleatoriu din listă
    return results[Math.floor(Math.random() * results.length)];
}

async function fetchRandomFox() {
    // Pregătire UI pentru încărcare
    loadBtn.innerText = "Se analizează...";
    loadBtn.disabled = true;
    foxSpeciesCell.innerText = "Analiză în curs...";
    foxSpeciesCell.style.color = "#94a3b8";

    try {
        // 1. Cererea către API-ul de imagini (singurul apel extern real)
        const response = await fetch('https://randomfox.ca/floof/');
        if (!response.ok) throw new Error('Network Error');
        const data = await response.json();

        // Afișăm imaginea și extragem ID-ul din URL
        foxImage.src = data.image;
        const fileName = data.image.split('/').pop();
        foxIdCell.innerText = fileName.split('.')[0];

        // 2. Declanșăm SIMULAREA analizei speciei
        try {
            const species = await simulateSpeciesAnalysis();
            foxSpeciesCell.innerText = species;
            foxSpeciesCell.style.color = "#38bdf8"; // Albastru deschis pentru succes
        } catch (simError) {
            // Mesajul solicitat în caz de "eroare" a simulării
            foxSpeciesCell.innerText = "Specie nedeterminată";
            foxSpeciesCell.style.color = "#ef4444"; // Roșu discret
        }

        // Status general activ
        statusBadge.innerText = "Activ";
        statusBadge.style.background = "#10b981";

    } catch (error) {
        console.error("Eroare aplicație:", error);
        statusBadge.innerText = "Eroare";
        statusBadge.style.background = "#ef4444";
        foxSpeciesCell.innerText = "Informație indisponibilă";
        alert("Eroare la preluarea datelor de la server.");
    } finally {
        loadBtn.innerText = "Afișează o vulpe nouă";
        loadBtn.disabled = false;
    }
}

// Event Listeners
loadBtn.addEventListener('click', fetchRandomFox);
document.addEventListener('DOMContentLoaded', fetchRandomFox);