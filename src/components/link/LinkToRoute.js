import React, {Component} from "react";
import {NavLink} from "react-router-dom";

export default class LinkToRoute extends Component {
    render() {
        return (
            <NavLink
                {...this.props}
                strict
                activeStyle={{textDecoration: 'none', color: 'black' }}
            />
        )
    }
}
