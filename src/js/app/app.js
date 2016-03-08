var app = app || {};
var SPACE_BAR = 32;

// source: http://goo.gl/kEvnKn
Number.prototype.toTime = function () {
  var mins = Math.floor(this / 60);
  var secs = (this % 60).toFixed();
  return (mins < 10 ? "0" : "" ) + mins + ":" + (secs < 10 ? "0" : "" ) + secs;
};

$(function () {
  app.appView = new app.AppView();
  Backbone.history.start();
});
