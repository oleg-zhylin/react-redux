import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class AppContent extends PureComponent {
    render () {
        const { children } = this.props;

        return (
            <div className="AppContent">
                {children}
            </div>
        )
    }
}

AppContent.propTypes = {
    children: PropTypes.element.isRequired
};