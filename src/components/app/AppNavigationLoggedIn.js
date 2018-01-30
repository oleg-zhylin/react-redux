import React, {Component} from "react";
import PropTypes from 'prop-types';
import LinkToRoute from "components/link/LinkToRoute";

export default class AppNavigationLoggedIn extends Component {
    render() {
        return (
            <div>
                <div>
                    Hi, member {this.props.username}! {' '}
                    <button onClick={this.props.onLogout}>logout</button>
                </div>
                <div>
                    <LinkToRoute exact to="/">home</LinkToRoute>{' '}
                    <LinkToRoute to="/hello">hello link</LinkToRoute>
                </div>
            </div>)
    }
}

AppNavigationLoggedIn.propTypes = {
    username: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
};