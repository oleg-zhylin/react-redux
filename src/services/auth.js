import {setUserLoggedIn} from "actions/auth";
import {apiPath} from "config";

const login = data => dispatch => {

    return fetch(apiPath + '/MemberLogin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(json => {
            if (json.Status === 1) {
                json.email = data.email;
                dispatch(setUserLoggedIn(json))
            } else {
                console.log('login error');
            }
        })
        .catch(e => {
            console.log('login error');
            throw e;
        });
};

export {
    login
};
