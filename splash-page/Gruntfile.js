var stylVariables = require('rework-variant'),
    shade         = require('rework-shade');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        files: grunt.file.expandMapping('jade/*.jade', 'public/', {rename: renameJadeFiles})
      }
    },
    styl: {
      compile: {
        options: {
          whitespace: true,
          configure: function(styl) {
            styl.use(stylVariables());
            styl.use(shade());
          }
        },
        files: {
          'public/main.css': ['styl/*.styl']
        }
      }
    },
    watch: {
      jade: {
        files: ['jade/*.jade'],
        tasks: ['jade:compile'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['styl/*.styl'],
        tasks: ['styl:compile'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-styl');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};

function renameJadeFiles(dest, src) {
  var str = src.replace(/\.jade/, '.html');
  return dest + str.replace(/jade\//, '');
}
