/**
 * # routingInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */

/**
 * ## Import
 */
import { Record, Map, List } from 'immutable';



/**
 * ## InitialState
 * The form is set
 */

// eslint-disable-next-line new-cap
const InitialState = Record({
  currentSchene: 'WELCOME',
  previousSchenes: new List([]),
  modalIsOpen: new Map([
  ]),
  currentModal: null,
  manualReplaceRootSchene: null,
});
export default InitialState;
