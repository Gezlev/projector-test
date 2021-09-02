const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { series, parallel } = gulp;

const styles = () => {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/'));
};

const watch = () => {
    gulp.watch('assets/scss/**/*.scss', styles)
}

exports.dev = series(
    parallel(styles),
    parallel(watch)
)
