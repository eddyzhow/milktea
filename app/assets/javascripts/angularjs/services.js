'use strict';

angular.module('milkteaServices', ['ngResource']).
		factory('Orders', function($resource){
	return $resource('/orders.json', {}, {
		index: { method: 'GET', isArray: true },
		create: { method: 'POST' }
	});
});
