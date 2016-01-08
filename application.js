var app = angular.module('fundex', []);

app.directive(
  'funCalendar',
  function(){
    return {
      templateUrl: 'fun-calendar.html',
      restrict: 'A',
      controller: function() {
        this.members = ['Joel'];
        this.weeks = [1];

        this.funFor = [0,7];
//        this.funFor = function(developer, week) {
//          return 7;
//        }
      },
      controllerAs: 'funController'
    }
  });