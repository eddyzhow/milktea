'use strict';

angular.module('milkteaServices', ['ngResource']).
	factory('Orders', function($resource) {
        return $resource('/orders.json', {}, {
            index: { method: 'GET', isArray: true },
            create: {
                method: 'POST',
                transformRequest: function(data) {
                    return angular.toJson({
                        order_date:data.orderDate,
                        line_items:data.lineItems
                    });
                }
            }
        });
    }).
    factory('Order', function($resource) {
        return $resource('/orders/:orderDate.json', {}, {
            show: { method: 'GET' }
        })
    }).
    factory('LineItems', function($resource) {
        return $resource('/orders/:orderDate/line_items.json', {orderDate: '@orderDate'}, {
            index: { method: 'GET', isArray: true },
            create: {
                method: 'POST',
                transformRequest: function(data) {
                    return angular.toJson({
                        drink:data.drink,
                        toppings:data.toppings,
                        order_date:data.orderDate,
                        sweet_level:data.sweetLevel,
                        total_price:data.totalPrice,
                        quantity:data.quantity,
                        owner:data.owner
                    });
                }
            }
        });
    }).
    factory('Drinks', function($resource) {
        return $resource('/drinks.json', {}, {
            index: { method: 'GET', isArray: true }
        })
    }).
    factory('Toppings', function($resource) {
        return $resource('/toppings.json', {}, {
            index: { method: 'GET', isArray: true }
        })
    });
