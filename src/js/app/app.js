var app = app || {};
var SPACE_BAR = 32;

$(function () {
  app.appView = new app.AppView();
  Backbone.history.start();
});
