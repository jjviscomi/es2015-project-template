# ES2015 & ES6 Package/Project Skeleton

### Prerecs
  1. node & npm configured and installed
  2. phantomjs (brew install phantomjs)
  3. ... ???
  
### Setup
  1. Clone repo
  2. cd into directory
  3. update `package.json` (name, version, description, main, author)
  4. `npm install`
  5. resolve any issues.

### Run Gulp Default task
  1. `gulp`

### Project Structure
```text
/
|
|-- /libs  #Supporting External Libs, Not to be compiled with your project.
|
|-- /src   #Project source files, globbed /**/*.js.
|
|-- /docs  #Project YUIDocs generated documentation.
|
|-- /tests #Jasmine test files, globbed *.js.
|   |
|   |- /tests/helpers #Helpers required for your tests, globbed *.js.
|
|-- /dist  #Output of the compilation process.
|   |
|   |- /dist/development/ #Non-minified compiled results.
|   |
|   |- /dist/production/  #Minified compiled results to use in production.
|
|- /karma.conf.js 
|
|- /gulpfile.babel.js
|
|- /package.json
```

# Build Steps & Info

### Linting 
  The first step in the build process is passing your source files `'src/**/*.js', 'tests/*.spec.js', 'tests/helpers/*.js'` through [ESLint](http://eslint.org/). It only has a basic config located at `/.eslintrc`.
  
### Style Guidline & Presets
  The next step is the [JavaScript Code & Style](http://jscs.info/) we are using the presets as defined by [AirBnB](https://github.com/airbnb/javascript) while they are strict they have been adopted widley by the industry.
  
### Testing With Karma & Jasmine
  The next step applies the tests in `'tests/*.spec.js'`, it does this by using the [Karma](https://karma-runner.github.io) Server to spin up a [PhantomJS](http://phantomjs.org/) environment and run your [Jasmine](http://jasmine.github.io/) tests. You should have well covered code, and all new code must have a test in order to be pulled in.

### Transcompiling with Babel (ES2015 preset)
[Gulp](http://gulpjs.com/) the prefered build system / task runner is already configured to transcompile down to js. It uses [Babel](http://babeljs.io/docs/learn-es2015/) please check it out if you are not familiar with it. This step also concats all the files specified in `'src/**/*.js'` to `/dist/development/{package.json.main}`, so make sure you update `main`.

### YUIDocs generation
  The document generation is done automatically using the [YUIDocs](http://yui.github.io/yuidoc/) so make sure to check out their syntax. It is simple and generates a highquality documentation in `/docs/index.html` which you can pull up in any browser.
  
### Minification
  Minification is done wtih [Uglify](https://github.com/mishoo/UglifyJS) to perform basic compression and removing of comments. The output is placed `/dist/production/{package.json.main}` except the extension is renamed to `.min.js` from `.js`.
