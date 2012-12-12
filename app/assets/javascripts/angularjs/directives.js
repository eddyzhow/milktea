'use strict';

angular.module('milkteaDirectives', []).
	directive('datepicker', function() {
		return {
			restrict: 'A',
			link: function($scope, element, attrs, ctrl) {
				
				element.datepicker({
					format: 'yyyy-mm-dd'
				});

				element.text($scope.order.order_date);

				element.on('changeDate', function(ev){
					$scope.$apply(function(){
						$scope.order.order_date = moment(ev.date).format('YYYY-MM-DD');
					});
				});
			}	
		}
	});