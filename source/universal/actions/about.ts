import axios from "axios";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { IAbout, IState } from "../models";

export type AboutAction =
    | FetchDescriptionFailure
    | FetchDescriptionRequest
    | FetchDescriptionSuccess;

export const FETCH_ABOUT_REQUEST = "FETCH_ABOUT_REQUEST";
export const FETCH_ABOUT_FAILURE = "FETCH_ABOUT_FAILURE";
export const FETCH_ABOUT_SUCCESS = "FETCH_ABOUT_SUCCESS";

export const fetchAboutRequest = () => ({
    type: FETCH_ABOUT_REQUEST as typeof FETCH_ABOUT_REQUEST,
    isLoading: true
});
export const fetchAboutFailure = () => ({
    type: FETCH_ABOUT_FAILURE as typeof FETCH_ABOUT_FAILURE,
    isLoading: false
});
export const fetchAboutSuccess = (about: IAbout) => ({
    type: FETCH_ABOUT_SUCCESS as typeof FETCH_ABOUT_SUCCESS,
    receivedAt: Date.now(),
    description: about.description,
    isLoading: false
});

export type FetchDescriptionRequest = ReturnType<typeof fetchAboutRequest>;
export type FetchDescriptionFailure = ReturnType<typeof fetchAboutFailure>;
export type FetchDescriptionSuccess = ReturnType<typeof fetchAboutSuccess>;

export const fetchDescription: ActionCreator<ThunkAction<Promise<void>, IState, void>> = () => {
    return async (dispatch, getState) => {
        dispatch(fetchAboutRequest());
        try {
            const url = getState().api.aboutUrl;
            const response = await axios.get<IAbout>(url);
            dispatch(fetchAboutSuccess(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};
