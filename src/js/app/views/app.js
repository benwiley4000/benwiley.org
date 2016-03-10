var app = app || {};
var data = data || {};

// top-level UI
app.AppView = Backbone.View.extend({

  el: '#content',

  initialize: function () {
    this.$webProjects = this.$('#web_projects');
    this.$games = this.$('#games');

    this.audioPlayerView = new app.AudioPlayerView();
    setTimeout(function() {
      this.audioPlayerView.togglePause(false);
    }.bind(this), 500);

    $(document).keydown(this.toggleAudioPause.bind(this));

    this.render();
  },

  toggleAudioPause: function (e) {
    if (e.which !== SPACE_BAR) {
      return;
    }
    e.preventDefault();
    this.audioPlayerView.togglePause();
  },

  render: function () {
    this.renderWebProjects();
    this.renderGames();
  },

  renderWebProjects: function () {
    var $webProjects = this.$webProjects;
    $webProjects.html('');

    var projectTemplate = _.template($('#portfolio_item_template').html());

    data.web.projects.forEach(function (project) {
      $webProjects.append(projectTemplate(project));
    });
  },

  renderGames: function () {
    var $games = this.$games;
    $games.html('');

    var projectTemplate = _.template($('#portfolio_item_template').html());

    data.games.games.forEach(function (game) {
      $games.append(projectTemplate(game));
    });
  }

  /*
  swapView: function () {
    this.updateNavBar();
    if (app.page === 'your-foods') {
      this.openTrackersView();
    } else if (app.page === 'timeline') {
      this.openTimelineView();
    } else {
      this.openSearchView();
    }
  },

  updateNavBar: function () {
    this.$('.page-link')
      .removeClass('selected')
      .filter('[href="#/' + (app.page || 'search') + '"]')
      .addClass('selected');
  },

  openSearchView: function () {
    this.searchView.clearSearchResults();
    this.searchView.$el.removeClass('hidden');
    this.trackersView.$el.addClass('hidden');
    this.timelineView.$el.addClass('hidden');
  },

  openTrackersView: function () {
    this.trackersView.render();
    this.trackersView.$el.removeClass('hidden');
    this.searchView.$el.addClass('hidden');
    this.timelineView.$el.addClass('hidden');
  },

  openTimelineView: function () {
    this.timelineView.open();
    this.timelineView.$el.removeClass('hidden');
    this.searchView.$el.addClass('hidden');
    this.trackersView.$el.addClass('hidden');
    // re-render timeline chart so it can fit to its container.
    this.timelineView.renderChart();
  }
  */

});
