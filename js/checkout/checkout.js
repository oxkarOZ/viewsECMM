var checkoutProductList;
var checkoutProductsToShow = $();
var totalAmount = 0;


$(function() {
   loadCheckoutProducts();
});


function loadCheckoutProducts(){

	$("#idCheckoutProducts").empty();
	totalAmount = 0
	checkoutProductsToShow = $();
    
    var cocoCart = localStorage.getItem('cocoCart');
     checkoutProductList = JSON.parse(cocoCart);

    for (var key in checkoutProductList) {
    		var checkoutProduct = checkoutProductList[key];
    		  checkoutProductsToShow = checkoutProductsToShow.add(addProduct(checkoutProduct));
		totalAmount = totalAmount + (checkoutProduct.quantity * checkoutProduct.product.productPrice);
		}
		$("#idCheckoutProducts").append(checkoutProductsToShow);
		$("#idTotalAmount").html("$ "+totalAmount);

}


function addProduct(checkoutProduct){
	var productTemplate = [
			'<tr>',
              '<td>',
                '<div class="product-item"><a class="product-thumb" href="shop-single.html"><img src="'+checkoutProduct.product.images[0].imageUrl+'" alt="Product"></a>',
                  '<div class="product-info">',
                    '<h4 class="product-title"><a href="shop-single.html">'+checkoutProduct.product.productDescription+'</a></h4><span><em>Marca:</em>'+checkoutProduct.product.brand.brandName+'</span>',
                  '</div>',
                '</div>',
              '</td>',
              '<td class="text-center">',
                '<div class="count-input">',
                '<input class="form-control" type="number" min="1" value='+checkoutProduct.quantity+' id='+checkoutProduct.product.productId+'-Quanty'+'>',
                '</div>',
              '</td>',
              '<td class="text-center text-lg">$'+checkoutProduct.product.productPrice+'</td>',
              '<td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="Update item"><i class="icon-save" onclick="updateCheckoutProduct('+checkoutProduct.product.productId+')"></i></a></td>',
              '<td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="Remove item"><i class="icon-x" onclick="deleteCheckoutProduct('+checkoutProduct.product.productId+')"></i></a></td>',
            '</tr>'
	];
	return $(productTemplate.join(''));
}


function clearCheckout(){
	cleanCartLocalStorage();
	loadCheckoutProducts();
}
		

function deleteCheckoutProduct(idProduct){
	deleteCartProduct(idProduct);	
	location.reload();
}	

function updateCheckoutProduct(idProduct){
	  var cocoCart = localStorage.getItem('cocoCart');
     checkoutProductList = JSON.parse(cocoCart);
     var evaluateAdd = false;

    for (var key in checkoutProductList) {
    	   var checkoutProduct = checkoutProductList[key];
    	   if(checkoutProduct.product.productId === idProduct){
    	   	var id = idProduct+'-Quanty';
				var quantity = $('#'+id).val();
				if(checkoutProduct.quantity !== quantity){				
				addCart(checkoutProduct.product,quantity);
				evaluateAdd = true;
				}
    		}
    }
    
    if(evaluateAdd){
    	location.reload();
    }
    

}