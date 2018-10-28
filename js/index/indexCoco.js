var featuredProducts;
var cards = $();

$(function() {
	cargaProductos();
});



function cargaProductos(){
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/featured/all',
		success: function(respuesta) {
			featuredProducts = respuesta;
			featuredProducts.forEach(function(item, i) {
			  cards = cards.add(loadFeatured(item));
			});
			$('#rowFeatured').append(cards);
		},
		error: function() {
	        console.log("No se ha podido obtener la información");
	    }
	});
}


function loadFeatured(cardData){
	var cardFeaturedTemplate = [
		'<div class="col-lg-3 col-md-4 col-sm-6">',
		'<div class="product-card mb-30"><a class="product-thumb" href="shop-single.html"><img src="'+cardData.images[0].imageUrl+'" alt="Product"></a>',
		'<div class="product-card-body">',
		'<div class="product-category"><a href="#"> '+cardData.category.categoryName+' </a></div>',
		'<h3 class="product-title"><a href="shop-single.html">'+cardData.productName+'</a></h3>',
		'<h4 class="product-price">$'+cardData.productPrice+'.00</h4>',
		'</div>',
		'<div class="product-button-group"><a class="product-button btn-wishlist" href="#"><i class="icon-heart"></i><span>Wishlist</span></a><a class="product-button" href="#" data-toast data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-check-circle" data-toast-title="Product" data-toast-message="successfuly added to cart!"><i class="icon-shopping-cart"></i><span>To Cart</span></a></div></div>',
		'</div>'
	];
	return $(cardFeaturedTemplate.join(''));
}

