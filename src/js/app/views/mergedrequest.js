var app = app || {};

app.MergedRequestView = Backbone.View.extend({

  tagName: 'div',

  template: _.template($('#merged_request_template').html()),

  initialize: function () {
    this.$el.addClass('merged_request');
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
