### TypeScript, Code splitting and Server rendering

A simple React project to demonstrate how to achieve code splitting plus server rendering using TypeScript.

Its main purpose is to respond to this questions:

- How to implement React code splitting ?
- How to implement React server rendering ?
- How to use Redux with server rendering ?
- How to use React Router in both case ?
- How to build all this features ?

And the last but not the least, this project demonstrate and explain how to make compatible and take advantage of TypeScript in all this features.

### Quick Start

Install     
```npm install```

Build   
```npm run build-dev```

Run     
```npm run serve```

### Built on top

This project implements the minimal requirement to demonstrate its purpose.

- TypeScript v2.8

Universal

- React v16.3
- React Loadable v5
- React Redux v5
- React Router v4

Server

- Express v4
- Express es6 template engine

Build tools

- Webpack v4
- Babel v6
- TypeScript loader

### Code

Source code is under ```source``` folder.

Server code is built into ```server``` folder.

Client code is built into ```client``` folder.

### Build process

The application is built through Webpack.

Code splitting is made possible using React Loadable and Webpack dynamic imports.

Server rendering is dependent on these build step:

1. TypeScript type check and emit JavaScript es2015 (TypeScript without types) consumable by Babel
2. Babel transform React jsx and es2015 synthax into code understandable
 by the browser
3. Babel apply plugins to make code splitting compatible with server rendering

### Documentation

This sample project was made according to these documentations.

Code Splitting

- [React](https://reactjs.org/docs/code-splitting.html)
- [React Loadable](https://github.com/jamiebuilds/react-loadable#------------guide)
- [React Router](https://reacttraining.com/react-router/web/guides/code-splitting)
- [Webpack](https://webpack.js.org/guides/code-splitting)

Server Rendering

- [React](https://reactjs.org/docs/react-dom-server.html)
- [React Loadable](https://github.com/jamiebuilds/react-loadable#------------server-side-rendering)
- [React Router](https://reacttraining.com/react-router/web/guides/server-rendering)
- [Redux](https://redux.js.org/recipes/server-rendering)

