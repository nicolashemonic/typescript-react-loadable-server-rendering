import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import App from "../universal/app";
import { StaticRouter, matchPath } from "react-router";
import createStore from "../universal/Store";
import { Provider } from "react-redux";
import { routes } from "../universal/Routes";

const stats = require("../../client/reactLoadable.json");
const app = express();

app.use("/client", express.static(path.join(__dirname, "..", "..", "client")));
app.use(handleRender);

function handleRender(req, res) {
    let context = {};
    const promises = [];
    const modules: string[] = [];
    const store = createStore();
    const html = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        </Loadable.Capture>
    );

    routes.some(route => {
        const match = matchPath(req.path, route);
        if (match && route.fetchData) {
            promises.push(store.dispatch(route.fetchData()));
        }
        return match as any;
    });

    Promise.all(promises).then(() => {
        const preloadedState = store.getState();
        const bundles = getBundles(stats, modules);
        const styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
        const scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));
        res.send(renderFullPage(html, styles, scripts, preloadedState));
    });
}

function renderFullPage(html, styles, scripts, preloadedState) {
    const stylesHtml = styles
        .map(style => `<link href="/client/${style.file}" rel="stylesheet"/>`)
        .join("\n");
    const scriptsHtml = scripts
        .map(script => `<script src="/client/${script.file}"></script>`)
        .join("\n");
    const __PRELOADED_STATE__ = JSON.stringify(preloadedState).replace(/</g, "\\u003c");

    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My App</title>
        ${stylesHtml}
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${__PRELOADED_STATE__}
        </script>
        <script src="/client/main.js"></script>
        ${scriptsHtml}
        <script>window.main();</script>
      </body>
    </html>
  `;
}

Loadable.preloadAll()
    .then(() => {
        app.listen(3000, () => {
            console.log("Running on http://localhost:3000/");
        });
    })
    .catch(err => {
        console.log(err);
    });
