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
