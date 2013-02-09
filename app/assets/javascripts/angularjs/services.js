'use strict';

angular.module('milkteaServices', ['ngResource']).
	factory('Orders', function($resource) {
        /*
        return $resource('/orders.json', {}, {
            index: { method: 'GET', isArray: true },
            create: { method: 'POST' }
        });
        */

        var resource = $resource('/orders.json');

        resource.prototype.$index = function(data, success, error) {
            resource.order_date = resource.orderDate;
            console.log(resource.orderDate);
            //resource.line_items = resource.lineItems;
            return resource.query(data, success, error);
        }

        resource.prototype.$create = function(data, success, error) {
            resource.order_date = resource.orderDate;
            console.log(resource.order);
            //resource.line_items = resource.lineItems;
            return resource.save(data, success, error);
        }

        return resource;
    }).
    factory('Order', function($resource) {
        return $resource('/orders/:orderDate.json', {}, {
            show: { method: 'GET' }
        })
    }).
    factory('LineItems', function($resource) {
        return $resource('/orders/:orderDate/line_items.json', {orderDate: '@orderDate'}, {
            index: { method: 'GET', isArray: true },
            create: { method: 'POST' }
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
