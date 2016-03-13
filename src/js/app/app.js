var app = app || {};

$(function () {
  app.appView = new app.AppView();
  Backbone.history.start();
});
