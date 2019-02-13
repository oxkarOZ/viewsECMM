var featuredProducts;
var slideProducts;
var cardsFeatured = $();
var cardsSlide = $();

$(function() {
	cargaSlide();
	cargaProductos();
	loadCartProducts();
	startCountDown();
});

function cargaProductos() {
	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/featured/all',
		success : function(respuesta) {
			featuredProducts = respuesta;
			featuredProducts.forEach(function(item, i) {
				cardsFeatured = cardsFeatured.add(loadFeatured(item));
			});
			$('#rowFeatured').append(cardsFeatured);
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadFeatured(cardData) {
	var cardFeaturedTemplate = ['<div class="col-lg-3 col-md-4 col-sm-6">', '<div class="product-card mb-30"><a class="product-thumb" href="shop-single.html?product='+cardData.productId+'"><img src="' + cardData.images[0].imageUrl + '" alt="Product"></a>', '<div class="product-card-body">', '<div class="product-category"><a href="shop-single.html?product='+cardData.productId+'"> ' + cardData.category.categoryName + ' </a></div>', '<h3 class="product-title"><a href="shop-single.html?product='+cardData.productId+'">' + cardData.productName + '</a></h3>', '<h4 class="product-price">$' + cardData.productPrice + '.00</h4>', '</div>', '<div class="product-button-group"><a class="product-button btn-wishlist" href="#"><i class="icon-heart"></i><span>Wishlist</span></a><a class="product-button" href="#" data-toast data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-check-circle" data-toast-title="Product" data-toast-message="successfuly added to cart!"><i class="icon-shopping-cart"></i><span>To Cart</span></a></div></div>', '</div>'];
	return $(cardFeaturedTemplate.join(''));
}

function cargaSlide() {
	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/banner/all',
		success : function(respuesta) {
			slideProducts = respuesta;
			slideProducts.forEach(function(item, i) {
				cardsSlide = cardsSlide.add(loadSlide(item));
			});
			$('#divSlide').append(cardsSlide);
			var owl = $('#divSlide');
			owl.addClass("owl-carousel large-controls dots-inside");

			owl.owlCarousel({
				items : 1,
				autoHeight : true,
				loop : true,
				autoplay : true,
				autoplayTimeout : 3000,
				nav : true,
				dots : true,
				navText : ["", ""]
			});
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadSlide(cardData) {
	var cardFeaturedTemplate = ['<div class="item">', '<div class="container padding-top-3x">', '<div class="row justify-content-center align-items-center">', '<div class="col-lg-5 col-md-6 padding-bottom-2x text-md-left text-center">', '<div class="from-bottom"><img class="d-inline-block w-150 mb-4" src="img/hero-slider/logoRev.jpg" alt="Puma">', '<div class="h2 text-body mb-2 pt-1">' + cardData.category.categoryName + ' - ' + cardData.productName + '</div>', '<div class="h2 text-body mb-4 pb-1">starting at <span class="text-medium">$' + cardData.productPrice + '.00</span></div>', '</div><a class="btn btn-primary scale-up delay-1" href="shop-grid-ls.html">View Offers&nbsp;<i class="icon-arrow-right"></i></a>', '</div>', '<div class="col-md-6 padding-bottom-2x mb-3"><img class="d-block mx-auto" src="img/hero-slider/02.png" alt="Puma Backpack"></div>', '</div>', '</div>', '</div>'];
	return $(cardFeaturedTemplate.join(''));
}

function loadCartProducts(){
	
	clearCart();
	cartCount = 0;
	cartData = $();
	cartCards= $();
	cartAmount = 0;
	cartData = getCart();
	if(cartData){
		cartData.forEach(function(item, i){
			cartCards = cartCards.add(loadCart(item));
		});
		$('#cartProducts').prepend(cartCards);
		$('#cartSubTotal').append('<span id="subtotal"> $'+cartAmount+'</span>');
		$('#cartCountLabel').append('<span id="cartCount">'+cartCount+'</span>');
		
		
	}
}


function startCountDown(){

	var actualDate = new Date();
	var actualAnio = actualDate.getFullYear();

// Set the date we're counting down to
var countDownDate = new Date("Nov 2, "+actualAnio+" 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("idDays").innerHTML = (days < 10)? "0" + days : days;
  document.getElementById("idHours").innerHTML =  (hours < 10)? "0" + hours : hours;
  document.getElementById("idMinutes").innerHTML = (minutes < 10)? "0" + minutes : minutes;
  document.getElementById("idSeconds").innerHTML = (seconds < 10)? "0" + seconds : seconds;

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

}
