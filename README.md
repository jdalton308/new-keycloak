# New Keycloak Theme

## Running Project Locally
After downloading and navigating into the project root, run `npm i`, then `npm run start`, which just starts local server on `localhost:8080`.


## Project Organization
#### Dependecy Management
Dependencies are handled through [npm](https://www.npmjs.com/). As long as you have node and npm installed, run `npm i` to install the project dependecies locally.  The dependencies can then be viewed within the `/package.json` file.


#### Building
Gulp is used as a build tool.  The config lives solely in the `/gulpfile.js` file.
- Starting local server with watch and livereload: `npm run start`, or `gulp`
- Building: `npm run build`, or `gulp build`


#### JS
All of the logic, as well as helper functions, are found in the `/src/js` directory.  When developing, edit the files here only.  Any edits to files within the `/build/` directory will be overwritten and lost.

[Babel](https://babeljs.io/) is used to take advantage of the latest js specs, so ES2015 syntax is used throughout.


#### CSS
Sass is used as a CSS precompiler, and the .scss files are found in the `/src/css/` directory.  The variables and mixins can be found in the `_variables.scss` file, general and shared styling are found in the `_general.scss` file, and then the more specific styles are in `_page.scss`.

#### HTML
HTML files are minified using a gulp task, and piped from the `/src/` directory to the `/build/`.