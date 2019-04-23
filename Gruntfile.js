module.exports = function(grunt){
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('main-bower-files');
    var serveStatic = require('serve-static');

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
            demo: {
                options: {
                    processContent: function (content, srcpath) {
                        return grunt.template.process(content);
                    }
                },
                files: [{
                    src: 'src/index.html',
                    dest: 'dist/index.html'
                }]
            },
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
        watch: {
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:dev']
            },
            ng: {
                files: ['src/**/*.js', 'src/**/*.tpl.html'],
                tasks: ['html2js', 'concat', 'clean', 'dev_prod_switch:dev']
            },
            index: {
                files: ['src/index.html'],
                tasks: ['copy:demo', 'dev_prod_switch:dev']
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: ['dist/**/*', 'docs/**/*']
            }
        },
        connect: {
            live: {
                options: {
                    open: true,
                    keepalive: true,
                    hostname: 'localhost',
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html'
                        }
                    },
                    middleware: function(connect) {
                        return [
                            serveStatic('.tmp'),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('./dist')
                        ];
                    }
                }
            },
            dev: {
                options: {
                    livereload: true,
                    open: true,
                    hostname: 'localhost',
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html'
                        }
                    },
                    middleware: function(connect) {
                        return [
                            serveStatic('.tmp'),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('./dist')
                        ];
                    }
                }
            },
            docs: {
                options: {
                    livereload: true,
                    open: true,
                    hostname: 'localhost',
                    base: {
                        path: 'docs',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },
        dev_prod_switch: {
            dev: {
                options: {
                    environment: 'dev'
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            },
            live: {
                options: {
                    environment: 'prod'
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        bower: {
            flat: { /* flat folder/file structure */
                dest: 'vendor'
            }
        },
        wiredep: {
            demo: {
                src: [
                    'src/index.html'
                ],
                ignorePath: '../',
                options: {
                    devDependencies: true
                },
                fileTypes: {
                    html: {
                        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"]([^'"]+)/gi,
                            css: /<link.*href=['"]([^'"]+)/gi
                        },
                        replace: {
                            js: '<script src="/{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="/{{filePath}}">'
                        }
                    }
                }
            }
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
        },
        auto_install: {
            local: {}
        }
    });

    grunt.registerTask('default', [
        'dev-build', 'connect:dev', 'watch'
    ]);
    grunt.registerTask('dev-build', [
        'auto_install',
        'html2js',
        'concat',
        'less:dev',
        'copy',
        'clean',
        'dev_prod_switch:dev'
    ]);
    grunt.registerTask('live-build', [
        'auto_install',
        'html2js',
        'concat',
        'less:dev',
        'copy',
        'clean',
        'less:build',
        'ngAnnotate',
        'uglify',
        'dev_prod_switch:live'
    ]);
    //TODO: add ng-docs and gh-pages tasks to this repo
    //grunt.registerTask('docs', ['connect:docs', 'watch']);
    grunt.registerTask('demo-live', ['live-build', 'connect:live']);
};
