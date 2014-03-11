module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    karma: {
      unit: {
	configFile: 'test/config/karma.conf.js'
      }
    }
  });
  
  grunt.registerTask('test', [ 'karma' ]);
};
