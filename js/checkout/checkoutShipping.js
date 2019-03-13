
var shippingOptions;
var cardsShippingOptions = $();

$(function() {
	
	
	
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
	$("#checkout-zip").keyup(function(){
	    var zipLenght = $("#checkout-zip").val().length;
	    if(zipLenght === 5){
	    		loadCP($("#checkout-zip").val());
	    }else if(zipLenght > 5){
	    		$("#checkout-zip").val($("#checkout-zip").val().slice(0,5));
	    }
	  });
	
	$('#contact-form').validate({
		rules : {
			checkoutfn : {
				minlength : 3,
				required : true
			},
			checkoutln : {
				minlength : 3,
				required : true
			},
			checkoutemail : {
				required : true,
				email : true
			}

		},
		messages : {
			checkoutfn : {
				minlength : "Introduce un nombre",
				required : "Introduce un nombre"
			},
			checkoutln : {
				minlength : "Introduce un apellido",
				required : "Introduce un nombre"
			},
			checkoutemail : {
				required : "Introduce un nombre"
			}
		},
		highlight : function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
			//$(element).closest('.form-control').removeClass('form-control-success').addClass('form-control-danger');
		},
		success : function(element) {
			element.closest('.form-group').removeClass('has-danger').addClass('has-success');
			//element.closest('.form-control').removeClass('form-control-danger').addClass('form-control-success');
		}
	});

});

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
	$('#checkout-colony').find('option').remove().end().append('<option value=0>Choose Colony</option>').val('whatever');
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
										'<input class="custom-control-input" type="radio" id="'+cardData.shippingOptionId+'" name="shipping-method">',
										'<label class="custom-control-label" for="'+cardData.shippingOptionId+'"></label>',
										'</div>',
										'</td>',
										'<td class="align-middle">'+cardData.shippingOptionName+'</td>',
										'<td class="align-middle">'+cardData.shippingOptionDelivery+'</td>',
										'<td class="align-middle">$'+cardData.shippingOptionPrice+'</td>',
										'</tr>'];
	return $(cardShippingOptionsTemplate.join(''));           
                
}

function soloNumeros(e) {
	var key = window.Event ? e.which : e.keyCode;
	return ((key >= 48 && key <= 57) || (key == 8));
}