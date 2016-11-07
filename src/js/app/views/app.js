var app = app || {};
var data = data || {};

// top-level UI
app.AppView = Backbone.View.extend({

  el: '#content',

  events: {
    'click .top_stripe': 'cycleColor',
    'touchstart .header': 'recordLastTouchStartY',
    'touchend .header': 'cycleColorIfCloseEnough'
  },

  colorIndex: 7, // use magenta by default

  lastTouchStartY: null,

  initialize: function () {
    app.mergedRequests.fetch({
      success: this.renderOpenSource.bind(this)
    });

    this.$main = this.$('#main');

    this.$about = this.$('#about');
    this.$web = this.$('#web');
    this.$games = this.$('#games');
    this.$opensource = this.$('#opensource');
    this.$writing = this.$('#writing');
    this.$contact = this.$('#contact');

    this.audioPlayerView = new app.AudioPlayerView();
    if (app.options.autoplay) {
      setTimeout(function() {
        this.audioPlayerView.togglePause(false);
      }.bind(this), 500);
    }

    $(document).keydown(this.toggleAudioPause.bind(this));

    this.on('pageswap', this.swapView);

    this.render();

    this.colorIndex = localStorage.getItem('colorIndex') || this.colorIndex;
    this.applyColor();

    /* query content opacity to ensure draw happens first
     * (so we can effect a smooth transition - see explanation
     * in swapView method)
     */
    this.$el.css('opacity');
    // show content
    this.$el.removeClass('hiding');
  },

  recordLastTouchStartY: function (e) {
    this.lastTouchStartY = e.originalEvent.targetTouches.item(0).pageY;
  },

  cycleColorIfCloseEnough: function () {
    if (this.lastTouchStartY !== null && this.lastTouchStartY <= 60) {
      this.cycleColor();
    }
  },

  cycleColor: function (e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    var classnames = data.colors.classnames;
    this.colorIndex++;
    if (this.colorIndex >= classnames.length) {
      this.colorIndex = 0;
    }
    localStorage.setItem('colorIndex', this.colorIndex);
    this.applyColor();
  },

  applyColor: function () {
    var classnames = data.colors.classnames;
    this.$el.removeClass(classnames.join(' '))
      .addClass(classnames[this.colorIndex]);
  },

  toggleAudioPause: function (e) {
    if (!app.options.spacetoplay || e.which !== SPACE_BAR) {
      return;
    }
    e.preventDefault();
    this.audioPlayerView.togglePause();
  },

  render: function () {
    this.renderWebProjects();
    this.renderGames();
    this.renderOpenSource();
    this.renderWriting();
  },

  renderWebProjects: function () {
    var $portfolio = this.$web.find('.portfolio_container');
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

  renderOpenSource: function () {
    var $mergedRequestList = this.$opensource.find('.merged_requests');
    app.mergedRequests.each(function (model) {
      var view = new app.MergedRequestView({ model: model });
      $mergedRequestList.append(view.render().el);
    });
    if (app.page === 'opensource') {
      this.swapView(); // make sure we de-collapse our stuff
    }
  },

  renderWriting: function () {
    var $writingList = this.$writing.find('.writing_list');
    $writingList.html('');

    var categoryTemplate = _.template($('#article_category_template').html());

    data.writing.categories.forEach(function (category) {
      $writingList.append(categoryTemplate(category));
    });
  },

  swapView: function () {
    this.updateNavBar();

    var $divToOpen = null;
    if (app.page === 'web') {
      $divToOpen = this.$web;
    } else if (app.page === 'games') {
      $divToOpen = this.$games;
    } else if (app.page === 'opensource') {
      $divToOpen = this.$opensource;
    } else if (app.page === 'writing') {
      $divToOpen = this.$writing;
    } else if (app.page === 'contact') {
      $divToOpen = this.$contact;
    } else {
      $divToOpen = this.$about;
    }

    var $targets = $divToOpen
      .find('.collapsible')
      .andSelf()
      .filter('.collapsible');

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
    this.$('.page_link')
      .removeClass('selected')
      .filter('[href="#/' + (app.page || 'about') + '"]')
      .addClass('selected');
  }

});
