document.addEventListener('DOMContentLoaded', () => {

    // Script pour la galerie photo 
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget; // Bouton qui a déclenché le modal
            const imgSrc = button.getAttribute('data-img-src');
            const imgCaption = button.getAttribute('data-img-caption');

            const modalImage = imageModal.querySelector('#modalImage');
            const modalCaption = imageModal.querySelector('#modalCaption');

            modalImage.src = imgSrc;
            modalCaption.textContent = imgCaption;
        });
    }
});

