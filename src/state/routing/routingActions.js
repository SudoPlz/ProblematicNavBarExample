/**
 * # routingActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */


export function navigateTo(schene, reset = false) {
  return {
    type: 'NAVIGATE_TO',
    payload: { schene, reset },
  };
}
export function manualReplaceRootSchene(scheneParams) {
  return {
    type: 'MANUAL_REPLACE_ROOT',
    payload: scheneParams,
  };
}


export function navigateToPrevious() {
  return {
    type: 'NAVIGATE_TO_PREVIOUS',
    payload: null,
  };
}


export function setModalVisibility(modalName, visible) {
  return {
    type: 'SET_MODAL_VISIBILITY',
    payload: { name: modalName, visibility: visible },
  };
}
