
function cargaProductos(){
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/product/all',
		success: function(respuesta) {
			console.log(respuesta);
		},
		error: function() {
	        console.log("No se ha podido obtener la información");
	    }
	});
}
