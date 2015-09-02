module.exports = function(grunt){
    // Load all tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        html2js: {
            app: {
                options:{
                    base: 'src/app',
                    process: true
                },
                src: 'src/app/**/*.tpl.html',
                dest: 'tmp/templates.js',
                module: 'hours.templates'
            }
        },
        concat: {
            app: {
                src: ['tmp/templates.js', 'src/app/**/*.js'],
                dest: 'dist/hours.js'
            },
            index: {
                src: 'src/index.html',
                dest: 'dist/index.html',
                options: {
                    process: true
                }
            }
        },
        less: {
            dev: {
                files: {
                    'dist/hours.css': ['src/**/*.less', 'src/**/*.css']
                }
            },
            build: {
                files: {
                    'dist/hours.min.css': ['src/**/*.less', 'src/**/*.css']
                },
                options: {
                    compress: true
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/hours.min.js': ['dist/hours.js']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        'dist/hours.js': ['dist/hours.js']
                    }
                ]
            }
        },
        copy: {
            vendor: {
                files: [
                    {
                        src: ['assets/vendor/lodash/*.js'],
                        dest: 'dist/vendor/lodash/',
                        flatten: true,
                        expand: true
                    },
                    {
                        src: ['assets/vendor/angular-google-maps/dist/angular-google-maps.js'],
                        dest: 'dist/vendor/angular-google-maps/',
                        flatten: true,
                        expand: true
                    }
                ]
            }
        },
        clean: {
            app: ['tmp/']
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        }
    });

    grunt.registerTask('default', ['html2js', 'concat', 'less:dev', 'copy', 'clean']);
    grunt.registerTask('live-build', ['default', 'less:build', 'ngAnnotate', 'uglify']);
};