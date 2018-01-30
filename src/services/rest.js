import querystring from "querystring";
import {
    requestResource,
    requestResourceError,
    requestResourceReceived,
    setResourceDetails,
    addResourceModel,
    updateResourceModel
} from "actions/resource";
import {DEFAULT_RESOURCE_KEY} from "selectors/resources";
import {apiPath} from "config";
import {getListName} from "resources/helpers";

const create = (resourceName, body = {}, options = {}) => {
    return (dispatch, getState) => {

        const {query, key} = options;
        const finallyCallback = options.finally;
        const {auth} = getState();

        const resourceKey = key !== undefined ? key : DEFAULT_RESOURCE_KEY;

        //@todo: remove block
        dispatch(addResourceModel(resourceName, body, resourceKey));
        return Promise.resolve();
        ////
        

        const queryString = query ? '/?' + querystring.stringify(query): '';

        return fetch(apiPath + '/'
            + resourceName
            + 'Create/'
            + auth.data.email
            + queryString,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'SecretKey': auth.data.secretKey
                }
            })
            .then(response => response.json())
            .then(json => {
                if (json.Status === 1) {
                    dispatch(addResourceModel(resourceName, json, resourceKey));
                }

                if (finallyCallback !== undefined) {
                    finallyCallback();
                }
            })
            .catch(e => {

                if (finallyCallback !== undefined) {
                    finallyCallback();
                }
                throw e;
            })
    }
};

const update = (resourceName, body = {}, options = {}) => {
    return (dispatch, getState) => {

        const {query, key} = options;
        const finallyCallback = options.finally;
        const {auth} = getState();

        const resourceKey = key !== undefined ? key : DEFAULT_RESOURCE_KEY;
        const queryString = query ? '/?' + querystring.stringify(query): '';

        //@todo: remove block
        dispatch(updateResourceModel(resourceName, body, resourceKey));
        return Promise.resolve();
        ////

        return fetch(apiPath + '/'
            + resourceName
            + 'Update/'
            + auth.data.email
            + queryString,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'SecretKey': auth.data.secretKey
                }
            })
            .then(response => response.json())
            .then(json => {
                if (json.Status === 1) {
                    dispatch(updateResourceModel(resourceName, body, resourceKey));
                }

                if (finallyCallback !== undefined) {
                    finallyCallback();
                }
            })
            .catch(e => {

                if (finallyCallback !== undefined) {
                    finallyCallback();
                }
                throw e;
            })
    }
};

const details = (resourceName, body = {}, options = {}) => {
    return (dispatch, getState) => {

        const {query, key} = options;
        const finallyCallback = options.finally;
        const {auth} = getState();

        const resourceKey = key !== undefined ? key : DEFAULT_RESOURCE_KEY;
        const queryString = query ? '/?' + querystring.stringify(query): '';

        return fetch(apiPath + '/'
            + resourceName
            + 'Details/'
            + auth.data.email
            + queryString,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'SecretKey': auth.data.secretKey
                }
            })
            .then(response => response.json())
            .then(json => {
                if (json.Status === 1) {
                    dispatch(setResourceDetails(resourceName, json, resourceKey));
                }

                if (finallyCallback !== undefined) {
                    finallyCallback();
                }
            })
            .catch(e => {

                if (finallyCallback !== undefined) {
                    finallyCallback();
                }
                throw e;
            })
    }
};

const list = (resourceName, body = {}, options = {}) => {
    return (dispatch, getState) => {

        const {query, key } = options;
        const publicRequst = options.public;
        const {auth} = getState();

        const resourceKey = key !== undefined ? key : DEFAULT_RESOURCE_KEY;
        dispatch(requestResource(resourceName, resourceKey));

        const queryString = query ? '/?' + querystring.stringify(query): '';

        return fetch(apiPath + '/'
            + resourceName
            + 'List/'
            + (publicRequst ? '' : auth.data.email)
            + queryString,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'SecretKey': (publicRequst ? '' : auth.data.secretKey)
                }
            })
            .then(response => response.json())
            .then(json => {
                if (json.Status === 1) {
                    dispatch(requestResourceReceived(resourceName, json[getListName(resourceName)], resourceKey));
                } else {
                    dispatch(requestResourceError(resourceName, json['ErrorMessage'], resourceKey));
                }
            })
            .catch(e => {
                dispatch(requestResourceError(resourceName, e.message, resourceKey));
                throw e;
            })
    }
};

export {
    create,
    update,
    details,
    list,
}