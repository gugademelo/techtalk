angular.module('commentApp', [])
  .controller('CommentsController', function($http) {

    var _this = this;

    $http({
      method: 'GET',
      url: '/json/comments.json'
    }).then(function successCallback(response) {
      _this.comments = response.data.data;

    }, function errorCallback(response) {
      console.error(response);

    });

    this.addComment = function() {
      _this.comments.push({name:_this.newName, comment:_this.newComment});
      _this.newName = '';
      _this.newComment = '';
    };

    this.removeComment = function(item) {
      var index = _this.comments.indexOf(item);
      _this.comments.splice(index, 1);

    };

  });