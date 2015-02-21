module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    assemble: {
      options: {
        flatten: true,
        data: 'src/content/data.json',
        partials: ["src/components/**/html/*.hbs", "src/partials/*.hbs"],
        assets: "dist/assets"
      },
      docs: {
        src: ['src/pages/*.hbs'],
        dest: 'dist/',
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist',
          keepalive: true,
          livereload: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          mainConfigFile: "src/common/js/config.js",
          name: "../bower_components/almond/almond", // assumes a production build using almond
          out: "dist/assets/js/compiled.js",
          findNestedDependencies: true,
          include: 'common/js/main.js',
          optimize: 'none',
          preserveLicenseComments: false,
          wrap: true
        }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['src/'],
          import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
            'common/css/colors.styl'
          ]
        },
        files: {
          'dist/assets/css/compiled.css': ['src/components/**/css/*.styl'] // compile and concat into single file
        }
      }
    },
    watch: {
      options:{
          livereload: true
        },
      css: {
        
        files: [
          'src/components/**/css/*.styl'
        ],
        tasks: [
          'stylus'
        ]
      },
      js: {
        files: [
          'src/components/**/js/*js'
        ],
        tasks: [
          'requirejs'
        ]
      },
      html: {
        files: [
          'src/components/**/html/*.hbs',
          'src/pages/*.hbs'
        ],
        tasks: [
          'assemble'
        ]
      }
    },
    concurrent: {
      options: {
        limit: 5,
        logConcurrentOutput: true
      },
      watch: ['connect', 'watch']
    }
  });


  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['assemble', 'stylus', 'requirejs:compile', 'concurrent:watch']);

};