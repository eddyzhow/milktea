function OrdersCtrl($scope, $http) {
	$http.get('/orders.json').success(function(data) {
		$scope.orders = data;
	});
}