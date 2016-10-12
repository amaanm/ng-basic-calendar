describe('ngBasicCalendar', function () {
  var $compile,
      $rootScope;

  beforeEach(module('angularMoment'));
  beforeEach(module('basicCalendar'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should not create elements without start & end parameters', function () {
    var elt = angular.element('<basic-calendar></basic-calendar>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    expect(elt.html().trim()).toBe('<div class="calendar"><!-- ngRepeat: week in calendar --></div>');
  });

  it('should generate a single week', function () {
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    var elt = $compile('<basic-calendar start-week="start" end-week="end"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var weeks = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('week');});
    expect(weeks.length).toEqual(1);

    var days = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('day');});
    expect(days.length).toEqual(7);
  });

  it('should generate 3 weeks', function () {
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD').add(2, 'weeks');
    var elt = $compile('<basic-calendar start-week="start" end-week="end"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var weeks = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('week');});
    expect(weeks.length).toEqual(3);

    var days = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('day');});
    expect(days.length).toEqual(21);
  });

  it('should display the correct dates', function () {
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    var correctDates = [27, 28, 29, 30, 31, 1, 2]; // dates from sunday-saturday of the week of Jan 1, 2016

    var elt = $compile('<basic-calendar start-week="start" end-week="end"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var labels = _.values(elt.find('span')).filter(function(el){return angular.element(el).hasClass('dayIndicator');});
    expect(labels.length).toEqual(7);

    var dates = _.map(labels, function(el){ return angular.element(el).html(); });
    expect(dates.join(',')).toEqual(correctDates.join(','));
  });

  it('should display an event with the correct number of events with correct title', function () {
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.events = [
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'New Year\'s Day'}
    ];

    var elt = $compile('<basic-calendar start-week="start" end-week="end" events="events"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var events = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('event');});
    expect(events.length).toEqual(1);
    expect(angular.element(events[0]).html()).toEqual('New Year\'s Day');
  });

  it('should put events on the right day', function () {
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.events = [
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'New Year\'s Day'}
    ];

    var elt = $compile('<basic-calendar start-week="start" end-week="end" events="events"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var calendar = elt.isolateScope().calendar;
    var week = calendar[0];
    var newYearsDay = _.find(week, function(el){
      return el.date.format('YYYY-MM-DD') == '2016-01-01';
    });

    expect(newYearsDay.events.length).toEqual(1);
    expect(newYearsDay.events[0]).toBe($rootScope.events[0]);
  });

  it('should call click handler', function () {
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.events = [
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'New Year\'s Day'}
    ];

    var fn = jasmine.createSpy();
    $rootScope.testHandler = fn;

    var elt = $compile('<basic-calendar start-week="start" end-week="end" events="events" select-event="testHandler(event)"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var events = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('event');});

    angular.element(events[0]).triggerHandler('click');
    expect($rootScope.testHandler).toHaveBeenCalled();
  });

  it('should call click handler with correct event', function () {
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.events = [
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'New Year\'s Day'}
    ];

    var fn = jasmine.createSpy();
    $rootScope.testHandler = fn;

    var elt = $compile('<basic-calendar start-week="start" end-week="end" events="events" select-event="testHandler(event)"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var events = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('event');});

    angular.element(events[0]).triggerHandler('click');
    expect($rootScope.testHandler).toHaveBeenCalledWith($rootScope.events[0]);
  });

  it('should order elements correctly', function(){
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.orderBy = 'title';
    $rootScope.events = [
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'New Year\'s Day'},
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'First day of the year'}
    ];

    var elt = $compile('<basic-calendar start-week="start" end-week="end" events="events" order-by="orderBy"></basic-calendar>')($rootScope);
    $rootScope.$digest();

    var events = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('event');});
    expect(angular.element(events[0]).html()).toEqual('First day of the year');

    $rootScope.orderBy = '-title';
    $rootScope.$digest();

    var events = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('event');});
    expect(angular.element(events[0]).html()).toEqual('New Year\'s Day');
  });

  it('should apply the provided string filter', function(){
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.events = [
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'New Year\'s Day'},
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'First day of the year'}
    ];

    var elt = $compile('<basic-calendar start-week="start" end-week="end" events="events" filter="toFilter"></basic-calendar>')($rootScope);
    $rootScope.toFilter = 'First';
    $rootScope.$digest();

    var events = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('event');});
    expect(angular.element(events[0]).html()).toEqual('First day of the year');
  });

  it('should apply the provided function filter', function(){
    $rootScope.start = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.end   = moment('2016-01-01', 'YYYY-MM-DD');
    $rootScope.events = [
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'New Year\'s Day'},
      {start: moment('2016-01-01', 'YYYY-MM-DD'), title: 'First day of the year'}
    ];

    var elt = $compile('<basic-calendar start-week="start" end-week="end" events="events" filter="toFilter"></basic-calendar>')($rootScope);
    $rootScope.toFilter = function(el){
      return el.title === 'First day of the year';
    };
    $rootScope.$digest();

    var events = _.values(elt.find('div')).filter(function(el){return angular.element(el).hasClass('event');});
    expect(angular.element(events[0]).html()).toEqual('First day of the year');
  });

});
