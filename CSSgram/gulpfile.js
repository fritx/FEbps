const gulp = require('gulp')
const sass = require('gulp-sass')
const bulkSass = require('gulp-sass-bulk-import')
const prefix = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')

gulp.task('site-scss', () => {
  return gulp.src('scss/site/**/*.scss')
    .pipe(bulkSass())
    .pipe(sass())
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('watch', () => {
  gulp.watch('scss/site/**/*.scss', ['site-scss'])
})

gulp.task('default', ['site-scss', 'watch'])
