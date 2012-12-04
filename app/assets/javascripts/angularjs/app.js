angular.module('milktea', ['milkteaServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: 'partials/orders/index.html', controller: OrderListCtrl}).
    otherwise({redirectTo: '/'});
}]);