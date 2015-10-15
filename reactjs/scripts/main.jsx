(function(root){
  'use strict';
  var BlauComponent = React.createClass({
    render: function() {
      return(
        <h1>Blau Blau</h1>
      );
    }
  })
  React.render(<BlauComponent />, document.getElementById('blau'));

})(window);