import React from "react";
//import { LoadableDescription } from "../../loadable/components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleDescriptionVisibility, fetchDescription } from "../../actions";

class About extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.locationChanged) {
            this.props.fetchDescription();
        }
    }
    description() {
        if (this.props.visibleDescription) {
            if (this.props.isLoading) {
                return <p>Loading...</p>;
            }
            return <p>{this.props.description}</p>;
        }
        return null;
    }
    render() {
        return (
            <div>
                <h1>About</h1>
                <Link to="/">To Home</Link>
                <p>
                    <button onClick={this.props.toggleDescriptionVisiblity}>
                        Toggle Description
                    </button>
                </p>
                {this.description()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        visibleDescription: state.about.visibleDescription,
        description: state.about.description,
        isLoading: state.about.isLoading,
        locationChanged: state.location.locationChanged
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleDescriptionVisiblity: () => {
            return dispatch(toggleDescriptionVisibility());
        },
        fetchDescription: () => {
            return dispatch(fetchDescription());
        }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(About);
