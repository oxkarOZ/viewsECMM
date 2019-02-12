var categories;
var categoryCards = $();
var products;
var productCards = $();


$(function() {
	var categoryId = getUrlParameter('category');
	loadCategory();
	loadProduct(categoryId);
});



function loadCategory(){
	categoryCards= $();
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/category/allCount',
		success: function(respuesta) {
			categories = respuesta;
			categories.forEach(function(item, i) {
			  categoryCards = categoryCards.add(loadCategoryCard(item));
			});
			$("#categoryCount").append(categoryCards);
			
		},
		error: function() {
	        console.log("No se ha podido obtener la información");
	    }
	});
}

function loadProduct(idCategory){
	productCards = $();
	var url = 'http://localhost:8080/product/all';
	if(idCategory){
		url = 'http://localhost:8080/product/all/'+idCategory;
	}
	$('#productGrid').empty();
	products={};
	productCards = $();
	$.ajax({
		type: "GET",
		url: url,
		success: function(respuesta) {
			product = respuesta;
			product.forEach(function(item, i) {
			  productCards = productCards.add(loadProductCard(item));
			});
			$("#productGrid").append(productCards);
			
		},
		error: function() {
	        console.log("No se ha podido obtener la información");
	    }
	});
}

function loadCategoryCard(cardData){
	var categoryCardTemplate = [
		'<li><a style="cursor:pointer;" onclick="loadProduct('+cardData.categoryId+');" >'+cardData.categoryName+'</a><span>('+cardData.quantity+')</span></li>'
	];
	return $(categoryCardTemplate.join(''));
}

function loadProductCard(cardData){
	var productCardTemplate = [
		'<div class="col-md-4 col-sm-6">',
        '     <div class="product-card mb-30">',
        '      	<div class="rating-stars"><i class="icon-star filled"></i><i class="icon-star filled"></i><i class="icon-star filled"></i><i class="icon-star filled"></i><i class="icon-star"></i></div>',
        '        <div class="product-badge bg-danger">Sale</div><a class="product-thumb" href="shop-single.html?product='+cardData.productId+'"><img src="'+cardData.images[0].imageUrl+'" alt="'+cardData.productTitle+'"></a>',
        '        <div class="product-card-body">',
        '          <div class="product-category"><a href="#">'+cardData.category.categoryName+'</a></div>',
        '          <h3 class="product-title"><a href="shop-single.html?product='+cardData.productId+'">'+cardData.productTitle+'</a></h3>',
        '          <h4 class="product-price">',
        '            $ '+cardData.productPrice,
        '          </h4>',
        '        </div>',
        '        <div class="product-button-group"><a class="product-button btn-wishlist" href="#"><i class="icon-heart"></i><span>Wishlist</span></a><a class="product-button btn-compare" href="#"><i class="icon-repeat"></i><span>Compare</span></a><a class="product-button" href="#" data-toast data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-check-circle" data-toast-title="Product" data-toast-message="successfuly added to cart!"><i class="icon-shopping-cart"></i><span>To Cart</span></a></div>',
        '      </div>',
        '    </div>'
	];
	return $(productCardTemplate.join(''));
}
