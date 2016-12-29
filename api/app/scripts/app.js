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
    'calendarDemoApp',
    'ngTouch'
  ]);

app.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');


    $urlRouterProvider.otherwise('/');
    
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
     .state('calendar', {
        url: '/users/calendar',
        templateUrl: '/views/calendar/calendar.html',
        controller: 'uiCalendarCtrl'
      })
  })

app.service('popupService',['$window',function($window){
  this.showPopup=function(message){
    return $window.confirm(message); //Ask the users if they really want to delete
  };
}]);


////---------------------------- calendar --------------------------
var calendarmodule = angular.module('calendarDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);


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

