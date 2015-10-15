(function(root){
  'use strict';
  var BlauComponent = React.createClass({displayName: "BlauComponent",
    render: function() {
      return(
        React.createElement("h1", null, "Blau Blau")
      );
    }
  })
  React.render(React.createElement(BlauComponent, null), document.getElementById('blau'));

})(window);