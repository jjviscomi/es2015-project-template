import gulp        from 'gulp';
import gif      from 'gulp-if';
import gmatch      from 'gulp-match';
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

const testHelpersCondition = (file) => {
  return gmatch(file, 'test/helpers/*.js');
};

gulp.task('running', () => {
  return gulpUtil.log('Gulp is running!');
});

gulp.task('testHelpers', () => {
  return gulp.src('tests/helpers/*.js')
    .pipe(gif(testHelpersCondition, eslint()))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', 'tests/*.spec.js', '!libs/**', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jscs', () => {
  return gulp.src(['src/**/*.js', 'tests/*.spec.js'])
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task('test', ['testHelpers', 'lint', 'jscs'], (done) => {
  return new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

gulp.task('compile', ['test'], () => {
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat(settings.main))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/development'));
});

gulp.task('clean', () => {
  return gulp.src('docs/*', { read: false })
    .pipe(vinylPaths(del))
    .pipe(stripDebug())
    .pipe(gulp.dest('docs'));
});

gulp.task('docs', ['clean'], () => {
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
