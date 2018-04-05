import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { IState } from "../models";

export type AboutAction =
    | FetchDescriptionFailure
    | FetchDescriptionRequest
    | FetchDescriptionSuccess;

export const FETCH_DESCRIPTION_REQUEST = "FETCH_DESCRIPTION_REQUEST";
export const FETCH_DESCRIPTION_FAILURE = "FETCH_DESCRIPTION_FAILURE";
export const FETCH_DESCRIPTION_SUCCESS = "FETCH_DESCRIPTION_SUCCESS";

export const fetchDescriptionRequest = () => ({
    type: FETCH_DESCRIPTION_REQUEST as typeof FETCH_DESCRIPTION_REQUEST,
    isLoading: true
});
export const fetchDescriptionFailure = () => ({
    type: FETCH_DESCRIPTION_FAILURE as typeof FETCH_DESCRIPTION_FAILURE,
    isLoading: false
});
export const fetchDescriptionSuccess = (description: string) => ({
    type: FETCH_DESCRIPTION_SUCCESS as typeof FETCH_DESCRIPTION_SUCCESS,
    receivedAt: Date.now(),
    description: description,
    isLoading: false
});

export type FetchDescriptionRequest = ReturnType<typeof fetchDescriptionRequest>;
export type FetchDescriptionFailure = ReturnType<typeof fetchDescriptionFailure>;
export type FetchDescriptionSuccess = ReturnType<typeof fetchDescriptionSuccess>;

export const fetchDescription: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = () => {
    return (dispatch, getState) => {
        dispatch(fetchDescriptionRequest());
        return new Promise(resolve => {
            setTimeout(() => resolve(dispatch(fetchDescriptionSuccess("About Description"))), 1000);
        });
    };
};
