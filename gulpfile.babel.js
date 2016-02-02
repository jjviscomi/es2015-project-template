import gulp        from 'gulp';
import header      from 'gulp-header';
import template    from 'gulp-template';
import gif         from 'gulp-if';
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
import browserify  from 'browserify';
import babelify    from 'babelify';
import buffer      from 'vinyl-buffer';
import rename      from 'gulp-rename';
import source      from 'vinyl-source-stream';
import concat      from 'gulp-concat';
import yuidoc      from 'gulp-yuidoc';
import uglify      from 'gulp-uglify';

const settings = JSON.parse(fs.readFileSync('./package.json'));

const testHelpersCondition = (file) => {
  return gmatch(file, 'test/helpers/*.js');
};

const bundleJS = (bundler) => {
  return bundler.bundle()
    .pipe(source('dist/development/' + settings.name + '.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/production'));

    // .pipe(rename('development.min.js'));
    // .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(uglify())
    // .pipe(sourcemaps.write('.'))
    // .pipe(gulp.dest('dist/production'));

};

gulp.task('polyfill', () => {
  return gulp.src('node_modules/babel-polyfill/dist/polyfill.js')
    .pipe(gulp.dest('src/babel'));
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
  return gulp.src(['!src/babel/**', 'src/**/*.js', 'tests/*.spec.js', '!libs/**', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jscs', () => {
  return gulp.src(['!src/babel/**', 'src/**/*.js', 'tests/*.spec.js', '!libs/**', '!node_modules/**'])
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task('test', ['polyfill', 'testHelpers', 'lint', 'jscs'], (done) => {
  return new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

gulp.task('header', () => {
  return gulp.src('header.template.js')
    .pipe(template(settings))
    .pipe(replace('.js', '.template.js'))
    .pipe(gulp.dest('src/templates'));
});

gulp.task('compile', ['test', 'header'], () => {
  return gulp.src(['!src/babel/**', 'src/templates/header.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-classes'],
    }))
    .pipe(concat(settings.name + '.js'))
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
  return gulp.src(['!src/babel/**', 'src/**/*.js'])
    .pipe(yuidoc.parser())
    .pipe(yuidoc.reporter())
    .pipe(yuidoc.generator())
    .pipe(gulp.dest('docs'));
});

gulp.task('include-babel-pollyfill', () => {
  return gulp.src('dist/development/' + settings.name + '.js')
    .pipe(header(fs.readFileSync('src/babel/polyfill.js', 'utf8'), {}))
    .pipe(replace('.js', '.template.js'))
    .pipe(gulp.dest('dist/development/'));
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
  gulp.watch('tests/helpers/*.js', (event) => {
    if (testHelpersCondition) {
      gulp.start('build');
    }
  });

  gulp.watch(['tests/*.spec.js', 'src/**/*.js'], (event) => {
    gulp.start('build');
  });

  gulp.watch('dist/development/*.js', (event) => {
    gulp.start('docs');
  });

  gulp.watch('dist/development/' + settings.name + '.js', (event) => {
    gulp.start('include-babel-pollyfill');
  });
});

gulp.task('browserify', () => {
  const bundler = browserify('dist/development/' + settings.name + '.js', { debug: true }).transform(babelify, { presets: ['es2015'] });

  return bundleJS(bundler);
});
