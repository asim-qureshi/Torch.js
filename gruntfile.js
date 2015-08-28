
module.exports = function(grunt) {
    
    grunt.initConfig({ 
      uglify: {
        my_target: {
          files: {
                'zipper.min.js': 'zipper.js',
		'ziptest.min.js': 'ziptest.js'
          }
        }  
      }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', 'uglify');
}
	
