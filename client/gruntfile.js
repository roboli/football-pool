module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n */\n',
    src: {
      js: ['src/**/*.js'],
      html: ['src/index.html'],
      tpl: ['src/**/*.tpl.html']
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      templates: {
        files: [{ dest: '<%= distdir %>/templates', src : '<%= src.tpl %>', flatten: true, expand: true }]
      }
    },
    concat: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: ['<%= src.js %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/app/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      angular: {
        src:['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js', 'bower_components/angular-resource/angular-resource.js'],
        dest: '<%= distdir %>/angular.js'
      }
    },
    jshint: {
      test: {
	src: ['src/**/*.js', 'test/**/*.js'],
      },
      build: {
	src: ['src/**/*.js']
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
	tasks: ['jshint', 'karma:continuous:run']
      }
    }
  });
  
  grunt.registerTask('test', [ 'jshint:test', 'karma:unit' ]);
  grunt.registerTask('test-watch', [ 'jshint:test', 'karma:continuous:start', 'watch' ]);
  grunt.registerTask('build', ['clean', 'jshint:build', 'copy', 'concat']);
};
