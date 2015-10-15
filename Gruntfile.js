module.exports = function(grunt) {
  'use strict';
  var npmTasks = [
    'grunt-contrib-watch',
    'grunt-react'
  ];

  grunt.initConfig({
    react: {
      single_file_output: {
        files: {
          'reactjs/scripts/main.js': 'reactjs/scripts/main.jsx'
        }
      }
    },
    watch: {
      scripts: {
        files: '**/*.jsx',
        tasks: ['react'],
        options: {
          spawn: false
        }
      }
    }
  });

  for (var ind = 0; ind < npmTasks.length; ind++) {
    grunt.loadNpmTasks(npmTasks[ind]);
  }
};
