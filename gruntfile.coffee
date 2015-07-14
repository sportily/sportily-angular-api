module.exports = (grunt) ->

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        coffee:
            dist:
                src: 'src/coffee/**/*.coffee'
                dest: 'dist/js/sportily.api.js'

        uglify:
            options:
                sourceMap: true
            dist:
                files:
                    'dist/js/sportily.api.min.js': [ 'dist/js/sportily.api.js' ]

        watch:
            coffee:
                files: [ 'src/coffee/**/*.coffee' ]
                tasks: [ 'coffee', 'uglify' ]


    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.registerTask 'default', [ 'coffee', 'uglify' ]
