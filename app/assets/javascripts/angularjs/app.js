'use strict';

angular.module('milktea', ['milkteaServices', 'milkteaDirectives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: 'partials/orders/index.html', controller: OrderListCtrl}).
    when('/orders/new', {templateUrl: 'partials/orders/new.html', controller: OrderNewCtrl}).
    when('/drinks/new', {templateUrl: 'partials/drinks/new.html', controller: DrinkNewCtrl}).
    when('/toppings/new', {templateUrl: 'partials/toppings/new.html', controller: ToppingNewCtrl}).
    otherwise({redirectTo: '/'});
}]);