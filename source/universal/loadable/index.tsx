import Loadable from "react-loadable";
import Loading from "../components/loading";

export const LoadableHome = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ "../pages/home"),
    loading: Loading
});

export const LoadableAbout = Loadable({
    loader: () => import(/* webpackChunkName: "about" */ "../pages/about"),
    loading: Loading
});
