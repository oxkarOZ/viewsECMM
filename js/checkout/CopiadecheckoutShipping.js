
var shippingOptions;
var cardsShippingOptions = $();
var productsReview = $();

$(function() {
	
	
	loadShippingOptions();
	//loadCountry();
	/*$('#checkout-country').on('change', function() {
		loadStates(this.value);
	});
	$('#checkout-state').on('change', function() {
		loadTown(this.value);
	});
	$('#checkout-town').on('change', function() {
		loadColony(this.value);
	});
	$('#checkout-colony').on('change', function() {
		loadCP(colonyOptions[this.selectedIndex-1].postalCode.postalCodeNumber);
	});*/
	$("#checkoutzip").keyup(function(){
	    var zipLenght = $("#checkoutzip").val().length;
	    if(zipLenght === 5){
	    		loadCP($("#checkoutzip").val());
	    }else if(zipLenght > 5){
	    		$("#checkoutzip").val($("#checkoutzip").val().slice(0,5));
	    }
	  });

	$("#checkout-colony").change(function(){
	    if($("#checkout-colony  option:selected").val()){
	    	$('#checkout-description').removeAttr("disabled");
	    	$("#linkTabShoppingForm").removeClass("disabled");
	    }
	  });
	
	$('#contact-form').validate({
		rules : {
			checkoutfn : {
				minlength : 3,
				required : true
			},
			checkoutphone : {
		        minlength:10,
		        maxlength:10,
		        required : true
			},
			checkoutemail : {
				required : true,
				email : true
			},
			checkoutzip : {
				required : true
			}
		},
		messages : {
			checkoutfn : {
				minlength : "Introduce un nombre",
				required : "Introduce un nombre"
			},
			checkoutphone : {
				minlength : "Introduce un numero telefonico",
				maxlength : "Introduce un numero telefonico",
				required : "Introduce un nombre"
			},
			checkoutemail : {
				required : "Introduce un nombre"
			},
			checkoutzip : {
				required : "Introduce un ZIP"
			}
		},
		highlight : function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
			//$(element).closest('.form-control').removeClass('form-control-success').addClass('form-control-danger');
		},
		success : function(element) {
			element.closest('.form-group').removeClass('has-danger').addClass('has-success');

			switch(element[0].htmlFor){
				case 'checkoutfn':
					$('#checkoutphone').removeAttr("disabled");
				break;
				case 'checkoutemail':
					$('#checkoutcompany').removeAttr("disabled");
					$('#checkoutzip').removeAttr("disabled");
				break;

			}
			console.log(element[0].htmlFor);
		}
	});

});

function loadCheckoutAddress(){
	$("#cartSubtotal").append(getCartTotal());
}

function selectShippingOption(shippingOption, shippingCost){
	$("#linkTabPaymentForm").removeClass("disabled");
	$("#linkTabReviewForm").removeClass("disabled");
	
	saveShipping(shippingOption, shippingCost);
	reloadOrderSummary();
}


