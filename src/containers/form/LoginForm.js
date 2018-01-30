import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <Field name="email" component="input" type="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <Field name="password" component="input" type="password"/>
                </div>
                <button type="submit">Login</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'LoginForm'
})(LoginForm);
