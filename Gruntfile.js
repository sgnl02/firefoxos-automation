module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, clean: {
			options: {
				force: true
			},
			dist: ['dist']
		}

		, mkdir: {
			create: {
				options: {
					create: ['dist/assets/js', 'dist/assets/stylesheets', 'dist/images', 'dist/assets/icons', 'dist/assets/fonts', 'dist/assets/locales'],
					
				},
			},
		},

		copy: {
		 appcache: {
		  expand: true,
		  src: ['offline.appcache'], 
		  dest:'dist/' 
		 }
		 , stylesheets: {
		  expand: true,
		  cwd: 'bower_components/building-blocks/style/', 
		  src: ['**/images/**/*.{png,jpg,svg}'], 
		  dest:'dist/assets/stylesheets/' 
		 }
		 , style: {
		  expand: true,
		  cwd: 'bower_components/building-blocks/style/', 
		  src: ['action_menu/**/*.{png,jpg,svg}', 'progress_activity/**/*.{png,jpg,svg}'], 
		  dest:'dist/assets/style/' 
		 }
		 , styles: {
		  expand: true,
		  cwd: 'bower_components/building-blocks/icons/', 
		  src: ['**/styles/**/*.{png,jpg,svg}'], 
		  dest:'dist/assets/icons/' 
		 }
		 , fonts: {
			expand: true,
		  cwd: 'bower_components/building-blocks/fonts/', 
		  src: ['**/FiraSans/**/*.{eot,otf,ttf,woff}'], 
		  dest:'dist/assets/fonts/' 
		 }	 	
		 , images: {
			expand: true,
		  cwd: 'bower_components/building-blocks/images/', 
		  src: ['**/*.{png,jpg,svg}'], 
		  dest:'dist/images/' 
		 }
		 , locales: {
			expand: true,
		  cwd: 'locales/', 
		  src: ['**/*'], 
		  dest:'dist/assets/locales/' 	 
		 }
		 , manifest: {
			expand: true,
		  src: 'manifest.webapp', 
		  dest:'dist/' 	 
		 }
		 , data: {
			expand: true,
		  src: 'data.json', 
		  dest:'dist/assets/' 	 
		 }		
		 , html: {
			expand: true,
		  src: 'index.html', 
		  dest:'dist/' 	 
		 }
		}

		, uglify: {
			options: {
				preserveComments: false
			},
			target: {
				files: {
					'dist/assets/js/main.js': ['bower_components/building-blocks/js/status.js', 'bower_components/building-blocks/js/seekbars.js', 'bower_components/l20n/l20n.js', 'js/main.js']
				},
			},
		}

		, cssmin: {
			ui: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'dist/assets/stylesheets/ui.css': ['bower_components/building-blocks/style/**/*.css', 'bower_components/building-blocks/style_custom/main.css', 'stylesheets/**/*.css']
				},
			},
			root: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'dist/assets/root.css': ['bower_components/building-blocks/cross_browser.css', 'bower_components/building-blocks/util.css', 'bower_components/building-blocks/transitions.css', 'bower_components/building-blocks/fonts.css']
				},
			},
			icons: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'dist/assets/icons/styles/icons.css': ['bower_components/building-blocks/icons/styles/**/*.css']
				},
			},
		}
		
		, concat_css: {
			ui: {
				files: {
					'dist/assets/stylesheets/ui.css': ['bower_components/building-blocks/style/**/*.css', 'bower_components/building-blocks/style_custom/main.css', 'stylesheets/**/*.css']
				},
			},
			root: {
				files: {
					'dist/assets/root.css': ['bower_components/building-blocks/cross_browser.css', 'bower_components/building-blocks/util.css', 'bower_components/building-blocks/transitions.css', 'bower_components/building-blocks/fonts.css']
				},
			},
			icons: {
				files: {
					'dist/assets/icons/styles/icons.css': ['bower_components/building-blocks/icons/styles/**/*.css']
				},
			},
		}

		, concat: {
			dist: {
				src: ['bower_components/building-blocks/js/status.js', 'bower_components/building-blocks/js/seekbars.js', 'bower_components/l20n/l20n.js', 'js/main.js'],
				dest: 'dist/assets/js/main.js'
			},
		}

		, htmlmin: {
			default: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'index.html'
				},
			},
		}

		, watch: {
			ui: {
				files: ['stylesheets/**/*.css', 'bower_components/building-blocks/stylesheets/**/*.css'],
				tasks: ['concat_css:ui'],
				options: {
					livereload: true,
				}
			},
			root: {
				files: ['cross_browser.css', 'bower_components/building-blocks/util.css', 'bower_components/building-blocks/transitions.css', 'bower_components/building-blocks/fonts.css'],
				tasks: ['concat_css:root'],
				options: {
					livereload: true,
				}
			},
			icons: {
				files: ['bower_components/building-blocks/icons/styles/**/*.css'],
				tasks: ['concat_css:icons'],
				options: {
					livereload: true,
				}
			},
			html: {
				files: ['index.html'],
				tasks: ['copy:html'],
				options: {
					livereload: true,
				}
			},
			js: {
				files: ['bower_components/building-blocks/js/status.js', 'bower_components/building-blocks/js/seekbars.js', 'bower_components/building-blocks/js/l20n.js', 'js/main.js'],
				tasks: ['concat'],
				options: {
					livereload: true,
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean', 'mkdir', 'uglify', 'cssmin', 'copy:appcache', 'copy:stylesheets', 'copy:style', 'copy:styles', 'copy:fonts', 'copy:images', 'copy:locales', 'copy:manifest', 'copy:data', 'htmlmin']);
	grunt.registerTask('dev', ['clean', 'mkdir', 'uglify', 'concat_css', 'concat', 'copy', 'watch']);

};

