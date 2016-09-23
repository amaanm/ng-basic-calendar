# ng-basic-calendar  

This is a very barebones calendar directive created for AngularJS 1.

## Installation  
You can do either
```
bower install ng-basic-calendar
```
or
```
npm install ng-basic-calendar
```
Then include the CSS files:
```html
<!-- Required for the layout of the calendar -->
<link rel="stylesheet" href="bower_components/ng-basic-calendar/src/ng-basic-calendar-layout.css">
<!-- Optional for some basic styling -->
<link rel="stylesheet" href="bower_components/ng-basic-calendar/src/ng-basic-calendar-theme.css">
```
And the Javascript file:
```html
<script src="bower_components/ng-basic-calendar/src/ng-basic-calendar.js"></script>
```
## Usage  
Include `basicCalendar` in your app's dependencies:  
```javascript
angular.module('myApp', ['basicCalendar']);
```
Add the directive to a page:  
```html
<basic-calendar
  start-week="start"
  end-week="end"
  events="events"
  select-event="selectEvent(event)">
</basic-calendar>
```
Example parameters:
```javascript
// For a calendar that goes from last week to 3 weeks from now:
$scope.today  = moment(new Date());
$scope.start  = $scope.today.clone().startOf('week').add(-1, 'weeks');
$scope.end    = $scope.today.clone().endOf('week').add(3, 'weeks');

// Sample events
$scope.events = [
  { start: moment(new Date()),                 title: 'Event 1' },
  { start: moment(new Date()).add(2, 'days'),  title: 'Event 2' },
  { start: moment(new Date()).add(-3, 'days'), title: 'Event 3' }
];
```
**Note:** When adding the `select-event` attribute to the calendar, you must use the parameter name `event` in order for your handler to receive the correct event object, like `yourHandler(event)`

## Attributes  
basic-calendar takes the following attributes:  
- `start-week` accepts a [MomentJS](http://momentjs.com/) object that specifies the starting week of the calendar.
- `end-week` accepts a [MomentJS](http://momentjs.com/) object that specifies the ending week of the calendar.
- `events` accepts an array of event objects. The properties for each event object are:  
    - `start` which should be a [MomentJS](http://momentjs.com/) object specifying what date the event occurs on (currently only single-day events are supported).
    - `title` which sets the displayed text in the calendar for that event.
    - `classes` is passed to the [ngClass](https://docs.angularjs.org/api/ng/directive/ngClass) directive for the event. Use this to customize your events.

## Todo
- Clean up tests
- Improve the calendar visually (month labels, day labels, etc.)

## Development  
1. Clone this repo  
2. `npm install` the dependencies
3. `npm test` to run the tests
4. `gulp serve` to serve the sample HTML page on http://localhost:3000  

## License  
The MIT License (MIT)  
Copyright (c) 2016 Amaan M

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
