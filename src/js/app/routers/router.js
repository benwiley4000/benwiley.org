var app = app || {};

var PageSwapper = Backbone.Router.extend({
  routes: {
    '*page': 'swapPage'
  },

  swapPage: function (page) {
    if (page) {
      page = page.trim();
    }
    app.page = page || 'web';

    if (app.appView) {
      app.appView.trigger('pageswap');
    }
  }
});

app.pageRouter = new PageSwapper();
