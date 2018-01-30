import listNames from "resources/listNames";
import idNames from "resources/idNames";

const getDefaultListName = (resourceName = '') => {
    let name = resourceName + 'List';

    return name.charAt(0).toLowerCase() + name.slice(1);
};

const getDefaultIdName = (resourceName = '') => {

    return 'id_' + resourceName.charAt(0).toLowerCase() + resourceName.slice(1);
};

const getIdName = (resourceName = '') => {

    return idNames[resourceName] !== undefined
        ? idNames[resourceName]
        : getDefaultIdName(resourceName)
};

const getListName = (resourceName = '') => {

    return listNames[resourceName] !== undefined
        ? listNames[resourceName]
        : getDefaultListName(resourceName)
};

export {
    getIdName,
    getListName
}