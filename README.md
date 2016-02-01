# ES2015 & ES6 Package/Project Skeleton

### Project Structure
```bash
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
