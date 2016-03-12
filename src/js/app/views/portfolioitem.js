var app = app || {};

app.PortfolioItemView = Backbone.View.extend({

  tagName: 'div',

  template: _.template($('#portfolio_item_template').html()),

  gifPlaying: false,

  events: {
    'click .portfolio_item_image_container': 'toggleGif'
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

  toggleGif: function () {
    var shouldPlay = !this.gifPlaying;
    var src = 'img/' + (shouldPlay ? this.item.gif : this.item.jpg);
    this.$('.portfolio_item_image').attr('src', src);
    this.$('.portfolio_item_image_container').toggleClass('playing', shouldPlay);
    this.gifPlaying = shouldPlay;
  }

});
