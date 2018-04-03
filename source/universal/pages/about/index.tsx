import React from "react";
//import { LoadableDescription } from "../../loadable/components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleDescriptionVisibility } from "../../actions";

const About = props => {
    return (
        <div>
            <h1>About</h1>
            <Link to="/">To Home</Link>
            <p>
                <button onClick={props.toggleDescriptionVisiblity}>Toggle Description</button>
            </p>
            {props.visibleDescription && <p>{props.description}</p>}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        visibleDescription: state.about.visibleDescription,
        description: state.about.description
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleDescriptionVisiblity: () => {
            return dispatch(toggleDescriptionVisibility());
        }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(About);
