import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../Routes";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setLocationChanged } from "../actions";

class App extends React.Component<any, any> {
    unsubscribeHistory;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.unsubscribeHistory = this.props.history.listen(location => {
            this.props.setLocationChanged();
            this.unsubscribeHistory();
        });
    }

    componentWillUnmount() {
        this.unsubscribeHistory();
    }

    render() {
        return (
            <div>
                <Switch>
                    {routes.map(route => {
                        const RouteWithKey = Route as any; // Type error
                        return <RouteWithKey {...route} key={route.path} />;
                    })}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setLocationChanged: () => {
            return dispatch(setLocationChanged());
        }
    };
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(App));
