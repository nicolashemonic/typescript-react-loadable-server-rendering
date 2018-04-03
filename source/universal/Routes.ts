import { fetchDescription } from "./actions";
import { LoadableAbout, LoadableHome } from "./loadable/pages";

export const routes = [
    {
        path: "/",
        exact: true,
        component: LoadableHome
    },
    {
        path: "/about",
        component: LoadableAbout,
        fetchData: fetchDescription
    }
];
