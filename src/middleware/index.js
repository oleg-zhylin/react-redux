import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import history from "./history";
import {routerMiddleware} from "react-router-redux";

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(
        createLogger({
            collapsed: (getState, action, logEntry) => !logEntry.error,
            predicate: (getState, action) => !action.type.startsWith('@@router') && !action.type.startsWith('@@redux-form'),
            stateTransformer: state => ({...state,
                resources: state.resources.toJS()
            })
        }),
        routerMiddleware(history)
    );
}

export default applyMiddleware(...middleware);