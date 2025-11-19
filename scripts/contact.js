document.addEventListener('DOMContentLoaded', () => {

    // Script pour le formulaire de contact
    const contactForm = document.getElementById('contactForm'); //on recupère l'id de l'élément form
    const contactMessageAlert = document.getElementById('contactMessageAlert'); //on recupère l'id de l'élément div pour le message d'alert

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
            return;
        }

        // l'envoi du message sur whatsapp
        const name = document.getElementById('contactName').value; //on recupère la valeur saisie dans l' input qui à l'id contactName(votre nom)
        const email = document.getElementById('contactEmail').value; //on recupère la valeur saisie dans l' input qui à l'id contactEmail(votre email)
        const message = document.getElementById("contactMessage").value;

        // Message automatique envoyé vers mon WhatsApp
        const text = "Nom: "+name+"email: "+email+"message: "+message;
        const lien = "https://wa.me/221785413074?text="+encodeURIComponent(text);
        window.open(lien, "_blank");

        // Stocker temporairement les données 
        localStorage.setItem('lastContactName', name);

        // Afficher le message de succès
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        contactMessageAlert.innerHTML = ` 
       <div class="alert alert-success" role="alert">
            Merci, **${name}** ! Votre message a bien été envoyé. Nous vous répondrons sous peu.
        </div> `;

         // Réinitialiser le formulaire après un court délai
        setTimeout(() => {
            contactForm.reset();
            contactMessageAlert.innerHTML = '';
        }, 5000); 
    });
});

