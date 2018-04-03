export type LocationAction = ISetLocationChanged;

export interface ISetLocationChanged {
    type: "SET_LOCATION_CHANGED";
    locationChanged: boolean;
}

export type setLocationChanged = () => any;

export const setLocationChanged: setLocationChanged = (): LocationAction => {
    return {
        type: "SET_LOCATION_CHANGED",
        locationChanged: true
    };
};
