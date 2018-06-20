# resmon-guiclient

Repository for a GUI client component, which is part of ResMon software. It is destinated to web browsers and need to be served by any valid web server such as webpack-dev-server, apache2, nginx and so on...

It is designed to work along monitors (at least one) with authorization server. All of mentioned addresses could be built into distribution package. Also these values could be changed by users in the client and stored in browser local storage.

## Installation

You can download the latest version of guiclient (or previous if you want) as a release in github service.

The package contains 2 files:
- `index.html` - main file with GUI application,
- `.htaccess` - configuration file for apache2 web server.

We assume Apache2 web server is already installed on the machine. You need to create new apache vhost with overriding access (for `.htaccess` file) to serve GUI in order to server GUI correctly. An example configuration is listed below:

```
<VirtualHost resmon.tbajorek.pl:80>
    ServerAdmin [enter desired server admin email here]
    ServerName [enter desired domain here]
    ServerAlias www.[enter desired domain here]
    DocumentRoot [enter folder path containing files from release]
    <Directory "[enter folder path containing files from release]">
        AllowOverride All
    </Directory>
</VirtualHost>
```

## Development
- install npm
- install yarn globally: `npm install --global yarn`
- run `yarn` to install dependencies
- run `yarn test` to test (use `--watch` to run in watch)
- run `yarn start` to start dev server (with watch)
- run `yarn lint-check` to start dev server (with watch)
- you may want to install react and [redux](https://github.com/zalmoxisus/redux-devtools-extension) plugins for browsers

## Structure overview
- `/src/components` contains pure react components (without redux integration)
- `/src/containers` contains react components which are connected to redux
- `/src/pages` contains page-level react components
- `/src/reducers` contains redux reducers - pure functions transforming store to another state
- `/src/actions` contains action creators - functions returning actions that could be directly dispatched by redux
- `/src/api.js` constains functions making api calls and returning promise-like object
- `/src/index.js` entry file

## CI
- install npm
- install yarn globally: `npm install --global yarn`
- run `yarn` to install dependencies
- run `yarn test` to test
- run `yarn lint-check` to start dev server (with watch)
- run `yarn build` to build GUI client to `/dist` folder - in result we'll have `.htaccess` config file fo apache2 and `index.html` for browsers
- run `yarn build:separate-js` to build GUI client to `/dist` folder including javascript bundle as separate file - in result we'll have `.htaccess` config file for apache2, `index.html` fo browsers and `main.js` as javascript application script connected to html file
- run `AUTH_SERVER=bleh1 MONITORS=[{\"address\":\"aaa\",\"description\":\"bbb\"}] yarn build` to build with different auth server or monitor list 
- run `yarn doc` to generate docs in `/docs`
