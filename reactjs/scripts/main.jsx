(function(){
  'use strict';

  var App = {};

  App.CommentBox = React.createClass({
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(result) {
          this.setState({data: result.data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    handleCommentSubmit: function(comment) {
      var comments = this.state.data,
        newComments = comments.concat([comment]);

      this.setState({data: newComments});
    },

    render: function() {
      return (
        <div className="commentBox">
          <h1>Comentários React</h1>
          <App.CommentList data={this.state.data} />
          <App.CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  });

  App.CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function (message) {
        return (
          <App.SingleCommit author={message.name}>
            {message.comment}
          </App.SingleCommit>
        );
      });
      return (
        <div className="App.commentList">
          {commentNodes}
        </div>
      );
    }
  });

  App.CommentForm = React.createClass({

    handleSubmit: function(e) {
      e.preventDefault();
      var name = this.refs.name.value.trim(),
        comment = this.refs.comment.value.trim();

      if (!name || !comment) {
        return;
      }
      // Send the new data, update the comments entry, erase the form data
      this.props.onCommentSubmit({name: name, comment: comment});
      this.refs.name.value = '';
      this.refs.comment.value = '';
      return;
    },

    render: function() {
      return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input ref="name" type="text" placeholder="Nome" />
          <textarea ref="comment" placeholder="Comentario"></textarea>
          <button type="submit">Enviar</button>
        </form>
      );
    }
  });

  App.SingleCommit = React.createClass({
    render: function() {
      return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          {this.props.children}
        </div>
      );
    }
  });

  ReactDOM.render(
    <App.CommentBox url='/json/comments.json' />,
    document.getElementById('content')
  );

})(window);