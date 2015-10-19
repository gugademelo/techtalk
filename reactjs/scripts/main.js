'use strict';

(function () {
  'use strict';

  var App = {};

  App.CommentBox = React.createClass({
    displayName: 'CommentBox',

    getInitialState: function getInitialState() {
      return { data: [] };
    },
    componentDidMount: function componentDidMount() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: (function (result) {
          this.setState({ data: result.data });
        }).bind(this),
        error: (function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }).bind(this)
      });
    },

    handleCommentSubmit: function handleCommentSubmit(comment) {
      var comments = this.state.data,
          newComments = comments.concat([comment]);

      this.setState({ data: newComments });
    },

    render: function render() {
      return React.createElement(
        'div',
        { className: 'commentBox' },
        React.createElement(
          'h1',
          null,
          'Comentários React'
        ),
        React.createElement(App.CommentList, { data: this.state.data }),
        React.createElement(App.CommentForm, { onCommentSubmit: this.handleCommentSubmit })
      );
    }
  });

  App.CommentList = React.createClass({
    displayName: 'CommentList',

    render: function render() {
      var commentNodes = this.props.data.map(function (message) {
        return React.createElement(
          App.SingleCommit,
          { author: message.name },
          message.comment
        );
      });
      return React.createElement(
        'div',
        { className: 'comment-list' },
        commentNodes
      );
    }
  });

  App.CommentForm = React.createClass({
    displayName: 'CommentForm',

    handleSubmit: function handleSubmit(e) {
      e.preventDefault();
      var name = this.refs.name.value.trim(),
          comment = this.refs.comment.value.trim();

      if (!name || !comment) {
        return;
      }
      // Send the new data, update the comments entry, erase the form data
      this.props.onCommentSubmit({ name: name, comment: comment });
      this.refs.name.value = '';
      this.refs.comment.value = '';
      return;
    },

    render: function render() {
      return React.createElement(
        'form',
        { className: 'commentForm', onSubmit: this.handleSubmit },
        React.createElement('input', { ref: 'name', type: 'text', placeholder: 'Nome' }),
        React.createElement('textarea', { ref: 'comment', placeholder: 'Comentario' }),
        React.createElement(
          'button',
          { type: 'submit' },
          'Enviar'
        )
      );
    }
  });

  App.SingleCommit = React.createClass({
    displayName: 'SingleCommit',

    removeItem: function removeItem() {
      // FIX ME, unmount do react not working here
      var elem = this.getDOMNode();
      elem.parentNode.removeChild(elem);
    },
    render: function render() {
      return React.createElement(
        'div',
        { className: 'comment' },
        React.createElement(
          'h2',
          { className: 'commentAuthor' },
          this.props.author
        ),
        this.props.children,
        React.createElement(
          'button',
          { onClick: this.removeItem },
          'Remover'
        )
      );
    }
  });

  ReactDOM.render(React.createElement(App.CommentBox, { url: '/json/comments.json' }), document.getElementById('content'));
})(window);
//# sourceMappingURL=main.js.map
