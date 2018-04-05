import { AboutState } from "../reducers/about";
import { LocationState } from "../reducers/location";

export interface IState {
    readonly about: AboutState;
    readonly location: LocationState;
}
