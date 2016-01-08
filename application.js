var app = angular.module('fundex', ["firebase"]);

app.directive(
  'funCalendar',
  function(memberService, weekService, funService){
    return {
      templateUrl: 'fun-calendar.html',
      restrict: 'A',
      controller: function() {
        var _this = this;
        this.members = function(){
          return memberService.members(_this.funFor);
        }
        this.weeks = weekService.weeks();
        this.funFor = funService.funs();
        this.funForMember = funService.funForMember;
      },
      controllerAs: 'funController'
    }
  });

app.service('memberService', function($firebaseObject){
  this.members = function(funFor){
    return _(_(funFor).keys()).reject(function(name){
              return name && name[0] == '$'
              });
  };

  return this;
});

app.service('weekService', function(){
  this.weeks = function(){
    return [1 ];
  };

  return this;
});

app.service('funService', function(memberService, weekService, $firebaseObject){
  this.funs = function(){
    var funDb = new Firebase("https://fundex.firebaseio.com");
    return $firebaseObject(funDb.child('funAmounts'));
  }

  return this;
});