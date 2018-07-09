# Phoenix API

## Development mode with watching file changes

Create a config.json file in /config directory. A template is provided in the same directory.
Run `npm install` to install dependencies.
Run `npm run watch` to build the project and to watch file changes. The build artifacts will be stored in the `dist/` directory.
Run `npm run server` in new terminal to start api server in development mode

## Development mode without watching file changes

Create a config.json file in /config directory. A template is provided in the same directory.
Run `npm install` to install dependencies.
Run `npm run api` to build the project and run api server in development mode

## Production mode

Create a config.json file in /config directory. A template is provided in the same directory.
Run `npm install` to install dependencies.
Run `build:prod` to build the project in production mode. The build artifacts will be stored in the `dist/` directory.
Run `npm run server:prod` to run the NodeJs server.
