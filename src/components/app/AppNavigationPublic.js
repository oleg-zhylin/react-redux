import React, {Component} from "react";
import PropTypes from "prop-types";
import LoginForm from "containers/form/LoginForm";

export default class AppNavigationPublic extends Component {
    render() {
        return (
            <div>
                <LoginForm onSubmit={this.props.onLogin} />
            </div>)
    }
}

AppNavigationPublic.propTypes = {
    onLogin: PropTypes.func.isRequired
};
