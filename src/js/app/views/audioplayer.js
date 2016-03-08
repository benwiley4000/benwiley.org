var app = app || {};

app.AudioPlayerView = Backbone.View.extend({

  el: '#audio_player',

  events: {
    'click #play_pause_button': 'togglePause',
    'click #skip_button': 'skipToNextTrack'
  },

  audioFiles: [
    'marty_mcpaper_theme.mp3',
    'in_the_hall_of_the_mountain_king.mp3',
    'secret_of_trash_island.mp3'
  ],

  currentAudioFileIndex: 0,

  paused: true,

  initialize: function () {
    this.$playPauseButton = this.$('#play_pause_button');
    this.$progressBar = this.$('#audio_progress');

    var audio = this.audio = $('<audio><source/></audio>').get(0);
    audio.addEventListener('ended', this.skipToNextTrack.bind(this));
    audio.addEventListener('timeupdate', this.updateProgressBar.bind(this));
    this.updateSource();

    this.on('togglepause', this, 'togglePause');
  },

  togglePause: function (value) {
    var paused = this.paused = typeof value === 'boolean' ? value : !this.paused;
    paused ? this.audio.pause() : this.audio.play();
    this.$playPauseButton.toggleClass('paused', paused);
  },

  skipToNextTrack: function () {
    this.audio.pause();
    var i = ++this.currentAudioFileIndex;
    if (i >= this.audioFiles.length) {
      this.currentAudioFileIndex = 0;
    }
    this.updateSource();
    this.togglePause(false);
  },

  updateSource: function () {
    this.audio.src = this.getCurrentAudioFilePath();
  },

  getCurrentAudioFilePath: function () {
    return './audio/' + this.audioFiles[this.currentAudioFileIndex];
  },

  updateProgressBar: function () {
    var currentTime = this.audio.currentTime;
    var duration = this.audio.duration;
    this.$progressBar.width((100 * currentTime / duration) + '%');
  }

});
