const sass = require('node-sass');

require('load-grunt-tasks')(grunt);

grunt.initConfig({
    sass: {
        dist: {
            files: [{
                expand: true,
                cwd: 'css',
                src: ['*.scss'],
                dest: 'css',
                ext: '.css'
            }]
        }
    }

});
grunt.registerTask('css', ['sass']);