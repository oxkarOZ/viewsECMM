var brands;
var brandCards = $();
var categories;
var categoryCards = $();


$(function() {
	loadBrand();
	loadCategory();
});


function loadBrand(){
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/brand/allTotal',
		success: function(respuesta) {
			brands = respuesta;
			brands.forEach(function(item, i) {
			  brandCards = brandCards.add(loadBrandCard(item));
			});
			$("#ulPopularBrands").append(brandCards);
			
		},
		error: function() {
	        console.log("No se ha podido obtener la información");
	    }
	});
}


function loadCategory(){
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/category/allMain',
		success: function(respuesta) {
			categories = respuesta;
			categories.forEach(function(item, i) {
			  categoryCards = categoryCards.add(loadCategoryCard(item));
			});
			$("#rowCategories").append(categoryCards);
			
		},
		error: function() {
	        console.log("No se ha podido obtener la información");
	    }
	});
}


function loadBrandCard(cardData){
	var brandCardTemplate = [
		'<li><a href="#">'+ cardData.brandName +'</a><span>('+cardData.total+')</span></li>'
	];
	return $(brandCardTemplate.join(''));
}

function loadCategoryCard(cardData){
	var categoryCardTemplate = [
		'<div class="col-sm-6">',
        '<div class="card mb-30"><a class="card-img-tiles" href="shop-grid-ls.html">',
        '<div class="inner">',
        '<div class="main-img"><img src="img/shop/categories/01.jpg" alt="Category"></div>',
        '<div class="thumblist"><img src="img/shop/categories/02.jpg" alt="Category"><img src="img/shop/categories/03.jpg" alt="Category"></div>',
        '</div></a>',
        '<div class="card-body text-center">',
        '<h4 class="h6 card-title">'+cardData.categoryName+'</h4>',
        '<form id="categoryForm" action="shop-grid-ls.html" method="post"><input type="hidden" id="category" name="category" value="2" /></form>',
        '<p class="text-xs text-muted">Starting from &nbsp;<span class="card-label">$ '+cardData.startPrice+'</span></p><a class="btn btn-outline-primary btn-sm" href="shop-grid-ls.html?category='+cardData.categoryId+'">View Products</a>',
        '</div>',
        '</div>',
        '</div>'
	];
	return $(categoryCardTemplate.join(''));
}
