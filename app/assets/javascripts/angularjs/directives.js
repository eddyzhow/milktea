'use strict';

angular.module('milkteaDirectives', ['milkteaServices']).
	directive('datepicker', ['Order', function(Order) {
		return {
			restrict: 'A',
			link: function($scope, element, attrs, ctrl) {

				element.datepicker({
					format: 'yyyy-mm-dd'
				});

                element.datepicker('setValue', moment().format('YYYY-MM-DD'));

				element.on('changeDate', function(ev){
                    var order_date = moment(ev.date).format('YYYY-MM-DD');
					$scope.$apply(function(){
                        $scope.showOrder(order_date);
					});
				});
			}
		}
	}]);