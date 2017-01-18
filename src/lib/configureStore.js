/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */


/**
 * ## Imports
 *
 * redux functions
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import now from 'performance-now';

/**
* ## Reducer
* The reducer contains all the reducers from
* device, global, auth etc..
*/
import { reducers } from '../state';



/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile, router
 *
 */
export default function configureStore(initialState) {
  const enhancer = compose(
      applyMiddleware(thunk),
    );
    // Note: passing enhancer as last argument requires redux@>=3.1.0
  return createStore(reducers, initialState, enhancer);
}
