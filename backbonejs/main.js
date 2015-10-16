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
  },
  initialLoad: function() {
    this.fetch({
      success: function() {

      }
    });

    return this;
  }
});

var CommentItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#comment-template').html()),

  initialize: function(options) {
    this.model = options.model;
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var CommentsView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function(options) {
    this.collection = options.collection;
    this.render();
  },

  render: function() {
    var that = this;
    this.collection.each(function(commentModel) {
      var commentView = new CommentItemView({ model: commentModel });
      that.$el.append(commentView.render().$el);
    });

    $('#app-container').html(this.$el);
  }

});

var comments, app;
comments = new CommentsCollection().fetch({
  success: function(coll) {
    app = new CommentsView({ collection: coll });
  }
});

$('.new-comment-form').on('submit', function() {
  var data = $(this).serializeArray(),
      newComment = new Comment();

  for(var i=0; i<data.length; i++) {
    var map = {};
    map[data[i].name] = data[i].value;
    newComment.set(map);
  }

  debugger
});