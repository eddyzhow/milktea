'use strict';

function OrderListCtrl($scope, Orders) {
	$scope.orders = Orders.index();
}

OrderListCtrl.$inject = ['$scope', 'Orders'];

function OrderNewCtrl($rootScope, $scope, Orders){

	$scope.order = {
		order_date: moment().format('YYYY-MM-DD'),
		line_items: []
	};

	$scope.create = function(order) {
		console.log(order);
		var o = new Orders(order);
		o.$create(function(){},
			function(order){
				$scope.error_message_for_order = order.data.order_date[0];
				$scope.error_style = 'error';
			});
	}
}

OrderNewCtrl.$inject = ['$rootScope', '$scope', 'Orders'];