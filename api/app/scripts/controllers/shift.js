
'use strict';

angular
  .module('shifts')
  .controller('ShiftCtrl', ['$scope', 'Shift','$stateParams', function ($scope, Shift, uibDateParser) {
    $scope.shifts = Shift.query();
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term\
    
      
    }]).controller('ShiftViewCtrl', function($scope, $stateParams, Shift) {
      $scope.shift = Shift.get({ id: $stateParams.id }); //Get a single shift.Issues a GET to /api/shifts/:id
    }).controller('ShiftNewCtrl', function($scope, $state, $stateParams, Shift) {
      $scope.shift = new Shift();  //create new shift instance. Properties will be set via ng-model on UI

      $scope.addShift = function() { //create a new shift. Issues a POST to /api/shifts
        $scope.shift.$save(function() {
          $state.go('shifts'); // on success go back to home i.e. shifts state.
        });
      };
    }).controller('ShiftEditCtrl', function($scope, $state, $stateParams, popupService, $window, Shift) {
        $scope.shift = Shift.get({ id: $stateParams.id }); //Get a single shift.Issues a GET to /api/shifts/:id
        $scope.updateShift = function() { //Update the edited shift. Issues a PUT to /api/shifts/:id
          console.log('update shift');
          $scope.shift.$update(function() {
            $state.go('shifts'); // on success go back to home i.e. shifts state.
          });
        };

        $scope.deleteShift = function(Shift) { 
          console.log('delete record');// Delete a shift. Issues a DELETE to /api/shifts/:id
          if (popupService.showPopup('Really delete this?')) {
            $scope.shift.$delete(function() {
              $window.shift.href = '#/shifts'; //redirect to home
            });
          }
        }

      $scope.loadShift = function() { //Issues a GET request to /api/shifts/:id to get a shift to update
        console.log({id: $stateParams.id });
        $scope.shift = Shift.get({ id: $stateParams.id });
      }

      $scope.loadShift();

    }).controller('DatepickerPopupCtrl', function ($scope) {
      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      }
    });
