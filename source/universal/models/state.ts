import { IAboutState } from "./about";
import { ILocationState } from "./location";

export interface IState {
    readonly about: IAboutState;
    readonly location: ILocationState;
}
