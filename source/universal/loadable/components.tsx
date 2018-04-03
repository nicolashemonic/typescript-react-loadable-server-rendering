import Loadable from "react-loadable";
import Loading from "../components/loading";

export const LoadableDescription = Loadable({
    loader: () => import(/* webpackChunkName: "description" */ "../components/description"),
    loading: Loading
});
