import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { IState } from "../models";

export type AboutAction =
    | IFetchDescriptionFailure
    | IFetchDescriptionRequest
    | IFetchDescriptionSuccess;

export interface IFetchDescriptionRequest extends Action {
    type: "FETCH_DESCRIPTION_REQUEST";
}

export interface IFetchDescriptionSuccess extends Action {
    type: "FETCH_DESCRIPTION_SUCCESS";
    receivedAt: number;
    description: string;
}

export interface IFetchDescriptionFailure extends Action {
    type: "FETCH_DESCRIPTION_FAILURE";
}

const fetchDescriptionRequest: ActionCreator<IFetchDescriptionRequest> = () => ({
    type: "FETCH_DESCRIPTION_REQUEST"
});

const fetchDescriptionSuccess: ActionCreator<IFetchDescriptionSuccess> = (description: string) => ({
    type: "FETCH_DESCRIPTION_SUCCESS",
    receivedAt: Date.now(),
    description: description
});

const fetchDescriptionFailure: ActionCreator<IFetchDescriptionFailure> = () => ({
    type: "FETCH_DESCRIPTION_FAILURE"
});

export const fetchDescription: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = () => {
    return (dispatch, getState) => {
        dispatch(fetchDescriptionRequest());
        return new Promise(resolve => {
            setTimeout(() => resolve(dispatch(fetchDescriptionSuccess("About Description"))), 1000);
        });
    };
};
