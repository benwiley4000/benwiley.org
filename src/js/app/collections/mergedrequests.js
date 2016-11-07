var app = app || {};

var MergedRequests = Backbone.Collection.extend({
  model: app.MergedRequest,
  url: 'http://new.benwiley.org/github-merged-requests'
});

app.mergedRequests = new MergedRequests();
