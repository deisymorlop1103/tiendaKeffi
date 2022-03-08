'use strict'

const imagemin = require('gulp-imagemin');
var gulp = require('gulp'),
    saas = require('gulp-sass'),
    browserSync = require('browser-sync').create();

gulp.task('saas', function() {
    gulp.src('./css/*.scss')
        .pipe(saas().on('error', saas.logError))
        .pipe(gulp.dest('./css'));
})
gulp.task('sass:watch', function() {
    gulp.watch('./css/*.scss', ['sass']);

});
gulp.task('browser-sync', function() {
    var files = ['./*.html', './css/*.css', './img/*.{png,jpg,gif}', './js/*.js']
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});
gulp.task('default', ['browser-sync'], function() {
    gulp.start('sass:watch');
});
gulp.task('clean', function() {
    return delete(['dist']);
});

gulp.task('copyfonts', function() {
    gulp.src('/node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function() {
    return gulp.src('./images/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function() {
    return gulp.src('./*html')
        .pipe(flatmap(function(stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function() { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinecss: [cleanCss(), 'concat']
                }))

        }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('build', ['clean'], function() {
    gulp.start('copyfonts', 'imagemin', 'usemin');
});