
$(function() {
	loadCartProducts();
});

/**
 * Función para agregar productos al carrito de compras
 *
 * @param {Object} product
 * @param {Object} quantity
 */
function addCart(product, quantity) {
	
	if (localStorage.length) {
		var cocoCart = localStorage.getItem('cocoCart');
		var productList = JSON.parse(cocoCart);

		var productToAdd = {
			quantity : quantity,
			product : product
		};
		var keyToModify, repetedProduct;
		for (var key in productList) {
    			var objP = productList[key];
    			if(objP.product.productId === productToAdd.product.productId){
    				if(objP.quantity === quantity){
    					repetedProduct=true;
    					break;
    				}else{
    					keyToModify = key;
    					break;
    				}
    			}
		}
		if(keyToModify){
			productList[keyToModify]=productToAdd;
			localStorage.setItem("cocoCart", JSON.stringify(productList));
			$('#addCart').attr('data-toast-title', 'cartAmount');
			$('#addCart').attr('data-toast-message', 'hello mensaje');
			refreshCart();
		}else if(!repetedProduct){
    			productList.push(productToAdd);
    			localStorage.setItem("cocoCart", JSON.stringify(productList));
    			refreshCart();
    		}else if(repetedProduct){
    			
    		}
		
	}else{
		
		var product = {
			quantity : quantity,
			product : product
		};
		var productList = [];

		productList.push(product);
		localStorage.setItem("cocoCart", JSON.stringify(productList));
		refreshCart();
	}
	
}

function loadCart(cardData){
	cartCount++;
	var cartTemplate = [
		'<div class="entry" id="entry-'+cardData.product.productId+'">',
		'<div class="entry-thumb">',
		'<a href="shop-single.html?product='+cardData.product.productId+'"><img src="'+cardData.product.images[0].imageUrl+'" alt="Product"></a>',
		'</div>',
		'<div class="entry-content">',
		'<h4 class="entry-title"><a href="shop-single.html?product='+cardData.product.productId+'">'+cardData.product.productName+'</a></h4><span class="entry-meta">'+cardData.quantity+' x $'+cardData.product.productPrice+'</span>',
		'</div>',
		'<div class="entry-delete" onclick="deleteCartProduct('+cardData.product.productId+')">',
		'<i class="icon-x"></i>',
		'</div>'
	];
	cartAmount = cartAmount+(cardData.quantity*cardData.product.productPrice);
	return $(cartTemplate.join(''));
}

function loadCart2(cardData){
	var cartTemplate = [
		'<div class="entry" id="entry2-'+cardData.product.productId+'">',
		'<div class="entry-thumb">',
		'<a href="shop-single.html?product='+cardData.product.productId+'"><img src="'+cardData.product.images[0].imageUrl+'" alt="Product"></a>',
		'</div>',
		'<div class="entry-content">',
		'<h4 class="entry-title"><a href="shop-single.html?product='+cardData.product.productId+'">'+cardData.product.productName+'</a></h4><span class="entry-meta">'+cardData.quantity+' x $'+cardData.product.productPrice+'</span>',
		'</div>',
		'<div class="entry-delete" onclick="deleteCartProduct('+cardData.product.productId+')">',
		'<i class="icon-x"></i>',
		'</div>'
	];	
	return $(cartTemplate.join(''));
}


function getCart(){
    return JSON.parse(localStorage.getItem('cocoCart'));
}

function refreshCart(){
	loadCartProducts();
}


function clearCart(){
	$('#cartCountLabel').children('#cartCount').remove();
	$('#cartProducts').children('.entry').remove();
	$('#cartSubTotal').children('#subtotal').remove();

	$('#cartCountLabel2').children('#cartCount2').remove();
	$('#cartProducts2').children('.entry').remove();
	$('#cartSubTotal2').children('#subtotal2').remove();
	
}
function cleanCartLocalStorage(){
	localStorage.removeItem("cocoCart");
	
}


function loadCartProducts(){
	
	clearCart();
	cartCount = 0;
	cartAmount = 0;
	
	cartData = $();
	cartCards= $();	
	cartData = getCart();
	if(cartData){
		cartData.forEach(function(item, i){
			cartCards = cartCards.add(loadCart(item));
		});
		$('#cartProducts').prepend(cartCards);
		$('#cartSubTotal').append('<span id="subtotal"> $'+cartAmount+'</span>');
		$('#cartCountLabel').append('<span id="cartCount">'+cartCount+'</span>');
				
	}

	cartData2 = $();
	cartCards2= $();	
	cartData2 = getCart();
	if(cartData2){
		cartData2.forEach(function(item, i){
			cartCards2 = cartCards2.add(loadCart2(item));
		});

		$('#cartProducts2').prepend(cartCards2);
		$('#cartSubTotal2').append('<span id="subtotal2"> $'+cartAmount+'</span>');
		$('#cartCountLabel2').append('<span id="cartCount2">'+cartCount+'</span>');
		
	}

}

function deleteCartProduct(product){
	if(localStorage.length){
		var cocoCart = localStorage.getItem('cocoCart');
		var productList = JSON.parse(cocoCart);
		for (var key in productList) {
			if(product === productList[key].product.productId){
				productList.splice(key, 1);
			}
		}
		if(productList.length == 0){
			localStorage.clear();
		}else{
			localStorage.setItem("cocoCart", JSON.stringify(productList));
		}
		refreshCart();
	}
}

function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
	    sURLVariables = sPageURL.split('&'),
	    sParameterName,
	    i;

	for ( i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};

