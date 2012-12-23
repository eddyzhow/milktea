'use strict';

function OrderListCtrl($scope, Orders) {
	$scope.orders = Orders.index();
}

OrderListCtrl.$inject = ['$scope', 'Orders'];

function OrderNewCtrl($rootScope, $scope, Orders, Order, Drinks, Toppings) {

    $scope.order = new Order();
    //$scope.order.order_date = moment().format('YYYY-MM-DD');
    $scope.order.order_date = '2012-09-19';

	$scope.create = function(order) {
		var o = new Orders(order);
		o.$create(function(){},
			function(order){
				$scope.error_message_for_order = order.data.order_date[0];
				$scope.error_style = 'error';
			});
	}

    $scope.drinks = Drinks.index();
    $scope.toppings = Toppings.index();
}

OrderNewCtrl.$inject = ['$rootScope', '$scope', 'Orders', 'Order', 'Drinks', 'Toppings'];