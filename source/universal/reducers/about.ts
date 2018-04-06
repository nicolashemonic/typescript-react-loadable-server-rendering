import {
    AboutAction,
    FETCH_ABOUT_FAILURE,
    FETCH_ABOUT_REQUEST,
    FETCH_ABOUT_SUCCESS
} from "../actions";
import { IAboutState } from "../models";

const initialAboutState = (): IAboutState => ({
    description: "",
    receivedAt: 0,
    isLoading: false
});

export default function about(state = initialAboutState(), action: AboutAction): IAboutState {
    switch (action.type) {
        case FETCH_ABOUT_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case FETCH_ABOUT_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                receivedAt: action.receivedAt,
                description: action.description
            };
        case FETCH_ABOUT_FAILURE:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}
