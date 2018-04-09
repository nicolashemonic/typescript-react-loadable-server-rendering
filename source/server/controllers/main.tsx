import express, { Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { Provider } from "react-redux";
import { matchPath, StaticRouter } from "react-router";
import serialize from "serialize-javascript";

import { setApiUrls } from "../../universal/actions";
import App from "../../universal/app";
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
        const styles = bundles
            .filter(bundle => bundle.file.endsWith(".css"))
            .map(style => `<link href="/static/${style.file}" rel="stylesheet"/>`)
            .join("\n");
        const scripts = bundles
            .filter(bundle => bundle.file.endsWith(".js"))
            .map(script => `<script src="/static/js/${script.file}"></script>`)
            .join("\n");
        const state = store.getState();
        const preloadedState = serialize(state, { isJSON: true });

        res.render("index", {
            locals: {
                html: html,
                styles: styles,
                scripts: scripts,
                preloadedState: preloadedState
            }
        });
    });
}
