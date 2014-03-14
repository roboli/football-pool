module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.initConfig({
    env: {
      test: { NODE_ENV: 'TEST' },
    },
    jshint: {
      test: {
	src: ['lib/**/*.js', 'test/**/*.js', 'config/*.json'],
      },
      options: {
	expr: true,
	'-W099': true // supress spaces and tabs warning
      }
    },
    cafemocha: {
      test: {
        src: 'test/**/*.js',
        options: {
          ui: 'bdd',
          reporter: 'spec'
	}
      }
    },
    watch: {
      gruntfile: {
	files: ['gruntfile.js'],
	tasks: ['jshint']
      },
      test: {
	files: ['lib/**/*.js', 'test/**/*.js', 'config/*.json'],
	tasks: ['env', 'jshint', 'cafemocha']
      }
    }
  });
  
  grunt.registerTask('test', [ 'env:test', 'jshint:test', 'cafemocha:test' ]);
};
