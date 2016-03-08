var app = app || {};

app.AudioPlayerView = Backbone.View.extend({

  el: '#audio_player',

  events: {
    'click #play_pause_button': 'togglePause',
    'click #skip_button': 'skipToNextTrack'
  },

  tracks: [
    {
      title: 'Marty McPaper\'s Epic Delivery Service',
      file: 'marty_mcpaper_theme.mp3'
    }, {
      title: 'In the Hall of the Mountain King',
      file: 'in_the_hall_of_the_mountain_king.mp3'
    }, {
      title: 'The Secret of Trash Island',
      file: 'secret_of_trash_island.mp3'
    }
  ],

  currentTrackIndex: 0,

  paused: true,

  initialize: function () {
    this.$playPauseButton = this.$('#play_pause_button');
    this.$progressBar = this.$('#audio_progress');
    this.$timeProgress = this.$('#audio_time_progress');
    this.$infoBox = this.$('#audio_info');

    var audio = this.audio = $('<audio preload="metadata"><source/></audio>').get(0);
    audio.addEventListener('ended', this.skipToNextTrack.bind(this));
    audio.addEventListener('timeupdate', this.renderProgressBar.bind(this));
    audio.addEventListener('loadedmetadata', function () {
      this.renderTrackTitle();
      this.renderTimeProgress();
    }.bind(this));
    this.updateSource();
  },

  togglePause: function (value) {
    var paused = this.paused = typeof value === 'boolean' ? value : !this.paused;
    paused ? this.audio.pause() : this.audio.play();
    this.$playPauseButton.toggleClass('paused', paused);
  },

  skipToNextTrack: function () {
    this.audio.pause();
    var i = ++this.currentTrackIndex;
    if (i >= this.tracks.length) {
      this.currentTrackIndex = 0;
    }
    this.updateSource();
    this.togglePause(false);
  },

  updateSource: function () {
    this.audio.src = this.getCurrentAudioFilePath();
  },

  getCurrentTrackTitle: function () {
    return this.tracks[this.currentTrackIndex].title;
  },

  getCurrentAudioFilePath: function () {
    return './audio/' + this.tracks[this.currentTrackIndex].file;
  },

  renderProgressBar: function () {
    var currentTime = this.audio.currentTime;
    var duration = this.audio.duration;
    this.$progressBar.width((100 * currentTime / duration) + '%');
    this.renderTimeProgress();
  },

  renderTimeProgress: function () {
    var currentTime = this.audio.currentTime || 0;
    var duration = this.audio.duration || 0;
    this.$timeProgress.text(currentTime.toTime() + ' / ' + duration.toTime());
  },

  renderTrackTitle: function () {
    var title = 'Ben Wiley - ' + this.getCurrentTrackTitle();
    this.$el.attr('title', title);
    this.$infoBox.text(title);
  }

});
