# New Keycloak Theme
Development exercise for Bigger Pockets application

## Running Project Locally
After downloading and navigating into the project root, run `npm i`, then `npm run start`, which just starts the webpack-dev-server on `localhost:8080`.


## Project Organization
#### Dependecy Management
Dependencies are handled through [npm](https://www.npmjs.com/). As long as you have node and npm installed, run `npm i` to install the project dependecies locally.  The dependencies can then be viewed within the `/package.json` file.


#### JS
All of the logic, as well as helper functions, are found in the `/src/js` directory.  When developing, edit the files here, as these are then bundled together, along with the css, using [webpack](https://webpack.js.org/).

Within webpack, [Babel](https://babeljs.io/) is used to take advantage of the latest js specs, so ES2015 syntax is used throughout.

There is also a `/src/utils/` folder, which contains some shared functions.


#### CSS
Using webpack, Sass is used as a CSS precompiler, and the .scss files are found in the `/src/css/` directory.  The variables and mixins can be found in the `_variables.scss` file, general and shared styling are found in the `_general.scss` file, and then the more specific styles are in `_page.scss`.
