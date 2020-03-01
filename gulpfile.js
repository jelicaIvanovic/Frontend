var gulp = require('gulp');
var sass = require('gulp-sass');


//Compile Sass

gulp.task('sass', function(){
    return gulp.src('src/Assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/Assets/dist'));
});
gulp.task('watch',function () {

    gulp.watch('src/Assets/sass/*.scss', ['sass']);
    gulp.watch('src/Assets/js/*', ['minify']);

});


//Script minimization

gulp.task('minify',function () {


});