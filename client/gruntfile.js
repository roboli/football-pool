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
      options: {
	configFile: 'test/config/karma.conf.js',	
      },
      unit: {
	browsers: ['Firefox', 'Chrome']
      },
      continuous: {
	autoWatch: false,
	background: true,
	browsers: ['PhantomJS']
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
  
  grunt.registerTask('test', [ 'jshint:test', 'karma:unit' ]);
  grunt.registerTask('test-watch', [ 'jshint:test', 'karma:continuous:start', 'watch' ]);
};
