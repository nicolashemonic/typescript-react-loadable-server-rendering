import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import App from "../universal/app";
import { StaticRouter } from "react-router";

const stats = require("../../client/reactLoadable.json");
const app = express();

app.use("/Client", express.static(path.join(__dirname, "..", "..", "Client")));

app.get("*", (req, res) => {
    let context = {};
    let modules: string[] = [];
    let html = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Loadable.Capture>
    );

    let bundles = getBundles(stats, modules);

    let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
    let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));

    res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My App</title>
        ${styles
            .map(style => {
                return `<link href="/client/${style.file}" rel="stylesheet"/>`;
            })
            .join("\n")}
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/client/main.js"></script>
        ${scripts
            .map(script => {
                return `<script src="/client/${script.file}"></script>`;
            })
            .join("\n")}
        <script>window.main();</script>
      </body>
    </html>
  `);
});

Loadable.preloadAll()
    .then(() => {
        app.listen(3000, () => {
            console.log("Running on http://localhost:3000/");
        });
    })
    .catch(err => {
        console.log(err);
    });
