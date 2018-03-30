import React from "react";

export default function Loading(props) {
    if (props.isLoading) {
        if (props.timedOut) {
            return <p>Loader timed out!</p>;
        } else if (props.pastDelay) {
            return <p>Loading...</p>;
        } else {
            return null;
        }
    } else if (props.error) {
        return <p>Error! Component failed to load</p>;
    } else {
        return null;
    }
}
