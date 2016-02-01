import gulp        from 'gulp';
import replace     from 'gulp-ext-replace';
import stripDebug  from 'gulp-strip-debug';
import vinylPaths  from 'vinyl-paths';
import plumber     from 'gulp-plumber';
import watch       from 'gulp-watch';
import batch       from 'gulp-batch';
import del         from 'del';
import fs          from 'fs';
import gulpUtil    from 'gulp-util';
import jscs        from 'gulp-jscs';
import eslint      from 'gulp-eslint';
import karma       from 'karma';
import jasmine     from 'gulp-jasmine';
import sourcemaps  from 'gulp-sourcemaps';
import babel       from 'gulp-babel';
import concat      from 'gulp-concat';
import yuidoc      from 'gulp-yuidoc';
import uglify      from 'gulp-uglify';

const settings = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('running', () => {
  return gulpUtil.log('Gulp is running!')
});

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['src/**/*.js', 'tests/*.spec.js', 'tests/helpers/*.js', '!libs/**', '!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('jscs', () => {
  return gulp.src(['src/**/*.js', 'tests/*.spec.js', 'tests/helpers/*.js'])
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task('test', ['lint', 'jscs'], (done) => {
  return new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('compile', ['test'], () => {
    return gulp.src(['src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat(settings.main))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/development'));
});

gulp.task('clean', () => {
	return gulp.src('docs/*', {read: false})
    .pipe(vinylPaths(del))
    .pipe(stripDebug())
    .pipe(gulp.dest('docs'));
});

gulp.task('docs', ['clean'], () => {
  console.log("DOCS::: ", arguments.length);
  return gulp.src('src/**/*.js')
    .pipe(yuidoc.parser())
    .pipe(yuidoc.reporter())
    .pipe(yuidoc.generator())
    .pipe(gulp.dest('docs'));
});

gulp.task('build', ['compile'], () => {
  return gulp.src('dist/development/*.js')
    .pipe(replace('.min.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/production'));
});

gulp.task('default', () => {
  gulp.watch(['tests/*.spec.js', 'tests/helpers/*.js', 'src/**/*.js'], (event) => {
    gulp.start('build');
  });

  gulp.watch('dist/development/*.js', (event) => {
    gulp.start('docs');
  });
});
