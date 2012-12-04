function OrderListCtrl($scope, Orders) {
	$scope.orders = Orders.index();
}

OrderListCtrl.$inject = ['$scope','Orders']