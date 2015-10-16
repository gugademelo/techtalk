'use strict';

(function (root) {
  'use strict';
  // $.get('/json/comments.json',function(data, err){

  // });

  var CommentBox = React.createClass({
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
    render: function render() {
      return React.createElement(
        'div',
        { className: 'commentBox' },
        React.createElement(
          'h1',
          null,
          'Comments'
        ),
        React.createElement(CommentList, { data: this.state.data }),
        React.createElement(CommentForm, null)
      );
    }
  });

  var CommentList = React.createClass({
    displayName: 'CommentList',

    render: function render() {
      var commentNodes = this.props.data.map(function (message) {
        return React.createElement(
          Comment,
          { author: message.name },
          message.comment
        );
      });
      return React.createElement(
        'div',
        { className: 'commentList' },
        commentNodes
      );
    }
  });

  var CommentForm = React.createClass({
    displayName: 'CommentForm',

    render: function render() {
      return React.createElement(
        'div',
        { className: 'commentForm' },
        'Hello, world! I am a CommentForm.'
      );
    }
  });

  var Comment = React.createClass({
    displayName: 'Comment',

    render: function render() {
      return React.createElement(
        'div',
        { className: 'comment' },
        React.createElement(
          'h2',
          { className: 'commentAuthor' },
          this.props.author
        ),
        this.props.children
      );
    }
  });

  ReactDOM.render(React.createElement(CommentBox, { url: '/json/comments.json' }), document.getElementById('content'));
})(window);
//# sourceMappingURL=main.js.map
