export type AboutAction =
    | IToggleDescriptionVisiblity
    | IFetchDescriptionFailure
    | IFetchDescriptionRequest
    | IFetchDescriptionSuccess;

export interface IToggleDescriptionVisiblity {
    type: "TOGGLE_DESCRIPTION_VISIBLITY";
}

export type toggleDescriptionVisibility = () => any;

export const toggleDescriptionVisibility: toggleDescriptionVisibility = (): AboutAction => {
    return {
        type: "TOGGLE_DESCRIPTION_VISIBLITY"
    };
};

export interface IFetchDescriptionRequest {
    type: "FETCH_DESCRIPTION_REQUEST";
}

export interface IFetchDescriptionSuccess {
    type: "FETCH_DESCRIPTION_SUCCESS";
    receivedAt: number;
    description: string;
}

export interface IFetchDescriptionFailure {
    type: "FETCH_DESCRIPTION_FAILURE";
}

export function fetchDescriptionRequest(): AboutAction {
    return {
        type: "FETCH_DESCRIPTION_REQUEST"
    };
}

export function fetchDescriptionSuccess(description: string): AboutAction {
    return {
        type: "FETCH_DESCRIPTION_SUCCESS",
        receivedAt: Date.now(),
        description: description
    };
}

export function fetchDescriptionFailure(): AboutAction {
    return {
        type: "FETCH_DESCRIPTION_FAILURE"
    };
}

export const fetchDescription = () => {
    return (dispatch, getState) => {
        dispatch(fetchDescriptionRequest());
        return new Promise(resolve => {
            setTimeout(() => resolve(dispatch(fetchDescriptionSuccess("About Description"))), 1000);
        });
    };
};
