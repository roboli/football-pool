module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jshint: {
      test: {
	src: ['src/**/*.js', 'test/**/*.js'],
      },
      options: {
	expr: true,
	'-W099': true // supress spaces and tabs warning
      }
    },
    karma: {
      unit: {
	configFile: 'test/config/karma.conf.js'
      }
    }
  });
  
  grunt.registerTask('test', [ 'jshint:test', 'karma' ]);
};
