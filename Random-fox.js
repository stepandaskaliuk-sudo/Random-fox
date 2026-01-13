const foxImage = document.getElementById('foxImage');
const foxIdCell = document.getElementById('foxId');
const loadBtn = document.getElementById('loadBtn');
const statusBadge = document.getElementById('status-badge');

/**
 * Funcție asincronă pentru a face fetch la API-ul Random Fox
 */
async function fetchRandomFox() {
    // Vizual feedback în timpul încărcării
    loadBtn.innerText = "Se încarcă...";
    loadBtn.disabled = true;

    try {
        const response = await fetch('https://randomfox.ca/floof/');
        
        if (!response.ok) {
            throw new Error('Eroare la comunicarea cu serverul.');
        }

        const data = await response.json();

        // 1. Populăm imaginea
        foxImage.src = data.image;

        // 2. Extragem un ID din URL-ul imaginii (ex: "https://randomfox.ca/images/12.jpg" -> "12")
        const urlParts = data.image.split('/');
        const fileName = urlParts[urlParts.length - 1]; // "12.jpg"
        const id = fileName.split('.')[0]; // "12"

        // 3. Populăm elementele tabelare din DOM
        foxIdCell.innerText = id;
        statusBadge.style.background = "#10b981"; // Verde pentru succes
        statusBadge.innerText = "Activ";

    } catch (error) {
        console.error("Eroare:", error);
        statusBadge.innerText = "Eroare";
        statusBadge.style.background = "#ef4444"; // Roșu pentru eroare
        alert("Nu s-a putut încărca vulpea. Încearcă din nou!");
    } finally {
        loadBtn.innerText = "Afișează o vulpe nouă";
        loadBtn.disabled = false;
    }
}

// Eveniment pentru buton
loadBtn.addEventListener('click', fetchRandomFox);

// Încărcăm prima vulpe automat la deschiderea paginii
document.addEventListener('DOMContentLoaded', fetchRandomFox);