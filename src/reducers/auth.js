import {handleActions} from "redux-actions";

export default handleActions({
    SET_USER_LOGGED_IN: (state, action) => ({
        ...state,
        data: {...action.payload},
        isLoggedIn: true
    }),
    SET_USER_LOGGED_OUT: (state) => ({
        ...state,
        data: {},
        isLoggedIn: false
    })
}, {
    username: '',
    isLoggedIn: false
});

