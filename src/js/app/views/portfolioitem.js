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

    /* the same media breakpoint used in the CSS to determine
     * whether we should display our "mobile view."
     */
    this.mediaQuery = window.matchMedia ? window.matchMedia("(max-width: 549px)") : {};

    // preload gif
    new Image().src = 'img/' + item.gif;

    /* enforce gif if appropriate on window resize, but wait
     * 200 milliseconds to avoid pounding the processor.
     */
    var resizeTimeout = null;
    $(window).resize(function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(this.enforceGifIfAppropriate.bind(this), 200);
    }.bind(this));
  },

  render: function () {
    this.$el.html(this.template(this.item));
    this.enforceGifIfAppropriate();
    return this;
  },

  enforceGifIfAppropriate: function () {
    /* "hovering" isn't much of a thing on mobile,
     * and images won't be horizontally stacked anyway
     * when the screen is this small, so let's just
     * always display the gif.
     */
    if (this.mediaQuery.matches) {
      return this.useGif();
    }
    /* it's safe to assume we can enforce jpg
     * if the media query doesn't match, since the
     * mouse will practically never be hovering above
     * an image when the window finishes resizing
     * (it's probably busy resizing the window).
     */
    this.useJpg();
  },

  useGif: function (e) {
    var target = (e && e.target) || this.$('.portfolio_item_image').get(0);
    target.src = 'img/' + this.item.gif;
  },

  useJpg: function (e) {
    if (this.mediaQuery.matches) {
      return;
    }
    var target = (e && e.target) || this.$('.portfolio_item_image').get(0);
    target.src = 'img/' + this.item.jpg;
  }

});
