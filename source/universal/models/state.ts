import { AboutState } from "../reducers/about";
import { ApiState } from "../reducers/api";
import { LocationState } from "../reducers/location";

export interface IState {
    readonly about: AboutState;
    readonly location: LocationState;
    readonly api: ApiState;
}
