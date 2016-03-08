var app = app || {};

app.AudioPlayerView = Backbone.View.extend({

  el: '#audio_player',

  events: {
    'click #play_pause_button': 'togglePause'
  },

  paused: false,

  initialize: function () {
    this.$playPauseButton = this.$('#play_pause_button');
  },

  togglePause: function (e) {
    var paused = this.paused = !this.paused;
    this.$playPauseButton.toggleClass('paused', paused);
  }

});