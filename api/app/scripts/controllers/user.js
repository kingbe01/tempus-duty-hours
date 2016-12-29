
'use strict';

angular
  .module('users')
  .controller('UserCtrl', ['$scope', 'User','$stateParams', function ($scope, User) {
    $scope.users = User.query();
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term\
    
      
    }]).controller('UserViewCtrl', function($scope, $stateParams, User) {
      $scope.user = User.get({ id: $stateParams.id }); //Get a single user.Issues a GET to /api/users/:id
    }).controller('UserNewCtrl', function($scope, $state, $stateParams, User) {
      $scope.user = new User();  //create new user instance. Properties will be set via ng-model on UI

      $scope.addUser = function() { //create a new user. Issues a POST to /api/users
        $scope.user.$save(function() {
          $state.go('users'); // on success go back to home i.e. users state.
        });
      };
    }).controller('UserEditCtrl', function($scope, $state, $stateParams, popupService, $window, User) {
        $scope.user = User.get({ id: $stateParams.id }); //Get a single user.Issues a GET to /api/users/:id
        $scope.updateUser = function() { //Update the edited user. Issues a PUT to /api/users/:id
          console.log('update user');
          $scope.user.$update(function() {
            $state.go('users'); // on success go back to home i.e. users state.
          });
        };

        $scope.deleteUser = function(User) { 
          console.log('delete record');// Delete a user. Issues a DELETE to /api/users/:id
          if (popupService.showPopup('Really delete this?')) {
            $scope.user.$delete(function() {
              $window.user.href = '#/users'; //redirect to home
            });
          }
    };

      $scope.loadUser = function() { //Issues a GET request to /api/users/:id to get a user to update
        console.log({id: $stateParams.id });
        $scope.user = User.get({ id: $stateParams.id });
      };

      $scope.loadUser();

    })
