var app = app || {};

app.PortfolioItemView = Backbone.View.extend({

  tagName: 'div',

  template: _.template($('#portfolio_item_template').html()),

  events: {
    'mouseenter .portfolio_item_image': 'useGif',
    'mouseleave .portfolio_item_image': 'useJpg'
  },

  initialize: function (item) {
    this.item = item;
    this.$el.addClass('portfolio_item collapsible collapsed');
    // preload gif
    new Image().src = 'img/' + item.gif;
  },

  render: function () {
    this.$el.html(this.template(this.item));
    return this;
  },

  useGif: function (e) {
    e.target.src = 'img/' + this.item.gif;
  },

  useJpg: function (e) {
    e.target.src = 'img/' + this.item.jpg;
  }

});
