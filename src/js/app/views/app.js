var app = app || {};
var data = data || {};

// top-level UI
app.AppView = Backbone.View.extend({

  el: '#content',

  initialize: function () {
    this.$contact = this.$('#contact');
    this.$webProjects = this.$('#web_projects');
    this.$games = this.$('#games');
    this.$writing = this.$('#writing');

    this.audioPlayerView = new app.AudioPlayerView();
    setTimeout(function() {
      this.audioPlayerView.togglePause(false);
    }.bind(this), 500);

    $(document).keydown(this.toggleAudioPause.bind(this));

    this.on('pageswap', this.swapView);

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
  },

  swapView: function () {
    this.updateNavBar();

    var $divToOpen = null;
    if (app.page === 'web') {
      $divToOpen = this.$webProjects;
    } else if (app.page === 'games') {
      $divToOpen = this.$games;
    } else if (app.page === 'writing') {
      $divToOpen = this.$writing;
    } else {
      $divToOpen = this.$contact;
    }

    $('.collapsible').each(function () {
      $(this).addClass('collapsed');
    });
    $divToOpen.find('.collapsible')
              .andSelf()
              .filter('.collapsible')
              .each(function () {
      $(this).removeClass('collapsed');
    });
  },

  updateNavBar: function () {
    this.$('.page-link')
      .removeClass('selected')
      .filter('[href="#/' + (app.page || 'contact') + '"]')
      .addClass('selected');
  }

});
