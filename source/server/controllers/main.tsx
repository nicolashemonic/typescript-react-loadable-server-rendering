import express, { Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { getBundles, IReactLoadableWebpackBundle } from "react-loadable/webpack";
import { Provider } from "react-redux";
import { matchPath, StaticRouter } from "react-router";
import serialize from "serialize-javascript";

import { setApiUrls } from "../../universal/actions";
import App from "../../universal/app";
import { IState } from "../../universal/models";
import { routes } from "../../universal/routes";
import createStore from "../../universal/store";
import { buildApi } from "../builders";

const stats = require("../stats/reactLoadable.json");

export default function mainController(req: Request, res: Response) {
    const promises: Promise<any>[] = [];
    const store = createStore();

    store.dispatch(setApiUrls(buildApi(req.protocol, req.get("host") as string)));

    routes.some(route => {
        const match = matchPath(req.path, route);
        if (match && route.fetchData) {
            promises.push(store.dispatch(route.fetchData()));
        }
        return !!match;
    });

    Promise.all(promises).then(() => {
        let modules: string[] = [];
        let context = {};
        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        );
        const bundles = getBundles(stats, modules);
        const styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
        const scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));
        const preloadedState = store.getState();
        res.send(renderFullPage(html, styles, scripts, preloadedState));
    });
}

function renderFullPage(
    html: string,
    styles: IReactLoadableWebpackBundle[],
    scripts: IReactLoadableWebpackBundle[],
    preloadedState: IState
) {
    const stylesHtml = styles
        .map(style => `<link href="/static/${style.file}" rel="stylesheet"/>`)
        .join("\n");
    const scriptsHtml = scripts
        .map(script => `<script src="/static/js/${script.file}"></script>`)
        .join("\n");
    //const __PRELOADED_STATE__ = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
    const __PRELOADED_STATE__ = serialize(preloadedState, { isJSON: true });
    //const __PRELOADED_STATE__ = JSON.stringify(preloadedState);

    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico">
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
        <script src="/static/js/main.js"></script>
        ${scriptsHtml}
        <script>window.main();</script>
      </body>
    </html>
  `;
}
