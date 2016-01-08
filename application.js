var app = angular.module('fundex', []);

app.directive(
  'funCalendar',
  function(){
    return {
      templateUrl: 'fun-calendar.html',
      restrict: 'A',
      controller: function() {
        this.members = ['Joel'];
        this.weeks = ['Today'];

        this.funFor = function(developer, week) {
          return 7;
        }
      },
      controllerAs: 'fun'
    }
  });