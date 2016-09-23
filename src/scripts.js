var app = angular.module('calendarApp', ['angularMoment', 'basicCalendar']);

app.controller('CalendarCtrl', function($scope){
  $scope.today = moment(new Date());
  $scope.start = $scope.today.clone().startOf('week').add(-1, 'weeks');
  $scope.end = $scope.today.clone().endOf('week').add(3, 'weeks');

  $scope.events = [
    {start: moment(new Date()), title: 'Event 1'},
    {start: moment(new Date()), title: 'Event 10'},
    {start: moment(new Date()), title: 'Event 11'},
    {start: moment(new Date()), title: 'Event 12'},
    {start: moment(new Date()).add(2, 'days'), title: 'Event 2'},
    {start: moment(new Date()).add(-3, 'days'), title: 'Event 3'},
    {start: moment(new Date()).add(4, 'days'), title: 'Event 4'},
    {start: moment(new Date()).add(-5, 'days'), title: 'Event 5'},
    {start: moment(new Date()).add(6, 'days'), title: 'Event 6'},
    {start: moment(new Date()).add(7, 'days'), title: 'Event 7'},
    {start: moment(new Date()).add(8, 'days'), title: 'Event 8'},
    {start: moment(new Date()).add(9, 'days'), title: 'Event 9 🐵', classes: ['fake', 'test']}
  ];

  $scope.selectEvent = function(event){
    $scope.selectedEvent = ($scope.selectedEvent === event) ? null : event;
  };
});
