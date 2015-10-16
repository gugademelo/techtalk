(function(root){
  'use strict';
  // $.get('/json/comments.json',function(data, err){

  // });

  var CommentBox = React.createClass({
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
    render: function() {
      return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm />
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function (message) {
        return (
          <Comment author={message.name}>
            {message.comment}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });

  var CommentForm = React.createClass({
    render: function() {
      return (
        <div className="commentForm">
          Hello, world! I am a CommentForm.
        </div>
      );
    }
  });

  var Comment = React.createClass({
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
    <CommentBox url='/json/comments.json' />,
    document.getElementById('content')
  );

})(window);