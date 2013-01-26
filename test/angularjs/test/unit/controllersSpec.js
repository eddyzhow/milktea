'use strict';

/* jasmine specs for controllers go here */
describe('MilkTea Controller', function () {

    beforeEach(module('milkteaServices'));

    describe('OrderNewCtrl', function () {
        var scope, orderNewCtrl, $controller, $httpBackend, today;

        var drinks = [
            {
                "id":1,
                "name":"Milk Tea",
                "price":30
            },
            {
                "id":2,
                "name":"Black Tea",
                "price":25
            }
        ];

        var toppings = [
            {
                "id":1,
                "name":"Bubble",
                "price":5
            },
            {
                "id":2,
                "name":"Pudding",
                "price":5
            },
            {
                "id":3,
                "name":"Whip Cream",
                "price":5
            }
        ];

        beforeEach(inject(function ($rootScope, _$controller_, _$httpBackend_) {
            today = moment().format('YYYY-MM-DD');
            scope = $rootScope.$new();
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET('/drinks.json').
                respond(drinks);

            $httpBackend.whenGET('/toppings.json').
                respond(toppings);

            $httpBackend.whenGET('/orders/' + today + '.json').
                respond({
                    order_date:today,
                    line_items:[]
                });

            orderNewCtrl = $controller(OrderNewCtrl, {$scope: scope});
        }));

        it('should show order when there is an order of that specific date', function () {
            var date = '2012-01-06';
            $httpBackend.whenGET('/orders/' + date + '.json').
                respond({
                    order_date: date,
                    line_items: []
                });
            scope.showOrder(date);
            $httpBackend.flush();
            expect(scope.isShowOrder).toBe(true);
        });

        function getOrderAndOrderNotFound(date) {
            $httpBackend.whenGET('/orders/' + date + '.json').
                respond(404, { message:"Couldn't find Order with order_date = " + date });
        }

        it('should not show order when there is no order of that specific date', function () {
            var date = '2012-01-06';
            getOrderAndOrderNotFound(date);
            scope.showOrder(date);
            $httpBackend.flush();
            expect(scope.isShowOrder).toBe(false);
        });

        it('should set $scope.order.order_date to the date which is no order for further creation', function() {
            var date = '2012-01-06';
            getOrderAndOrderNotFound(date);
            scope.showOrder(date);
            $httpBackend.flush();
            expect(scope.order.order_date).toBe(date);
        });

        it('should calculate total price from line item', function() {
            var line_item = {
                "id":1,
                "owner":"Eddy",
                "quantity":1,
                "sweet_level":3,
                "total_price":0,
                "drink":{
                    "id":1,
                    "name":"Milk Tea",
                    "price":30
                },
                "toppings":[
                    {
                        "id":1,
                        "name":"Bubble",
                        "price":5
                    },
                    {
                        "id":2,
                        "name":"Pudding",
                        "price":5
                    }
                ]
            }
            scope.calculateTotalPrice(line_item);
            expect(scope.line_item.total_price).toBe(40);
        });

        it('should not include toppings price if drink does not have toppings when calculate total price', function() {
            var line_item = {
                "id":1,
                "owner":"Eddy",
                "quantity":1,
                "sweet_level":3,
                "total_price":0,
                "drink": {
                    "id":1,
                    "name":"Milk Tea",
                    "price":30
                },
                "toppings":[]
            }
            scope.calculateTotalPrice(line_item);
            expect(scope.line_item.total_price).toBe(30);
        });

        it('should not include drink price if drink is not select when calculate total price', function() {
            var line_item = {
                "id":1,
                "owner":"Eddy",
                "quantity":1,
                "sweet_level":3,
                "total_price":0,
                "drink": undefined,
                "toppings":[
                    {
                        "id":1,
                        "name":"Bubble",
                        "price":5
                    },
                    {
                        "id":2,
                        "name":"Pudding",
                        "price":5
                    }
                ]
            }
            scope.calculateTotalPrice(line_item);
            expect(scope.line_item.total_price).toBe(10);
        });

        it('should multiply total price in line item with quantity', function() {
            var line_item = {
                "id":1,
                "owner":"Eddy",
                "quantity":3,
                "sweet_level":3,
                "total_price":0,
                "drink":{
                    "id":1,
                    "name":"Milk Tea",
                    "price":30
                },
                "toppings":[
                    {
                        "id":1,
                        "name":"Bubble",
                        "price":5
                    },
                    {
                        "id":2,
                        "name":"Pudding",
                        "price":5
                    }
                ]
            }
            scope.calculateTotalPrice(line_item);
            expect(scope.line_item.total_price).toBe(120);
        });

        it('should reset topping combo box to default value when add new topping', function() {
           scope.topping = {
               "id":1,
               "name":"Bubble",
               "price":5
           };
           scope.addTopping(scope.topping);
           expect(scope.topping).toBe('');
        });

        function createLineItemAndSuccess(date) {
            $httpBackend.whenPOST('/orders/' + date + '/line_items.json').respond({});
        }

        it('should reset topping combo box to default value after create new line item', function() {
            scope.topping = {
                "id":1,
                "name":"Bubble",
                "price":5
            };
            createLineItemAndSuccess(today);
            scope.createLineItem(scope.line_item);
            $httpBackend.flush();
            expect(scope.topping).toBe('');
        });

        it('should reset drink combo box to default value after create new line item', function() {
            scope.drink = {
                "id":1,
                "name":"Milk Tea",
                "price":30
            };
            createLineItemAndSuccess(today);
            scope.createLineItem(scope.line_item);
            $httpBackend.flush();
            expect(scope.drink).toBe('');
        });

        function createLineItemAndFail(date) {
            $httpBackend.whenPOST('/orders/' + date + '/line_items.json').respond(404, { "some key": "some error"});
        }

        it('should show error message sending from backend when cannot new create line item', function() {
            scope.isShowCreateLineItemErrors = false;
            createLineItemAndFail(today);
            scope.createLineItem(scope.line_item);
            $httpBackend.flush();
            expect(scope.isShowCreateLineItemErrors).toBe(true);
        });
    })
})
