'use strict';

angular.module('milkteaServices', ['ngResource']).
	factory('Orders', function($resource) {
        return $resource('/orders.json', {}, {
            index: { method: 'GET', isArray: true },
            create: { method: 'POST' }
        });
    }).
    factory('Order', function($resource) {
        return $resource('/orders/:order_date.json', { order_date: '@order_date' }, {
            show: { method: 'GET' }
        })
    }).
    factory('LineItems', function($resource) {
        return $resource('/orders/:order_date/line_items.json', {}, {
            index: { method: 'GET', isArray: true }
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
