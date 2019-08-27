$(function() {
	

	MELI.init({ client_id: '4294319271915940',
		baseURL: 'https://api.mercadolibre.com.mx'

    });

	MELI.login(function() {
	  MELI.get("/users/me", {}, function(data) {
	    alert("Hello " + data[2].first_name);
	  });
	});
});