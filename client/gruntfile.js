module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
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
	configFile: 'test/config/karma.conf.js',
	autoWatch: false,
	background: true
      }
    },
    watch: {
      gruntfile: {
	files: ['gruntfile.js'],
	tasks: ['jshint']
      },
      test: {
	files: ['src/**/*.js', 'test/**/*.js'],
	tasks: ['jshint', 'karma:unit:run']
      }
    }
  });
  
  grunt.registerTask('test', [ 'jshint:test', 'karma' ]);
  grunt.registerTask('test-watch', [ 'jshint:test', 'karma:unit:start', 'watch' ]);
};
