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

  events: {
    'click .remove': 'removeItself'
  },

  initialize: function(options) {
    this.model = options.model;
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  removeItself: function() {
    this.el.remove();
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
  },

  addOne: function(commentModel) {
    var commentView = new CommentItemView({ model: commentModel });
    this.collection.add(commentModel);
    this.$el.append(commentView.render().$el);
  }

});

var comments, app;
comments = new CommentsCollection();
comments.fetch({
  success: function(coll) {
    app = new CommentsView({ collection: coll });
  }
});

$('.new-comment-form').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray(),
      newComment = new Comment();

  for(var i=0; i<data.length; i++) {
    var map = {};
    map[data[i].name] = data[i].value;
    newComment.set(map);
  }

  this.reset();

  app.addOne(newComment);
});