var app = app || {};
var data = data || {};

app.AudioPlayerView = Backbone.View.extend({

  el: '#audio_player',

  events: {
    'click #play_pause_button': 'togglePause',
    'click #skip_button': 'skipToNextTrack',
    'touchstart #audio_progress_container': 'adjustProgress',
    'touchmove #audio_progress_container': 'adjustProgress',
    'mousedown #audio_progress_container': 'adjustProgress',
    'mousemove #audio_progress_container': 'adjustProgress'
  },

  currentTrackIndex: 0,

  paused: true,

  currentTargetTime: null,

  seekInProgress: false,

  initialize: function () {
    this.data = data.audio;

    this.$playPauseButton = this.$('#play_pause_button');
    this.$audioProgressContainer = this.$('#audio_progress_container');
    this.$progressBar = this.$('#audio_progress');
    this.$timeProgress = this.$('#audio_time_progress');
    this.$infoBox = this.$('#audio_info');

    window.addEventListener('mouseup', this.seek.bind(this));
    document.addEventListener('touchend', this.seek.bind(this));

    var audio = this.audio = $('<audio preload="metadata"><source/></audio>').get(0);
    audio.addEventListener('ended', this.skipToNextTrack.bind(this));
    audio.addEventListener('timeupdate', this.renderProgressBar.bind(this));
    audio.addEventListener('loadedmetadata', function () {
      this.renderTrackTitle();
      this.renderTimeProgress();
    }.bind(this));
    // state will change and class will toggle if play is successful
    audio.addEventListener('play', function () {
      this.paused = false;
      this.$playPauseButton.removeClass('paused');
    }.bind(this));
    audio.addEventListener('stalled', this.togglePause.bind(this, true));
    this.updateSource();
  },

  togglePause: function (value) {
    var pause = typeof value === 'boolean' ? value : !this.paused;
    if (pause) {
      this.$playPauseButton.addClass('paused');
      this.audio.pause();
      this.paused = true;
      return;
    }
    try {
      this.audio.play();
    } catch (e) {
      console.error(e);
      var warningMessage =
        'Audio playback failed at ' +
        new Date().toLocaleTimeString() +
        '! (Perhaps autoplay is disabled in this browser.)';
      console.warn(warningMessage);
    }
  },

  skipToNextTrack: function () {
    this.audio.pause();
    var i = ++this.currentTrackIndex;
    if (i >= this.data.tracks.length) {
      this.currentTrackIndex = 0;
    }
    this.updateSource();
    this.togglePause(false);
  },

  updateSource: function () {
    this.audio.src = this.getCurrentAudioFilePath();
  },

  getCurrentTrackTitle: function () {
    return this.data.tracks[this.currentTrackIndex].title;
  },

  getCurrentAudioFilePath: function () {
    return this.data.path + this.data.tracks[this.currentTrackIndex].file;
  },

  renderProgressBar: function () {
    if (this.seekInProgress) {
      return;
    }
    var currentTime = this.audio.currentTime || 0;
    var duration = this.audio.duration || 0;
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
  },

  adjustProgress: function (e) {
    var evt = e.originalEvent;
    var $progressContainer = this.$audioProgressContainer;
    // make sure we don't select stuff in the background while seeking
    if (evt.type === 'mousedown' || evt.type === 'touchstart') {
      this.seekInProgress = true;
      $(document.body).addClass('noselect');
    } else if (!this.seekInProgress) {
      return;
    }
    /* we don't want mouse handlers to receive the event
     * after touch handlers if we're seeking.
     */
    evt.preventDefault();
    var isTouch = evt.type.slice(0, 5) === 'touch';
    var pageX = isTouch ? evt.targetTouches.item(0).pageX : evt.pageX;
    var position = pageX - $progressContainer.offset().left;
    var containerWidth = $progressContainer.width();
    var progressRatio = position / containerWidth;
    this.$progressBar.width((100 * progressRatio) + '%');
    var duration = this.audio.duration;
    var targetTime = this.currentTargetTime = progressRatio * duration;
    this.$timeProgress.text(targetTime.toTime() + ' / ' + duration.toTime());
  },

  seek: function (e) {
    $(document.body).removeClass('noselect');
    if (!this.seekInProgress) {
      return;
    }
    /* we don't want mouse handlers to receive the event
     * after touch handlers if we're seeking.
     */
    e.preventDefault();
    this.seekInProgress = false;
    var targetTime = this.currentTargetTime;
    if (isNaN(targetTime)) {
      return;
    }
    this.audio.currentTime = targetTime;
  }

});
