import React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { Dispatch } from "redux";

import { setLocationChanged } from "../actions";
import { IState } from "../models";
import { routes } from "../routes";

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
interface IAppOwnProps extends RouteComponentProps<undefined> {}
interface IAppProps extends IAppOwnProps, MapStateToProps, MapDispatchToProps {}

const mapStateToProps = (state: IState, ownProps: IAppOwnProps) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IAppOwnProps) => ({
    setLocationChanged: () => dispatch(setLocationChanged())
});

class App extends React.Component<IAppProps> {
    constructor(props: IAppProps) {
        super(props);

        const unsubscribeHistory = this.props.history.listen(location => {
            this.props.setLocationChanged();
            unsubscribeHistory();
        });
    }

    render() {
        return <Switch>{routes.map(route => <Route {...route} key={route.path} />)}</Switch>;
    }
}

export default withRouter(
    connect<MapStateToProps, MapDispatchToProps, IAppOwnProps, IState>(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
