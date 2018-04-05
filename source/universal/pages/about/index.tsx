import React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Action, Dispatch } from "redux";

import { fetchDescription } from "../../actions";
import { IState } from "../../models";

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
interface IAboutOwnProps extends RouteComponentProps<undefined> {}
interface IAboutProps extends MapStateToProps, MapDispatchToProps, IAboutOwnProps {}

const mapStateToProps = (state: IState, ownProps: IAboutOwnProps) => ({
    locationChanged: state.location.locationChanged,
    description: state.about.description,
    isLoading: state.about.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IAboutOwnProps) => ({
    fetchDescription: () => {
        return dispatch(fetchDescription());
    }
});

class About extends React.Component<IAboutProps> {
    constructor(props: IAboutProps) {
        super(props);
    }
    componentDidMount() {
        if (this.props.locationChanged) {
            this.props.fetchDescription();
        }
    }
    description() {
        return this.props.isLoading ? <p>Loading...</p> : <p>{this.props.description}</p>;
    }
    render() {
        return (
            <div>
                <h1>About</h1>
                <Link to="/">To Home</Link>
                {this.description()}
            </div>
        );
    }
}

export default connect<MapStateToProps, MapDispatchToProps, IAboutOwnProps, IState>(
    mapStateToProps,
    mapDispatchToProps
)(About);
