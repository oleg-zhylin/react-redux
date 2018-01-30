import {createActions} from "redux-actions";

export const {
    setUserLoggedIn,
    setUserLoggedOut
} = createActions(
    'SET_USER_LOGGED_IN',
    'SET_USER_LOGGED_OUT'
);
