'use strict';

function OrderListCtrl($scope, Orders) {
	$scope.orders = Orders.index();
}

OrderListCtrl.$inject = ['$scope', 'Orders'];

function OrderNewCtrl($scope, Orders, Order, Drinks, Toppings, LineItems) {

    var today = moment().format('YYYY-MM-DD');

    $scope.drinks = Drinks.index();
    $scope.toppings = Toppings.index();

    $scope.defaultLineItem = function(date) {
        $scope.line_item = new LineItems({order_date: date, toppings: []});
        $scope.line_item.sweet_level = 3;
        $scope.line_item.quantity = 1;
    };

    $scope.defaultLineItem(today);

    $scope.showOrder = function(date) {
        $scope.order = Order.show({ order_date: date },
            function() {
                $scope.isShowOrder = true;
                $scope.line_item.order_date = date;
            },
            function() {
                $scope.isShowOrder = false;
                $scope.order.order_date = date;
                $scope.order.line_items = [];
            });
    }

    $scope.showOrder(today);

	$scope.create = function(order) {
		var o = new Orders(order);
		o.$create(
            function(order){
                $scope.showOrder(order.order_date);
                $scope.isShowOrder = true;
            },
			function(order){
				$scope.error_message_for_order = order.data.order_date[0];
				$scope.error_style = 'error';
			});
	}

    $scope.calculateTotalPrice = function(line_item) {
        var total_price = 0;
        if(angular.isDefined(line_item.drink)){
            total_price = total_price + line_item.drink.price;
        }
        angular.forEach(line_item.toppings, function(topping) {
            total_price = total_price + topping.price;
        });
        $scope.line_item.total_price = total_price*line_item.quantity;
    }

    $scope.addTopping = function(topping) {
        if(angular.isDefined(topping)) {
            $scope.line_item.toppings.push(topping);
        }
        $scope.calculateTotalPrice($scope.line_item);
        $scope.topping = '';
    }

    $scope.createLineItem = function(line_item) {
        var line_item_date = line_item.order_date;
        line_item.$create(
            function(created_line_item) {
                $scope.order.line_items.push(created_line_item);
                $scope.defaultLineItem(line_item_date);
                $scope.drink = '';
                $scope.topping = '';
            },
            function() {
                $scope.isShowCreateLineItemErrors = true;
            }
        );
    }
}

OrderNewCtrl.$inject = ['$scope', 'Orders', 'Order', 'Drinks', 'Toppings', 'LineItems'];