/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
/**
 * ## Imports
 *
 * our 4 reducers
 */
import { combineReducers } from 'redux';
import router from './routing/routingReducer';


/**
* ## States
* Acuity explicitly defines initial state
*
*/
import RouterInitialState from './routing/routingInitialState';


/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
export const reducers = combineReducers({
  router,
});

/**
 * ## Combine Initial state
 *
 */
export const initialState = {
  router: new RouterInitialState(),
};
