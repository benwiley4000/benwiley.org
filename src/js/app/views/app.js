var app = app || {};
var data = data || {};

// top-level UI
app.AppView = Backbone.View.extend({

  el: '#content',

  initialize: function () {
    this.$main = this.$('#main');

    this.$contact = this.$('#contact');
    this.$webProjects = this.$('#web_projects');
    this.$games = this.$('#games');
    this.$writing = this.$('#writing');

    this.audioPlayerView = new app.AudioPlayerView();
    if (data.options.autoplay) {
      setTimeout(function() {
        this.audioPlayerView.togglePause(false);
      }.bind(this), 500);
    }

    $(document).keydown(this.toggleAudioPause.bind(this));

    this.on('pageswap', this.swapView);

    this.render();
  },

  toggleAudioPause: function (e) {
    if (!data.options.spacetoplay || e.which !== SPACE_BAR) {
      return;
    }
    e.preventDefault();
    this.audioPlayerView.togglePause();
  },

  render: function () {
    this.renderWebProjects();
    this.renderGames();
    this.renderWriting();
  },

  renderWebProjects: function () {
    var $portfolio = this.$webProjects.find('.portfolio_container');
    $portfolio.html('');

    var projectTemplate = _.template($('#portfolio_item_template').html());

    data.web.projects.forEach(function (project) {
      $portfolio.append(new app.PortfolioItemView(project).render().$el);
    });
  },

  renderGames: function () {
    var $portfolio = this.$games.find('.portfolio_container');
    $portfolio.html('');

    var projectTemplate = _.template($('#portfolio_item_template').html());

    data.games.games.forEach(function (game) {
      $portfolio.append(new app.PortfolioItemView(game).render().$el);
    });
  },

  renderWriting: function () {
    var $writing = this.$writing;
    $writing.html('');

    var categoryTemplate = _.template($('#article_category_template').html());

    data.writing.categories.forEach(function (category) {
      $writing.append(categoryTemplate(category));
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

    var $targets = $divToOpen
      .find('.collapsible.collapsed')
      .andSelf()
      .filter('.collapsible.collapsed');

    if (!$targets.length) {
      return;
    }

    $('.collapsible').each(function () {
      $(this).addClass('collapsed');
    });

    // move element end so it will open from the bottom
    this.$main.append($divToOpen);
    /* query max-height to trigger reflow;
     * if we don't then the layout won't be
     * ready for the CSS transition to work.
     * we don't need to do anything with the
     * returned value.
     * why? http://stackoverflow.com/a/24195559/4956731
     */
    $targets.css('max-height');

    $targets.each(function () {
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
