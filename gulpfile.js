const gulp      = require('gulp');
const gutil     = require('gulp-util');
const rename    = require('gulp-rename');
const uglify    = require('gulp-uglify');
const del       = require('del');
const DEV_ROOT  = 'src/hellrazor.js';
const DIST_ROOT = 'dist/';

gulp.task('clean', function() {
    return del(DIST_ROOT);
});

gulp.task('js', ['clean'], function() {
    return gulp.src(DEV_ROOT)
               .on('error', gutil.log)
               .pipe(rename('index.js'))
               .pipe(gulp.dest(DIST_ROOT));
});

gulp.task('uglify', ['js', 'clean'], function() {
    return gulp.src(DIST_ROOT + 'index.js')
               .on('error', gutil.log)
               .pipe(uglify())
               .pipe(rename('index.min.js'))
               .pipe(gulp.dest(DIST_ROOT));
});

gulp.task('build', ['clean', 'js', 'uglify']);