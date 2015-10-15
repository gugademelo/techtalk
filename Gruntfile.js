module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-react');

  grunt.initConfig({
    react: {
      single_file_output: {
        files: {
          'reactjs/main.js': 'reactjs/jsx/main.jsx'
        }
      }
    }
  });
  grunt.registerTask('default', function (target) {
    grunt.task.run([
      'react'
    ]);
  });
}