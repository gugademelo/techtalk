var Comment = Backbone.Model.extend({
  defaults: {
    name: 'Sem nome',
    comment: 'Comentario vazio'
  }
});

var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: '/json/comments.json',

  parse: function(json) {
    return json.data;
  },
  initialize: function() {
    this.fetch({
      success: function() {

      }
    });
  }
});

var CommentItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#comment-template').html())
});

var CommentsView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    console.log(this.collection);
  }

});

var comments = new CommentsCollection();
var app = new CommentsView({ collection: comments });