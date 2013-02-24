'use strict';

/* jasmine specs for controllers go here */
describe('MilkTea Controller', function () {

    beforeEach(module('milkteaServices'));

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

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

    describe('OrderNewCtrl', function () {
        var scope, orderNewCtrl, $controller, $httpBackend, today, $resource;

        beforeEach(inject(function ($rootScope, _$controller_, _$httpBackend_, _$resource_) {
            today = moment().format('YYYY-MM-DD');
            scope = $rootScope.$new();
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            $resource = _$resource_;

            $httpBackend.whenGET('/drinks.json').
                respond(drinks);

            $httpBackend.whenGET('/toppings.json').
                respond(toppings);

            $httpBackend.whenGET('/orders/' + today + '.json').
                respond({
                    orderDate:today,
                    lineItems:[]
                });

            orderNewCtrl = $controller(OrderNewCtrl, {$scope:scope});
        }));

        function createOrderAndSuccess(date) {
            var order = {
                order_date:date
            };
            $httpBackend.whenPOST('/orders.json', order).respond({"orderDate":date});
            $httpBackend.whenGET('/orders/' + date + '.json').respond({"orderDate":date});
        }

        function createOrderAndDuplicateOrderDate(date) {
            var order = {
                order_date:date
            };
            $httpBackend.whenPOST('/orders.json', order).respond(422 ,{"errors":{"orderDate":['Order date has already been taken.']}});
        }

        it('should show error when created order date already exist in the system', function () {
            createOrderAndDuplicateOrderDate(today);
            scope.create({"orderDate":today});
            $httpBackend.flush();
            expect(scope.orderErrorMessage).toBe('Order date has already been taken.');
            expect(scope.errorStyle).toBe('error');
        });

        it('should show created order when order is created', function () {
            createOrderAndSuccess(today);
            scope.create({"orderDate":today});
            expect(scope.isShowOrder).toBe(undefined);
            $httpBackend.flush();
            expect(scope.isShowOrder).toBe(true);
        });

        it('should reset error message and style when order can be created', function () {
            scope.errorStyle = 'error';
            scope.orderErrorMessage = 'Order date has already been taken.';
            createOrderAndSuccess(today);
            scope.create({"orderDate":today});
            $httpBackend.flush();
            expect(scope.errorStyle).toBe('');
            expect(scope.orderErrorMessage).toBe('');
        });

        it('should set $scope.lineItem.orderDate to the date of the created order when order is create for further further creation of line item', function () {
            var date = '2012-01-06';
            createOrderAndSuccess(date);
            scope.create({"orderDate":date});
            expect(scope.lineItem.orderDate).toBe(today);
            $httpBackend.flush();
            expect(scope.lineItem.orderDate).toBe(date);
        });

        it('should show order when there is an order of that specific date', function () {
            var date = '2012-01-06';
            $httpBackend.whenGET('/orders/' + date + '.json').
                respond({
                    orderDate:date,
                    lineItems:[]
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

        it('should set $scope.order.orderDate to the date which is no order for further creation', function () {
            var date = '2012-01-06';
            getOrderAndOrderNotFound(date);
            scope.showOrder(date);
            $httpBackend.flush();
            expect(scope.order.orderDate).toBe(date);
        });

        it('should calculate total price from line item', function () {
            var lineItem = {
                "id":1,
                "owner":"Eddy",
                "quantity":1,
                "sweetLevel":3,
                "totalPrice":0,
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
            };
            scope.calculateTotalPrice(lineItem);
            expect(scope.lineItem.totalPrice).toBe(40);
        });

        it('should not include toppings price if drink does not have toppings when calculate total price', function () {
            var lineItem = {
                "id":1,
                "owner":"Eddy",
                "quantity":1,
                "sweetLevel":3,
                "totalPrice":0,
                "drink":{
                    "id":1,
                    "name":"Milk Tea",
                    "price":30
                },
                "toppings":[]
            };
            scope.calculateTotalPrice(lineItem);
            expect(scope.lineItem.totalPrice).toBe(30);
        });

        it('should not include drink price if drink is not select when calculate total price', function () {
            var lineItem = {
                "id":1,
                "owner":"Eddy",
                "quantity":1,
                "sweetLevel":3,
                "totalPrice":0,
                "drink":undefined,
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
            };
            scope.calculateTotalPrice(lineItem);
            expect(scope.lineItem.totalPrice).toBe(10);
        });

        it('should multiply total price in line item with quantity', function () {
            var lineItem = {
                "id":1,
                "owner":"Eddy",
                "quantity":3,
                "sweetLevel":3,
                "totalPrice":0,
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
            };
            scope.calculateTotalPrice(lineItem);
            expect(scope.lineItem.totalPrice).toBe(120);
        });

        it('should reset topping combo box to default value when add new topping', function () {
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

        it('should reset topping combo box to default value after create new line item', function () {
            scope.topping = {
                "id":1,
                "name":"Bubble",
                "price":5
            };
            createLineItemAndSuccess(today);
            scope.createLineItem(scope.lineItem);
            $httpBackend.flush();
            expect(scope.topping).toBe('');
        });

        it('should reset drink combo box to default value after create new line item', function () {
            scope.drink = {
                "id":1,
                "name":"Milk Tea",
                "price":30
            };
            createLineItemAndSuccess(today);
            scope.createLineItem(scope.lineItem);
            $httpBackend.flush();
            expect(scope.drink).toBe('');
        });

        function createLineItemAndFail(date) {
            $httpBackend.whenPOST('/orders/' + date + '/line_items.json').respond(422, { "some key":"some error"});
        }

        it('should show error message sending from backend when cannot new create line item', function () {
            scope.isShowCreateLineItemErrors = false;
            createLineItemAndFail(today);
            scope.createLineItem(scope.lineItem);
            $httpBackend.flush();
            expect(scope.isShowCreateLineItemErrors).toBe(true);
        });

        it('should have transform request functionality (included in 1.1.2)', function () {
            var Person = $resource('/Person/:id', {}, {
                save: {
                    method: 'POST',
                    params: {id: '@id'},
                    transformRequest: function(data) {
                        return angular.toJson({ __id: data.id });
                    },
                    transformResponse: function(data) {
                        return { id: data.__id };
                    }
                }
            });

            $httpBackend.expect('POST', '/Person/123', { __id: 123 }).respond({ __id: 456 });
            var person = new Person({id:123});
            person.$save();
            $httpBackend.flush();
            expect(person.id).toEqual(456);
        });
    });

    describe('DrinkNewCtrl', function () {
        var scope, $controller, drinkNewCtrl, $httpBackend;

        var newDrink = {
                "name": 'new drink',
                "price": 50
        };

        beforeEach(inject(function ($rootScope, _$controller_, _$httpBackend_) {
            scope = $rootScope.$new();
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET('/drinks.json').
                respond(drinks);

            drinkNewCtrl = $controller(DrinkNewCtrl, {$scope:scope});
        }));

        it('should show all drinks', function () {
            expect(scope.drinks).toEqual([]);
            $httpBackend.flush();
            expect(scope.drinks).toEqualData(drinks);
        });

        function createDrinkAndSuccess (drink) {
            var respondDrink = angular.copy(drink);
            respondDrink.id = 1;
            $httpBackend.expectPOST('/drinks.json', drink).respond(200, respondDrink);
        }

        it('can create drink', function () {
            createDrinkAndSuccess(newDrink);
            scope.create(newDrink);
            $httpBackend.flush();
        });

        it('should update drink list after create drink', function () {
            $httpBackend.flush();
            createDrinkAndSuccess(newDrink);
            var drinksLengthBeforeCreate = scope.drinks.length;
            scope.create(newDrink);
            $httpBackend.flush();
            var drinksLengthAfterCreate = scope.drinks.length;
            expect(drinksLengthAfterCreate).toEqual(drinksLengthBeforeCreate+1);
            expect(scope.drinks[scope.drinks.length-1].name).toEqualData(newDrink.name);
        });

        it('should hide error after drink is created successfully', function () {
            $httpBackend.flush();
            createDrinkAndSuccess(newDrink);
            scope.create(newDrink);
            $httpBackend.flush();
            expect(scope.drink.error).toBeUndefined();
        });

        it('should reset drink model after drink is created successfully', function () {
            $httpBackend.flush();
            createDrinkAndSuccess(newDrink);
            scope.create(newDrink);
            $httpBackend.flush();
            expect(scope.drink).toEqual({});
        });

        function createDrinkAndFail (drink, errors) {
            $httpBackend.whenPOST('/drinks.json', drink).respond(422, errors);
        }

        it('should show drink error when creating drink already exist in the drink list', function () {
            var drinkErrors = {
                "errors": {
                    "name": ["has already been taken"]
                }
            };
            createDrinkAndFail(newDrink, drinkErrors);
            scope.create(newDrink);
            $httpBackend.flush();
            expect(scope.drink.errors.name).toEqual(drinkErrors.errors.name);
        });

        it('should show drink error when creating drink has invalid price format', function () {
            var drinkErrors = {
                "errors": {
                    "price": ["is not a number"]
                }
            };
            createDrinkAndFail(newDrink, drinkErrors);
            scope.create(newDrink);
            $httpBackend.flush();
            expect(scope.drink.errors.price).toEqual(drinkErrors.errors.price);
        });

        function deleteDrinkAndSuccess(drinkId) {
            $httpBackend.expectDELETE('/drinks/' + drinkId + '.json').respond(200);
        }

        var drinkId = 1;
        var drinksIndex = 0;

        it('can delete drink', function () {
            $httpBackend.flush();
            deleteDrinkAndSuccess(drinkId);
            scope.delete(drinksIndex);
            $httpBackend.flush();
        });

        it('should update drink list after delete drink', function () {
            $httpBackend.flush();
            deleteDrinkAndSuccess(drinkId);
            var drinksLengthBeforeDelete = scope.drinks.length;
            scope.delete(drinksIndex);
            $httpBackend.flush();
            var drinkLengthAfterDelete = scope.drinks.length;
            expect(drinkLengthAfterDelete).toEqual(drinksLengthBeforeDelete-1);
        });
    })
});
