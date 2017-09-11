module.exports = function(grunt) {

    "use strict";

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({

        sass: {

            dev: {
                options: {
                    style: "compressed",
                    sourcemap : true
                },

                files : {
                    "dist/css/app.min.css": "src/scss/app.scss"
                }
            }
        },

        uglify: {

            dev: {
                options: {
                    compress: true,
                    mangle: true,
                    preserveComments: false
                },

                files: {
                    "dist/js/app.min.js" : ["src/js/libs/atomic.js", "src/js/app/app.js"]
                }
            }
        },

        connect: {

            server : {
                options: {
                    open: true
                }
            }
        },

	jade: {
		compile: {
			options: {
				client: false,
				pretty: true
			},
			files: [ {
				src: "templates/*.jade",
				dest: "build",
				expand: true,
				ext: ".html"
			} ]
		}
	},

	copy: {
		main: {
			expand: true,
			cwd : 'build/templates/',
			src: '*',
			dest : 'build/..'
		}
	},

        watch: {

            js: {
                files: ["src/js/**/*.js"],
                tasks: ["uglify:dev"]
            },

            scss: {
                files: ["src/scss/**/*.scss"],
                tasks: ["sass:dev"]
            },
            jade: {
            	files: ["templates/*.jade"],
            	tasks: ["jade", "copy:main"]
            }
        }
    });

    grunt.registerTask("all", ["sass:dev", "uglify:dev", "connect:server", "jade", "copy", "watch"]);
};
