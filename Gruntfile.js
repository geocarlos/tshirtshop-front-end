module.exports = function(grunt) {
    // Configuration
    grunt.initConfig({
      sass: {
        build: {
          files: [
            {
              src: 'src/scss/styles.scss',
              dest: 'src/styles.css'
            }
          ]
        }
      },
      watch: {
        css: {
          files: '**/*.scss',
          tasks: ['sass'],
          options: {
            livereload: true
          }
        }
      }
    });
  
    // load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // register tasks
  
  };