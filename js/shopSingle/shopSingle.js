var productData = $();
var cartData = $();
var cartCards= $();
var cartAmount=0;
var cartCount = 0;
var thumbnailsCards = $();
var productImagesCards = $();

$(function() {
	loadProduct();
	loadCartProducts();
	
	$("#addCart").click(function(){
		addCart(productData, $("#quantity").val());
	});
});

function loadProduct() {

	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/product/get/' + getUrlParameter('product'),
		success : function(respuesta) {
			//Thumbnails
			productData = $();
			productData = respuesta;
			thumbnailsCards = $();
			productData.images.forEach(function(item, i) {
				thumbnailsCards = thumbnailsCards.add(loadThumbnails(item, i));
			});
			$("#thumbnails").append(thumbnailsCards);
			
			
			//Product Images
			productData.images.forEach(function(item, i) {
				loadProductImages(item, i);
			});
			
			//Tags
			$("#brandTag").append(productData.brand.brandName+", ");
			$("#categoryTag").append(productData.category.categoryName);
			
			//Product Description
			$("#productNameD").append(productData.productName);
			$("#productPriceD").append(productData.productPrice);
			var lengthDescription = productData.productDescription+"".length;
			if(lengthDescription>131){
				$("#productDescriptionD").append(productData.productDescription+"  ".slice(0, 130));
				$("#productDescriptionD").append("<a href='#details' class='scroll-to'> Seguir leyendo...");
			}else{
				$("#productDescriptionD").append(productData.productDescription);
			}
			$("#size").append('<option value=1>'+productData.productSize+'</option>');
			$("#productSkuD").append(' #'+productData.productSKU);

			//Details
			$("#detailsDescription").append(productData.productDescription);
			
			
			
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});

}

function loadThumbnails(cardData, i){
	var active='';
	if(i==0){
		active='class="active"';
	}
	i++;
	var thumbnailsCardTemplate = [
		'<li '+active+'><a href="#'+cardData.imageId+'"><img src="'+cardData.imageUrl+'" alt="'+cardData.imageId+'"></a></li>'
	];
	
	return $(thumbnailsCardTemplate.join(''));
	
}

function loadProductImages(cardData, i){
	var active='';
	var owl = $('#productImages');
	
	owl.trigger('add.owl.carousel', ['<div class="gallery-item" data-hash="'+cardData.imageId+'"><a href="'+cardData.imageUrl+'" data-size="1000x667"><img src="'+cardData.imageUrl+'" alt="'+cardData.imageId+'"></a></div>'	])
        .trigger('refresh.owl.carousel');
	
}




