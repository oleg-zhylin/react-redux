import {createActions} from "redux-actions";
import {DEFAULT_RESOURCE_KEY} from "selectors/resources";

export const {
    requestResource,
    requestResourceReceived,
    requestResourceError,
    clearResource,
    setResourceDetails,
    addResourceModel,
    updateResourceModel
} = createActions({
    'REQUEST_RESOURCE': (name, key = DEFAULT_RESOURCE_KEY) => ({name, key}),
    'REQUEST_RESOURCE_RECEIVED': (name, data, key = DEFAULT_RESOURCE_KEY) => ({name, key, data}),
    'REQUEST_RESOURCE_ERROR': (name, message, key = DEFAULT_RESOURCE_KEY) => ({name, key, message}),
    'CLEAR_RESOURCE': (name, key = DEFAULT_RESOURCE_KEY) => ({name, key}),
    'SET_RESOURCE_DETAILS': (name, data, key = DEFAULT_RESOURCE_KEY) => ({name, key, data}),
    'ADD_RESOURCE_MODEL': (name, data, key = DEFAULT_RESOURCE_KEY) => ({name, key, data}),
    'UPDATE_RESOURCE_MODEL': (name, data, key = DEFAULT_RESOURCE_KEY) => ({name, key, data}),
});
