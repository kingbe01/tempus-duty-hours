'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
var app = angular.module('tempusApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'users',
    'ui.calendar',
    'ui.bootstrap',
    'calendarDemoApp',
    'shifts',
    'ngTouch'
  ]);

app.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');


    //$urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
     .state('users', {
        url: '/users',
        templateUrl: '/views/users/users.html',
        controller: 'UserCtrl'
      })
     .state('editUser', {
        url: '/users/:id/edit',
        templateUrl: '/views/users/users-edit.html',
        controller: 'UserEditCtrl'
      })
     .state('viewUser', {
        url: '/users/:id/view',
        templateUrl: '/views/users/users-view.html',
        controller: 'UserViewCtrl'
      })
     .state('newUser', {
        url: '/users/new',
        templateUrl: '/views/users/users-new.html',
        controller: 'UserNewCtrl'
      })
     .state('calendar', {
        url: '/calendars/calendar',
        templateUrl: '/views/calendar/calendar.html',
        controller: 'uiCalendarCtrl'
      })
     .state('shifts', {
        url: '/shifts',
        templateUrl: '/views/shifts/shifts.html',
        controller: 'ShiftCtrl'
      })
     .state('editShift', {
        url: '/shifts/:id/edit',
        templateUrl: '/views/shifts/shifts-edit.html',
        controller: 'ShiftEditCtrl'
      })
     .state('viewShift', {
        url: '/shifts/:id/view',
        templateUrl: '/views/shifts/shifts-view.html',
        controller: 'ShiftViewCtrl'
      })
     .state('newShift', {
        url: '/shifts/new',
        templateUrl: '/views/shifts/shifts-new.html',
        controller: 'ShiftNewCtrl'
      })
  })

app.service('popupService',['$window',function($window){
  this.showPopup=function(message){
    return $window.confirm(message); //Ask the users if they really want to delete
  };
}]);


////-----------------------------  users  ---------------------------
var usermodule = angular.module('users', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);

usermodule.factory('User', ['$resource', function($resource) {
   return $resource('/api/users/:id', { id: '@id' }, {
    update: {
      method: 'PUT', responseType: 'json' // this method issues a PUT request
      }, 
      delete: { 
        method: 'DELETE' 
      }
    });
}]);

////-----------------------------  shifts  ---------------------------
var shiftmodule = angular.module('shifts', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);

shiftmodule.factory('Shift', ['$resource', function($resource) {
   var shift = $resource('/api/shifts/:id', { id: '@id' }, {
    query: {method: 'get', isArray: true, cancellable: true},
    update: {
      method: 'PUT', responseType: 'json' // this method issues a PUT request
      }, 
      delete: { 
        method: 'DELETE' 
      }
    });
   shift.prototype.hasTime = function() {
    return true;
   }
   return shift;
}]);


////-----------------------------  calendar  ---------------------------
var calendarmodule = angular.module('calendarDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);