function loadCountry(){
	$('#checkout-country').find('option').remove().end().append('<option value=0>Choose country</option>').val('whatever');
	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/catalogo/country/all',
		success : function(respuesta) {
			countryOptions = respuesta;
			countryOptions.forEach(function(item, i) {
				$('#checkout-country').append('<option value="' + item.countryId + '">' +item.countryName+ '</option>');
			});
			$('#checkout-country').removeAttr('disabled');
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadStates(state){
	if(!state){
		state = 'all';
	}
	$('#checkout-state').find('option').remove().end().append('<option value=0>Choose State</option>').val('whatever');
	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/catalogo/state/'+state,
		success : function(respuesta) {
			stateOptions = respuesta;
			stateOptions.forEach(function(item, i) {
				$('#checkout-state').append('<option value="' + item.stateId + '">' +item.stateName+ '</option>');
			});
			$('#checkout-state').removeAttr('disabled');
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadTown(town){
	if(!town){
		town = 'all';
	}
	$('#checkout-town').find('option').remove().end().append('<option value=0>Choose Town</option>').val('whatever');
	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/catalogo/town/'+town,
		success : function(respuesta) {
			townOptions = respuesta;
			townOptions.forEach(function(item, i) {
				$('#checkout-town').append('<option value="' + item.townId + '">' +item.townName+ '</option>');
			});
			$('#checkout-town').removeAttr('disabled');
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadColony(colony){
	if(!colony){
		colony = 'all';
	}
	$('#checkout-colony').find('option').remove().end().append('<option>Choose Colony</option>').val('whatever');
	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/catalogo/colony/'+colony,
		success : function(respuesta) {
			colonyOptions = respuesta;
			colonyOptions.forEach(function(item, i) {
				$('#checkout-colony').append('<option value="' + item.colonyId + '">' +item.colonyName+ '</option>');
			});
			$('#checkout-colony').removeAttr('disabled');
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadCP(postalCode){
	$('#checkout-country').find('option').remove().end().append('<option value=0>Choose country</option>').val('whatever');
	$('#checkout-state').find('option').remove().end().append('<option value=0>Choose State</option>').val('whatever');
	$('#checkout-town').find('option').remove().end().append('<option value=0>Choose Town</option>').val('whatever');
	$('#checkout-colony').find('option').remove().end().append('<option value=0>Choose Colony</option>').val('whatever');

	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/catalogo/colony/postalCode/'+postalCode,
		success : function(respuesta) {
			colonyOptions = respuesta;
			colonyOptions.forEach(function(item, i) {
				$('#checkout-colony').append('<option value="' + item.colonyId + '">' +item.colonyName+ '</option>');
			});
			
			$('#checkout-town').append('<option selected value="' + colonyOptions[0].town.townId + '">' +colonyOptions[0].town.townName+ '</option>');
			$('#checkout-state').append('<option selected value="' + colonyOptions[0].town.state.stateId + '">' +colonyOptions[0].town.state.stateName+ '</option>');
			$('#checkout-country').append('<option selected value="' + colonyOptions[0].town.state.country.countryId + '">' +colonyOptions[0].town.state.country.countryName+ '</option>');

			$('#checkout-colony').removeAttr('disabled');
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadShippingOptions(){
	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/shippingOptions/all',
		success : function(respuesta) {
			shippingOptions = respuesta;
			cardsShippingOptions= $();
			$('#shippingOptions').innerHTML='';
			shippingOptions.forEach(function(item, i) {
				cardsShippingOptions = cardsShippingOptions.add(loadShippingOption(item));
			});
			$('#shippingOptions').append(cardsShippingOptions);
		},
		error : function() {
			console.log("No se ha podido obtener la información");
		}
	});
}

function loadShippingOption (cardData){
	var cardShippingOptionsTemplate = [	'<tr>',
										'<td class="align-middle">',
										'<div class="custom-control custom-radio mb-0">',
										'<input class="custom-control-input" type="radio" id="shipping-method-'+cardData.shippingOptionId+'" value="'+cardData.shippingOptionId+'" onclick="selectShippingOption('+cardData.shippingOptionId+','+cardData.shippingOptionPrice+')" name="shipping-method">',
										'<label class="custom-control-label" for="shipping-method-'+cardData.shippingOptionId+'"></label>',
										'</div>',
										'</td>',
										'<td class="align-middle">'+cardData.shippingOptionName+'</td>',
										'<td class="align-middle">'+cardData.shippingOptionDelivery+'</td>',
										'<td class="align-middle">$'+cardData.shippingOptionPrice+'</td>',
										'</tr>'];
	return $(cardShippingOptionsTemplate.join(''));           
                
}

function addProductsReview(){

	$("#productsReview").empty();
	productsReview = $();
    
    var cocoCart = localStorage.getItem('cocoCart');
    var checkoutProductList = JSON.parse(cocoCart);

    for (var key in checkoutProductList) {
    		var checkoutProduct = checkoutProductList[key];
    		  productsReview = productsReview.add(addProductReview(checkoutProduct));
		}
		$("#productsReview").append(productsReview);


		var address = '';
		address += $('#checkout-street').val()+', ';
		address += $('#checkoutzip').val()+' ';
		address += $('#checkout-colony option:selected').text()+' ';
		address += $('#checkout-town option:selected').text()+' ';
		address += $('#checkout-state option:selected').text()+', ';
		address += $('#checkout-country option:selected').text()+'.';

		$('#shippingClient').text($('#checkoutfn').val());
		$('#shippingMail').text($('#checkoutemail').val());
		$('#shippingAddress').text(address);
		$('#shippingPhone').text($('#checkoutphone').val());
		$('#subtotalReview').text(getCartTotal());
		
		$("#finalizarReview").show();


}


function addProductReview(checkoutProduct){
	console.log(checkoutProduct);
	var productTemplate = [
			'<tr>',
              '<td>',
                '<div class="product-item"><a class="product-thumb" href="shop-single.html?product='+checkoutProduct.product.productId+'"><img src="'+checkoutProduct.product.images[0].imageUrl+'" alt="Product"></a>',
                 '<div class="product-info">',
                    '<h4 class="product-title"><a href="shop-single.html?product='+checkoutProduct.product.productId+'">'+checkoutProduct.product.productName+'<small>('+checkoutProduct.quantity+' x '+checkoutProduct.product.productPrice+')</small></a></h4><span><em>Categoria:</em> '+checkoutProduct.product.category.categoryName+'</span><span><em>Marca:</em> '+checkoutProduct.product.brand.brandName+'</span>',
                  '</div>',
                '</div>',
              '</td>',
              '<td class="text-center text-lg">$'+(checkoutProduct.product.productPrice*checkoutProduct.quantity)+'</td>',
              '<td class="text-center"><a class="btn btn-outline-primary btn-sm" href="checkout.html">Edit</a></td>',
            '</tr>'
	];
	return $(productTemplate.join(''));
}

function reloadOrderSummary(){
	$('#cartSubtotal').empty();
	$('#shippingPrice').empty();
	$('#estimatedTax').empty();
	$('#totalCheckout').empty();

	var cartTotal = getCartTotal(),
		shippingTotal = getShippingTotal();

	var totalCheckout = cartTotal + shippingTotal;

	$('#cartSubtotal').append('$ '+cartTotal);
	$('#shippingPrice').append('$ '+shippingTotal);
	$('#estimatedTax').append('$ 0');
	$('#totalCheckout').append('$ '+totalCheckout);


}

function saveAddress(){
	var obj = {
		    "fullName"	: $('#checkoutfn').val(),
		    "email"		: $('#checkoutemail').val(),
		    "phone"		: $('#checkoutphone').val(),
		    "company"	: $('#checkoutcompany').val(),
		    "zipCode"	: $('#checkoutzip').val(),
		    "country"	: $('#checkout-country').val(),
		    "state"		: $('#checkout-state').val(),
		    "town"		: $('#checkout-town').val(),
		    "colony"	: $('#checkout-colony').val(),
		    "references": $('#checkout-description').val()
		};
		saveCheckoutAddress(obj);
}

function saveShipping(shippingOption, shippingCost){
	var obj = {
		    "shippingOption"	: shippingOption,
		    "shippingCost"		: shippingCost
		};
		saveCheckoutShipping(obj);
}

function soloNumeros(e) {
	var key = window.Event ? e.which : e.keyCode;
	return ((key >= 48 && key <= 57) || (key == 8));
}