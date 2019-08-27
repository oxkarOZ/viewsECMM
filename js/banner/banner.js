var app = angular.module('myApp', []);
      app.controller('myCtrl', function($scope, $http) {
        $scope.nuevos = [1,2,3,4];        

        $http.get("http://127.0.0.1:8080/banner/all").then(function(response) {
                $scope.cuantos = response.data;
                var cont = 1;
                 angular.forEach($scope.cuantos, function(value, key) {
                //$scope.nuevos.push(cont);
                cont++;
              });

            });
      });


//function consultaProductosBanner(){	
	//$.ajax({
		//url:"http://127.0.0.1:8080/banner/all",
		//contentType:"application/json; charset=UTF-8",
		//type:"GET",
		//dataType:"json",
		//success:function(data){
			//return data;
		//},
		//error: function(){
			//return "error";
		//}
	//});
//}

