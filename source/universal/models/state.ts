import { IAboutState } from "./about";
import { IApiState } from "./api";
import { ILocationState } from "./location";

export interface IState {
    readonly about: IAboutState;
    readonly api: IApiState;
    readonly location: ILocationState;
}
