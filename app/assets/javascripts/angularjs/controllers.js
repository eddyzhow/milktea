'use strict';

function OrderListCtrl($scope, Orders) {
    $scope.orders = Orders.index();
}

OrderListCtrl.$inject = ['$scope', 'Orders'];

function OrderNewCtrl($scope, Orders, Order, Drinks, Toppings, LineItems) {

    var today = moment().format('YYYY-MM-DD');

    $scope.drinks = Drinks.index();
    $scope.toppings = Toppings.index();

    $scope.defaultLineItem = function (date) {
        $scope.lineItem = new LineItems({orderDate:date, toppings:[]});
        $scope.lineItem.sweetLevel = 3;
        $scope.lineItem.quantity = 1;
    };

    $scope.defaultLineItem(today);

    $scope.showOrder = function (date) {
        $scope.order = Order.show({ orderDate:date },
            function () {
                $scope.isShowOrder = true;
                $scope.lineItem.orderDate = date;
            },
            function () {
                $scope.isShowOrder = false;
                $scope.order.orderDate = date;
                $scope.order.lineItems = [];
            });
    }

    $scope.showOrder(today);

    $scope.create = function (order) {
        var o = new Orders(order);
        o.$create(
            function (order) {
                $scope.showOrder(order.orderDate);
                $scope.orderErrorMessage = '';
                $scope.errorStyle = '';
            },
            function (errors) {
                $scope.orderErrorMessage = errors.data.errors.orderDate[0];
                $scope.errorStyle = 'error';
            });
    }

    $scope.calculateTotalPrice = function (lineItem) {
        var totalPrice = 0;
        if (angular.isDefined(lineItem.drink)) {
            totalPrice = totalPrice + lineItem.drink.price;
        }
        angular.forEach(lineItem.toppings, function (topping) {
            totalPrice = totalPrice + topping.price;
        });
        $scope.lineItem.totalPrice = totalPrice * lineItem.quantity;
    }

    $scope.addTopping = function (topping) {
        if (angular.isDefined(topping)) {
            $scope.lineItem.toppings.push(topping);
        }
        $scope.calculateTotalPrice($scope.lineItem);
        $scope.topping = '';
    }

    $scope.createLineItem = function (lineItem) {
        var lineItemDate = lineItem.orderDate;
        lineItem.$create(
            function (createdLineItem) {
                $scope.order.lineItems.push(createdLineItem);
                $scope.defaultLineItem(lineItemDate);
                $scope.drink = '';
                $scope.topping = '';
            },
            function (errors) {
                $scope.lineItem.errors = errors.data.errors;
            }
        );
    }
}

OrderNewCtrl.$inject = ['$scope', 'Orders', 'Order', 'Drinks', 'Toppings', 'LineItems'];

function DrinkNewCtrl($scope, Drinks, Drink) {
    $scope.drinks = Drinks.index();
    $scope.drink = {};
    $scope.create = function (drink) {
        var d = new Drinks(drink);
        d.$create(
            function(createdDrink) {
                $scope.drink = {};
                $scope.drinks.push(createdDrink);
            },
            function(errors) {
                $scope.drink.errors = errors.data.errors;
            }
        );
    };

    $scope.delete = function (drinksIndex) {
        var drinkId = $scope.drinks[drinksIndex].id;
        Drink.delete({id: drinkId}, function () {
            $scope.drinks.splice(drinksIndex,1);
        });
    }
}

DrinkNewCtrl.$inject = ['$scope', 'Drinks', 'Drink'];

function ToppingNewCtrl($scope, Toppings, Topping) {
    $scope.toppings = Toppings.index();
    $scope.topping = {};
    $scope.create = function (topping) {
        var t = new Toppings(topping);
        t.$create(
            function(createdTopping) {
                $scope.topping = {};
                $scope.toppings.push(createdTopping);
            },
            function(errors) {
                $scope.topping.errors = errors.data.errors;
            }
        );
    };

    $scope.delete = function (toppingsIndex) {
        var toppingId = $scope.toppings[toppingsIndex].id;
        Topping.delete({id: toppingId}, function () {
            $scope.toppings.splice(toppingsIndex,1);
        });
    }
}

ToppingNewCtrl.$inject = ['$scope', 'Toppings', 'Topping'];