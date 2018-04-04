import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { fetchDescription, IFetchDescriptionSuccess } from "../../actions";
import { IState } from "../../models";
import { Action } from "redux";

interface IMapStateToProps {
    locationChanged: boolean;
    description: string;
    isLoading: boolean;
}

interface IMapDispatchToProps {
    fetchDescription: () => Promise<Action>;
}

interface IAboutOwnProps extends RouteComponentProps<any> {}

interface IAboutProps extends IMapStateToProps, IMapDispatchToProps, IAboutOwnProps {}

class About extends React.Component<IAboutProps, undefined> {
    constructor(props) {
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

const mapStateToProps: MapStateToProps<IMapStateToProps, IAboutOwnProps, IState> = (
    state,
    ownProps
) => ({
    locationChanged: state.location.locationChanged,
    description: state.about.description,
    isLoading: state.about.isLoading
});

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, IAboutOwnProps> = (
    dispatch,
    ownProps
) => ({
    fetchDescription: () => {
        return dispatch(fetchDescription());
    }
});

export default connect<IMapStateToProps, IMapDispatchToProps, IAboutOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(About);
