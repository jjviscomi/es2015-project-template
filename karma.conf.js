// karma.conf.js
module.exports = (config) => {
  config.set({
    frameworks: ['commonjs', 'jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
       'karma-commonjs',
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
      'karma-babel-preprocessor',
    ],
    preprocessors: {
      'src/**/*.js': ['babel', 'commonjs'],
      'tests/helpers/*.js': ['babel', 'commonjs'],
      'tests/*.spec.js': ['babel', 'commonjs'],
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
      },
    },
    files: [
      { pattern: 'src/**/*.js', load: false },
      { pattern: 'tests/helpers/*.js', load: false },
      { pattern: 'tests/*.spec.js', load: false },
    ],
  });
};
