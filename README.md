# resmon-guiclient
Repository for a guiclient component, which is part of resmon product.

## Development
- install npm
- install yarn globally: `npm install --global yarn`
- run `yarn` to install dependencies
- run `yarn test` to test (with watch)
- run `yarn start` to start dev server (with watch)
- run `yarn run-test-servers` to start fake auth server _(localhost:3001)_ and monitor _(localhost:3002)_
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
- run `yarn test:nowatch` to test
- run `yarn build` to build