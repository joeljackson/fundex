var app = angular.module('fundex', ["firebase"]);

app.directive(
  'funCalendar',
  function(memberService, weekService, funService){
    return {
      templateUrl: 'fun-calendar.html',
      restrict: 'A',
      controller: function() {
        this.members = memberService.members();
        this.weeks = weekService.weeks();
        this.funFor = funService.funs();
      },
      controllerAs: 'funController'
    }
  });

app.service('memberService', function(){
  this.members = function(){
    return ['Joel'];
  };

  return this;
});

app.service('weekService', function(){
  this.weeks = function(){
    return [1];
  };

  return this;
});

app.service('funService', function(memberService, weekService, $firebaseObject){
  this.funs = function(){
    var funDb = new Firebase("https://fundex.firebaseio.com");

    return _.object(_(memberService.members()).map(function(member){
             return [member, $firebaseObject(funDb.child('funAmounts').child(member))];
           }));
  }

  return this;
});