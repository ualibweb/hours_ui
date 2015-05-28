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
                dest: 'dist/hours-templates.js',
                module: 'hours.templates'
            }
        },
        concat: {
            dist: {
                src: ['src/app/**/*.js'],
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
            dist: {
                files: {
                    'dist/hours.css': ['src/**/*.less', 'src/**/*.css']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/hours.min.js': ['dist/hours-templates.js', 'dist/hours.js']
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
      }
    });

    grunt.registerTask('default', ['html2js', 'concat', 'less']);
    grunt.registerTask('build', ['default', 'uglify']);
};