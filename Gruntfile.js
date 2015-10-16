module.exports = function(grunt) {
  'use strict';
  var npmTasks = [
    'grunt-contrib-watch',
    'grunt-babel'
  ];

  grunt.initConfig({
    "babel": {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'reactjs/scripts/main.js': 'reactjs/scripts/main.jsx'
        }
      }
    },

    watch: {
      scripts: {
        files: '**/*.jsx',
        tasks: ['babel'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask("default", ["babel"]);

  for (var ind = 0; ind < npmTasks.length; ind++) {
    grunt.loadNpmTasks(npmTasks[ind]);
  }
};
