
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("reservationForm");
    const resMessage = document.getElementById("resMessage");
    const numeroWhatsApp = "221785413074";

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        // Récupérer les valeurs du formulaire
        const date = document.getElementById("resDate").value;
        const time = document.getElementById("resTime").value;
        const resNumbPersonne = document.getElementById("resNumbPersonne").value;
        const name = document.getElementById("resName").value;
        const email = document.getElementById("resEmail").value;

        // Message automatique envoyé vers mon WhatsApp
        const message = `Nouvelle Réservation
        👤 Nom : ${name}
        📧 Email : ${email}
        📅 Date : ${date}
        ⏰ Heure : ${time}
        👥 Nombre de personnes : ${resNumbPersonne} 
        Merci d'avoir choisi Le Grand Chef 🇸🇳`;

        // Convertir en URL WhatsApp
        const whatsappURL =` https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;

        // Ouvrir WhatsApp automatiquement
        window.open(whatsappURL, "_blank");

        // Confirmation visuelle
        resMessage.innerHTML = `<p class="text-success mt-3">🎉 Votre réservation a été envoyée sur WhatsApp !</p>`;

        form.reset();
        form.classList.remove("was-validated");
    });
});


