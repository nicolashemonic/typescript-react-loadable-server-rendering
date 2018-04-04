import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { Action } from "redux";

import { setLocationChanged } from "../actions";
import { IState } from "../models";
import { routes } from "../routes";

interface IMapStateToProps {}

interface IMapDispatchToProps {
    setLocationChanged: () => Action;
}

interface IAppOwnProps extends RouteComponentProps<any> {}

interface IAppProps extends IMapStateToProps, IMapDispatchToProps, IAppOwnProps {}

class App extends React.Component<IAppProps, undefined> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const unsubscribeHistory = this.props.history.listen(location => {
            this.props.setLocationChanged();
            unsubscribeHistory();
        });
    }

    render() {
        return (
            <div>
                <Switch>{routes.map(route => <Route {...route} key={route.path} />)}</Switch>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<IMapStateToProps, IAppOwnProps, IState> = (
    state,
    ownProps
): IMapStateToProps => ({});

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, IAppOwnProps> = (
    dispatch,
    ownProps
) => ({
    setLocationChanged: () => {
        return dispatch(setLocationChanged());
    }
});

export default withRouter<IAppOwnProps>(
    connect<IMapStateToProps, IMapDispatchToProps, IAppOwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
