var cardsProducts = $();
var cartProducts = $();
var products = [];
var productsCart = [];
var productsCartTemp = [];

$(function() {
  $('#countCart').html(productsCart.length);
    cargaProductos();
});


function cargaProductos(){
  $.ajax({
    type: "GET",
    url: 'http://localhost:8080/product/all',
    success: function(respuesta) {
      products = respuesta;
      products.forEach(function(item, i) {
        cardsProducts = cardsProducts.add(loadProducts(item));
      });
      $('#rowProducts').append(cardsProducts);
    },
    error: function() {
          console.log("No se ha podido obtener la información");
      }
  });
}



function loadProducts(productData){
  var productTemplate = [
    '<div class="col-md-4 col-sm-6">',
      '<div class="product-card mb-30">',
        '<div class="product-badge bg-danger">Sale</div><a class="product-thumb" href="shop-single.html"><img src="'+productData.images[0].imageUrl+'" alt="Product"></a>',
        '<div class="product-card-body">',
          '<div class="product-category"><a href="#">'+productData.category.categoryName+'</a></div>',
          '<h3 class="product-title"><a href="shop-single.html">'+productData.productName+'</a></h3>',
          '<h4 class="product-price">$'+productData.productPrice+'.00</h4>',
        '</div>',
        '<div class="product-button-group"><a class="product-button btn-wishlist" href="#"><i class="icon-heart"></i><span>Wishlist</span></a><a class="product-button btn-compare" href="#"><i class="icon-repeat"></i><span>Compare</span></a><a class="product-button" href="#" onclick="addCart('+productData.productId+')" data-toast data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-check-circle" data-toast-title="Product" data-toast-message="successfuly added to cart!"><i class="icon-shopping-cart"></i><span>To Cart</span></a></div>',
      '</div>',
    '</div>'
  ];
  return $(productTemplate.join(''));
}


function addCart(idProducto){
   var existe = 0;
  
  $.each(productsCart, function( index2, value2 ) {
    if(value2.productId === idProducto){
     existe = 1;
    }
  });

  if(existe === 0){
   $.each(products, function( index, value ) {
     if(value.productId === idProducto){
       productsCart.push(value);
      }
  });
    updateCart();
  }  
} 


function deleteCart(idProducto){
  $.each(productsCart, function( index, value ) {
    if(value.productId !== idProducto){
      productsCartTemp.push(value);
    }
  });

  productsCart = productsCartTemp;
  productsCartTemp = [];

  updateCart();
}


function updateCart(){
  var total = 0;
    $('#idCart').empty();
    cartProducts = $();
    productsCart.forEach(function(item, i) {
        cartProducts = cartProducts.add(loadCartProducts(item));
        total += item.productPrice;
      });

      cartProducts = cartProducts.add(loadBtnsCart(total));
        $('#idCart').append(cartProducts);

        $('#countCart').html(productsCart.length);
}


function loadCartProducts(productCart){
  var productTemplate = [
    '<div class="entry dltElm">',
      '<div class="entry-thumb"><a href="shop-single.html"><img src="'+productCart.images[0].imageUrl+'" alt="Product"></a></div>',
      '<div class="entry-content">',
        '<h4 class="entry-title"><a href="shop-single.html">'+productCart.category.categoryName+'</a></h4><span class="entry-meta">1 x $'+productCart.productPrice+'</span>',
      '</div>',
      '<div class="entry-delete"><i class="icon-x" onclick="deleteCart('+productCart.productId+')"></i></div>',
    '</div>'
  ];
  return $(productTemplate.join(''));
}

function loadBtnsCart(tot){
  var productTemplate = [
    '<div class="text-right dltElm">',
      '<p class="text-gray-dark py-2 mb-0"><span class="text-muted">Subtotal:</span> &nbsp;$'+tot+'</p>',
    '</div>',
    '<div class="d-flex dltElm">',
         '<div class="pr-2 w-50"><a class="btn btn-secondary btn-sm btn-block mb-0" href="cart.html">Expand Cart</a></div>',
         '<div class="pl-2 w-50"><a class="btn btn-primary btn-sm btn-block mb-0" href="checkout.html">Checkout</a></div>',
    '</div>'];
  return $(productTemplate.join(''));
}


