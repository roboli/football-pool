module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    env: {
      test: { NODE_ENV: 'development' },
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
