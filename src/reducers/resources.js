import {handleActions} from "redux-actions";
import resources from "resources";
import {fromJS, List} from "immutable";
import {DEFAULT_RESOURCE_KEY} from "selectors/resources";
import {getIdName} from "resources/helpers";

const emptyList = List();
let defaultState = {};

for (let property in resources) {
    if (resources.hasOwnProperty(property)) {
        defaultState[property] = {};
        defaultState[property][DEFAULT_RESOURCE_KEY] = {
            name: property,
            isFetched: false,
            isFetching: false,
            list: emptyList,
            errorMessage: ''
        };
    }
}

const initResourceKey = (state, payload) => {

    const resource = state
        .getIn([
            payload.name,
            payload.key]);


    let nextState = state;
    if (resource === undefined) {
        nextState = state
            .setIn([payload.name, payload.key],
                fromJS({
                    name: payload.name,
                    isFetched: false,
                    isFetching: false,
                    list: emptyList,
                    errorMessage: ''
                }));
    }

    return nextState;
};

export default handleActions({
    REQUEST_RESOURCE: (state, {payload}) =>
        state
            .mergeIn(
                [payload.name, payload.key],
                fromJS({
                    name: payload.name,
                    isFetched: false,
                    isFetching: true,
                    list: emptyList,
                    errorMessage: '',
                })),
    REQUEST_RESOURCE_RECEIVED: (state, {payload}) =>
        state
            .mergeIn(
                [payload.name, payload.key],
                fromJS({
                    isFetched: true,
                    isFetching: false,
                    list: payload.data ? payload.data : emptyList
                })),
    REQUEST_RESOURCE_ERROR: (state, {payload}) =>
        state
            .mergeIn(
                [payload.name, payload.key],
                fromJS({
                        isFetched: false,
                        isFetching: false,
                        errorMessage: payload.message
                })),
    CLEAR_RESOURCE: (state, {payload}) =>
        state
            .setIn(
                [payload.name],
                state.get(payload.name)
                    .delete(payload.key)
            ),
    SET_RESOURCE_DETAILS: (state, {payload}) => {

        const nextState = initResourceKey(state, payload);

        let index = nextState.getIn([
            payload.name,
            payload.key,
            'list'
        ]).findIndex(i => i.get(getIdName(payload.name)) === payload.data[getIdName(payload.name)]);

        if (index) {
            return nextState
                .mergeIn([
                    payload.name,
                    payload.key,
                    'list',
                    index
                ],
                    fromJS(payload.data)
                )
        } else {
            return nextState
                .setIn([
                    payload.name,
                    payload.key,
                    'list'
                ],
                    nextState.getIn([
                        payload.name,
                        payload.key,
                        'list'
                    ]).push(fromJS(payload.data))
                )
        }
    },
    ADD_RESOURCE_MODEL: (state, {payload}) => {

        const nextState = initResourceKey(state, payload);

        return nextState
            .setIn(
                [
                    payload.name,
                    payload.key,
                    'list'
                ],
                nextState.getIn([
                    payload.name,
                    payload.key,
                    'list'
                ]).push(fromJS(payload.data))
            )
    },

    UPDATE_RESOURCE_MODEL: (state, {payload}) => {

        const nextState = initResourceKey(state, payload);

        const modelIndex =
            nextState
                .getIn([
                    payload.name,
                    payload.key,
                    'list'
                ])
                .findIndex(i => i.get(getIdName(payload.name)) === payload.data[getIdName(payload.name)]);

        if (modelIndex === -1)
            return state;

        return nextState
            .mergeIn(
                [
                    payload.name,
                    payload.key,
                    'list',
                    modelIndex
                ],
                fromJS(payload.data)
            )
    },

}, fromJS(defaultState));
