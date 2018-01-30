import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";

import Home from "components/content/Home";
import NoMatch from "components/NoMatch";

import Hello from "components/content/Hello";

class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hello" component={Hello} />
                <Route component={NoMatch}/>
            </Switch>)
    }
}

export default connect(
    ({ routing }) => ({ routing })
)(AppRoutes);
