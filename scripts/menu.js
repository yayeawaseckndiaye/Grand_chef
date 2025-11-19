let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const whatsappBtn = document.getElementById('whatsapp-btn');
// Le numéro de téléphone WhatsApp où les commandes seront envoyées
const numeroWhatsApp = "221785413074";

// --- Gestion de l'ajout au panier ---
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);
        const item = cart.find(i => i.name === name);
        
        if (item) {
            item.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        updateCart();
    });
});

// --- Mise à jour du panier et construction du lien WhatsApp ---
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    // 1. Mise à jour de la liste des articles et du total
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.className = 'list-group-item bg-dark text-light border-gold d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${item.name} — ${item.price} FCFA</span>
            <div>
                <button class="btn btn-sm btn-outline-gold me-2" onclick="changeQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button class="btn btn-sm btn-outline-gold ms-2" onclick="changeQty(${index}, 1)">+</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    // 2. Affichage du total et du nombre d'articles
    cartTotal.textContent = total + ' FCFA';
    cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);

    // 3. Construction du message WhatsApp
    
    // Crée une liste formatée des articles (ex: "Pizza Royale (5000 FCFA) x 2")
    const itemsList = cart.map(item => 
        `${item.name} (${item.price} FCFA) x ${item.qty}`
    ).join('\n'); // Utilise '\n' pour un retour à la ligne dans le message WhatsApp

    // Crée le message complet en utilisant un template literal (backticks)
    const msg = `**Nouvelle Commande de Menu** 
    🧑‍🍳${itemsList}
     --------------------------------------
    💰 TOTAL : ${total} FCFA`;

    // 4. Assignation de l'URL du bouton WhatsApp
    whatsappBtn.href = `https://wa.me/${numeroWhatsApp }?text=${encodeURIComponent(msg)}`;
}

// --- Gestion des quantités (Augmenter/Diminuer) ---
function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// --- Vider le panier ---
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
});

// --- Gestion du filtre de menu (sans changement) ---
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        document.querySelectorAll('.menu-item').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});