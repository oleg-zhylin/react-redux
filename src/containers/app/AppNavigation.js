import React, {Component} from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {setUserLoggedOut} from "actions/auth";
import AppNavigationLoggedIn from "components/app/AppNavigationLoggedIn";
import AppNavigationPublic from "components/app/AppNavigationPublic";
import {clearResource} from "actions/resource";
import {login} from "services/auth";
import {list, details, create, update} from "services/rest";
import {State, Country, Member} from "resources";
import {selectResource, selectCountriesByIdContinent} from "selectors";

const additionalResourceKey = "AppNavigation:states";

class AppNavigation extends Component {
    state = {
        isFetched: false
    };

    render () {
        const {auth} = this.props;

        return auth.isLoggedIn
             ? <AppNavigationLoggedIn onLogout={this.props.onLogout} username={''+ auth.data.id_member}/>
             : <AppNavigationPublic onLogin={this.props.onLogin}/>
    }

    componentWillReceiveProps(nextProps) {
        const {auth, dispatch, stateResource2, countries} = nextProps;

        if (auth.isLoggedIn && !this.state.isFetched) {
            dispatch(create(Country, {id_country: 789, name: 'test'}));
            dispatch(update(Country, {name: 'test2'}));
            dispatch(update(Country, {id_country: 789, name: 'test2'}));


            dispatch(list(State, {id_country: 840}));
            dispatch(list(State, {id_country: 840}, {key: additionalResourceKey}));

            dispatch(list(Country, {}, {public: true}));
            // dispatch(fetchList(Country, undefined, {public: 1}));

             dispatch(details(Member, {
                 id_member: auth.data.id_member,
                 countryFormat: 4,
                 stateFormat: 4,
                 metadata: 1
             }));

            this.setState({isFetched: true});
        }

        if (stateResource2 && stateResource2.get('isFetched')
            && this.props.stateResource2 && !this.props.stateResource2.get('isFetched')
        ) {
            console.log('Received ' + stateResource2.get('list').size + ' states by key ' + additionalResourceKey);
            dispatch(clearResource(State, additionalResourceKey));
        }

        if (countries && countries.size && !this.state.countriesPrinted) {
            console.log('countries', countries.toJS());
            this.setState({countriesPrinted: true});
        }
    }
}

AppNavigation.propTypes = {
    dispatch: PropTypes.func.isRequired,
    countries: ImmutablePropTypes.list.isRequired,
    stateResource1: ImmutablePropTypes.map.isRequired,
    stateResource2: ImmutablePropTypes.map.isRequired
};

AppNavigation.propTypes = {
    auth: PropTypes.shape({
        data: PropTypes.shape({
            id_member: PropTypes.number
        })
    }).isRequired,
    onLogout: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        auth: state.auth,
        routing: state.routing,
        countries: selectCountriesByIdContinent(state, 'NA'),
        stateResource1: selectResource(State, state),
        stateResource2: selectResource(State, state, additionalResourceKey)
    }),
    dispatch => ({
        dispatch,
        onLogin: (result) => {
            dispatch(login(result));
        },
        onLogout: () => {
            dispatch(push('/'));
            dispatch(setUserLoggedOut())
        }

    })
)(AppNavigation);