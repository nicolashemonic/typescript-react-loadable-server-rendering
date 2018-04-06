import "babel-polyfill";

import express from "express";
import Loadable from "react-loadable";

import mainController from "./controllers/main";
import routesApi from "./routes/api";

const app = express();

app.use("/client", express.static("client"));
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
