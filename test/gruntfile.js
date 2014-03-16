module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.initConfig({
    jshint: {
      test: {
	src: ['e2e/**/*.js', './*.json'],
      },
      options: {
	expr: true,
	'-W099': true // supress spaces and tabs warning
      }
    },
    protractor: {
      options: {
	configFile: "./protractor-conf.js",
	keepAlive: false, 
	noColor: false, 
      },
      test: {
      }
    }
  });
  
  grunt.registerTask('test', [ 'jshint:test', 'protractor' ]);
};
