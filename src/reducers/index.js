import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import { reducer as form } from 'redux-form'
import auth from "./auth";
import resources from "./resources";

export default combineReducers({
    routing,
    auth,
    form,
    resources
});