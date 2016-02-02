# ES2015 & ES6 Package/Project Skeleton

### Prerecs
  1. node & npm configured and installed (`nvm install v5.X.X`)
  2. `npm install -g gulp`
  3. phantomjs (`brew install phantomjs`, not required but recommended)
  4. ... ???

### Setup
  1. fork repo
  2. cd into directory
  3. update `package.json` (name, version, description, main, author)
  4. `npm install`
  5. resolve any issues.

### Run Gulp Default task
  1. From the project root run `gulp`, this will setup watchers for the proper
  directories to monitor and build your project as changes are made.

### Project Structure
```coffeescript
/
|
|-- /.eslintrc # Default Configuration file for ESLint.
|
|-- /.jscsrc   # Default Configuration file for JSCS.
|
|-- /libs/     # Supporting External Libs, Not to be compiled with your project.
|
|-- /src/      # Project source files, globbed **/*.js.
|
|-- /docs/     # Project YUIDocs generated documentation, index.html.
|
|-- /tests/    # Jasmine test files, globbed *.spec.js.
|   |
|   |- /tests/helpers/
|              # Helpers required for your tests, globbed *.js.
|
|-- /dist/     # Output of the compilation process.
|   |
|   |- /dist/development/*.js
|   |          # Non-minified compiled results.
|   |
|   |- /dist/production/*.min.js  
|              # Minified compiled results to use in production.
|
|- /karma.conf.js
|              # Default Configuration file for Karma Server.
|
|- /gulpfile.babel.js
|              # Default Configuration file for Gulp.
|
|- /package.json
               # Default npm package inventory.
```

# Build Steps & Info

### Linting
  The first step in the build process is parsing your source files `'src/**/*.js', 'tests/*.spec.js', 'tests/helpers/*.js'` through [ESLint](http://eslint.org/). It only has a basic config located at `/.eslintrc`.

### Style Guidelines & Presets
  The next step is the [JavaScript Code & Style](http://jscs.info/) we are using the presets as defined by [AirBnB](https://github.com/airbnb/javascript) while they are strict they have been adopted widley by the industry.

### Testing With Karma & Jasmine
  The next step applies the tests in `'tests/*.spec.js'`, it does this by using the [Karma](https://karma-runner.github.io) Server to spin up a [PhantomJS](http://phantomjs.org/) environment and run your [Jasmine](http://jasmine.github.io/) tests. You should have well covered code, and all new code must have a test in order to be pulled in.

### Transcompiling with Babel (ES2015 preset)
  The [Gulp](http://gulpjs.com/) build system / task runner is configured to transcompile [Babel](http://babeljs.io/docs/learn-es2015/) please check it out if you are not familiar with it. This step also concats all the files specified in `'src/**/*.js'` to `/dist/development/{package.json.main}`, so make sure you update `main`. A good info page for people coming from [CoffeeScript](http://coffeescript.org/) is [Here](https://gist.github.com/danielgtaylor/0b60c2ed1f069f118562), I recommend it!

### YUIDocs generation
  The document generation is done automatically using the [YUIDocs](http://yui.github.io/yuidoc/) so make sure to check out their syntax. It is simple and generates a high quality documentation in `/docs/index.html` which you can pull up in any browser. [YUIDocs Syntax Refrence](http://yui.github.io/yuidoc/syntax/index.html).

### Minification
  Minification is done with [Uglify](https://github.com/mishoo/UglifyJS) to perform basic compression and removing of comments. The output is placed `/dist/production/{package.json.main}` except the extension is renamed to `.min.js` from `.js`.

# Project Source Files
