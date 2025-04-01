// Attend que le DOM soit complètement chargé avant d'exécuter le script
// Cela garantit que tous les éléments HTML sont accessibles

document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments interactifs du DOM
    const plusButtons = document.querySelectorAll('.fa-plus-circle'); // Boutons d'augmentation de quantité
    const minusButtons = document.querySelectorAll('.fa-minus-circle'); // Boutons de réduction de quantité
    const deleteButtons = document.querySelectorAll('.fa-trash-alt'); // Boutons de suppression de produit
    const likeButtons = document.querySelectorAll('.fa-heart'); // Boutons de mise en favori (like)
    const totalElement = document.querySelector('.total'); // Élément affichant le prix total
  
    // Gestion des boutons "+" (ajouter une unité au produit)
    plusButtons.forEach(button => {
      button.addEventListener('click', function() {
        const quantityElement = this.parentElement.querySelector('.quantity'); // Sélectionne la quantité actuelle
        let quantity = parseInt(quantityElement.textContent); // Convertit le texte en nombre
        quantityElement.textContent = quantity + 1; // Incrémente la quantité
        updateTotal(); // Met à jour le prix total
      });
    });
  
    // Gestion des boutons "-" (réduire une unité du produit, minimum 0)
    minusButtons.forEach(button => {
      button.addEventListener('click', function() {
        const quantityElement = this.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) { // Vérifie que la quantité ne descend pas en dessous de 0
          quantityElement.textContent = quantity - 1;
          updateTotal();
        }
      });
    });
  
    // Gestion du bouton de suppression d'un produit
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const card = this.closest('.card'); // Trouve l'élément parent représentant le produit
        card.style.opacity = '0'; // Effet de disparition progressive
        setTimeout(() => {
          card.style.display = 'none'; // Cache complètement l'élément après 300ms
          updateTotal(); // Met à jour le total après suppression
        }, 300);
      });
    });
  
    // Gestion des favoris (like/unlike)
    likeButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.classList.toggle('text-danger'); // Ajoute/enlève la classe rouge pour indiquer un favori
      });
    });
  
    // Fonction de mise à jour du prix total
    function updateTotal() {
      let total = 0;
      document.querySelectorAll('.card').forEach(card => {
        if (card.style.display !== 'none') { // Vérifie que l'article n'est pas supprimé
          const quantity = parseInt(card.querySelector('.quantity').textContent); // Quantité actuelle
          const price = parseInt(card.querySelector('.unit-price').textContent); // Prix unitaire du produit
          total += quantity * price; // Ajoute le total de cet article au prix total
        }
      });
      totalElement.textContent = total + ' $'; // Met à jour l'affichage du prix total
    }
  
    // Initialisation du total au chargement de la page
    updateTotal();
  });