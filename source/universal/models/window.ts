import { IState } from "../models";

declare global {
    interface Window {
        main: () => void;
        __PRELOADED_STATE__: IState;
    }
}
