// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    plugins : [
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
      'karma-babel-preprocessor'
    ],
    preprocessors: {
        'src/**/*.js': ['babel'],
        'tests/helpers/*.js': ['babel'],
        'tests/*.spec.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      },
    },
    files: [
      'src/**/*.js',
      'tests/helpers/*.js',
      'tests/*.spec.js'
    ]
  });
};
