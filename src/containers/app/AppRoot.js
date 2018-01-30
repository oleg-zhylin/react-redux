import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect, Provider} from "react-redux";

import {Route} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import history from "middleware/history";
import App from "components/app/App";

class AppRoot extends Component {
    render() {
        const { store } = this.props;

        return <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route path="/" component={App}/>
            </ConnectedRouter>
        </Provider>
    }
}

AppRoot.propTypes = {
    store: PropTypes.object.isRequired,
};

export default connect()(AppRoot);