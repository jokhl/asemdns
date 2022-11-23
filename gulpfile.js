const PostCSS = require('gulp-postcss')
const Gulp = require('gulp')
 
Gulp.task('css-prod', function () {
    return Gulp.src('./app/assets/stylesheets/*.css')
        .pipe(PostCSS())
        .pipe(Gulp.dest('./static/css'))
})

Gulp.task('css-dev', function () {
    return Gulp.src('./app/assets/stylesheets/*.css')
        .pipe(PostCSS())
        .pipe(Gulp.dest('./static/css'))
})

Gulp.task('css-watch', function () {
    return Gulp.watch('./app/assets/stylesheets/*.css', Gulp.series(['css-dev']))
})