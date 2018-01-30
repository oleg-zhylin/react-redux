import {fromJS} from "immutable";
import {createStore} from "redux";
import reducers from "./reducers";
import middleware from "./middleware";

window.cs = () => {
    if (copy !== undefined) {
        copy(serializeState(store.getState()));
        return true;
    } else {
        return false;
    }
};

const serializeState = state => {
    state.resources = state.resources.toJS();

    return state;
};

const deserializeState = state => {
    state.resources = fromJS(state.resources);

    return state;
};

const store = createStore(
    reducers,
    undefined,//init State
    // deserializeState({}),
    middleware
);

export default store;