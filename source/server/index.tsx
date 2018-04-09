import "babel-polyfill";

import express from "express";
import Loadable from "react-loadable";
import es6Renderer from "express-es6-template-engine";

import mainController from "./controllers/main";
import routesApi from "./routes/api";

const app = express();

app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

app.use("/static", express.static("static"));
app.use("/static/js", express.static("client"));
app.use("/api", routesApi);
app.use(mainController);

Loadable.preloadAll()
    .then(() => {
        app.listen(3000, () => {
            console.log("Running on http://localhost:3000/");
        });
    })
    .catch(err => {
        console.log(err);
    });
