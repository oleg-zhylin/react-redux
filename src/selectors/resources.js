const DEFAULT_RESOURCE_KEY = 'default';

const selectResource = (resourceName, state, key = DEFAULT_RESOURCE_KEY) =>
    state.resources.get(resourceName).get(key);

export {
    selectResource,
    DEFAULT_RESOURCE_KEY
};