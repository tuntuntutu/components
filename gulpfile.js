var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
  return sass('./public/scss/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('./public/scss/**/*.scss', ['sass']);
});

// gulp.task('develop', function () {
//   livereload.listen();
//   nodemon({
//     script: 'app',
//     ext: 'js pug coffee vue',
//     stdout: false
//   }).on('readable', function () {
//     this.stdout.on('data', function (chunk) {
//       if (/^Express server listening on port/.test(chunk)) {
//         livereload.changed(__dirname);
//       }
//     });
//     this.stdout.pipe(process.stdout);
//     this.stderr.pipe(process.stderr);
//   });
// });
// gulp.task('clean', function (done) {
//   gulp.src(['./public/dist'])
//     .pipe(clean())
//     .on('end', done);
// });
gulp.task('default', [
  'sass',
  // 'develop',
  // 'md5:js',
  'watch'
]);
