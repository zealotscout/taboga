module.exports = function (grunt) {
    // Configuration
    grunt.initConfig({
        // Watch for Sass changes
        watch: {
            src: {
                files: ['**/*.scss', 'js/*.js'],
                tasks: ['compass:dev', 'uglify']
            },
           options: {
                livereload: true,
            }
        },
        // Compass task
        compass: {
            dev: {
                options: {
                    sassDir: 'stylesheets',
                    cssDir: 'css',
                    imagesPath: 'img',
                    noLineComments: false,
                    outputStyle: 'compressed'
                }
            }
        },
        // Uglify Task
        uglify: {
            my_target: {
              files: {
                'js/taboga.min.js': ['js/taboga.js'],
                'js/bootstrap.min.js': ['js/bootstrap.js']
              }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};