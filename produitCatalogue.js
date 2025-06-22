console.log("hello");

const page = document.getElementById('page');
const listNomProduit = document.querySelectorAll('.text-lg.font-semibold');
const listPrix = document.querySelectorAll('.mt-3.font-bold.text-gray-600');

// Vérifie qu'il y a bien au moins un produit
if (listNomProduit.length && listPrix.length) {
  const nom = listNomProduit[0].textContent.trim();
  const prix = listPrix[0].textContent.trim();
  page.textContent = `Accueil > Produits > Détails > ${nom} (${prix})`;
} else {
  console.warn("Produit non trouvé");
}
for(let produit of listNomProduit){
}

page.textContent = "Accueil > Produits > Détails";


const a = document.querySelector('a .mt-3.font-bold.text-gray-600') 
const productPrice = document.querySelector('.product-price')
   
a.addEventListener('click', (event) => {
   const clickedPrice = event.target.textContent;
   productPrice.innerText = clickedPrice;
})