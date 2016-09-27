angular.module('basicCalendar', [])
  .directive('basicCalendar', function() {

    return {
      restrict: 'E',
      scope: {
        startWeek: '=',
        endWeek: '=',
        events: '=',
        orderBy: '=',
        selectEvent:'&'
      },
      link: function(scope, elem, attrs){
        var days = [];
        scope.$watchCollection(attrs.events, function(){
          if(scope.startWeek && scope.endWeek){
            var start = scope.startWeek.clone().startOf('week');
            var end = scope.endWeek.clone().endOf('week');
            var today = moment(new Date());

            var wi = start.clone();

            days = [];
            while(wi.isBefore(end)){
              var day = {
                'date': wi.clone(),
                events: _.filter(scope.events, function(event){
                  return event.start.isSame(wi, 'day');
                })
              };

              if(wi.isSame(today, 'day')){
                day.isToday = true;
              }
              days.push(day);
              wi.add(1,'days');
            }

            var calendar = _.groupBy(days, function(el){
              return el.date.week();
            });

            scope.calendar = _.values(calendar);
          }
        });
      },
      template: '<div class="calendar">\
<div class="week" ng-repeat="week in calendar">\
<div class="day" ng-repeat="day in week">\
<span class="dayIndicator" ng-class="{\'today\': day.isToday}">\
{{ day.date | amDateFormat:\'D\'}}\
</span>\
<div class="dayEvents">\
<div class="event" ng-repeat="event in day.events | orderBy: orderBy" ng-class="event.classes" ng-click="$parent.selectEvent({event: event})">\
{{ event.title }}\
</div>\
</div>\
</div>\
</div>\
</div>\
      '
    };
  });
