/**
 * # deviceReducer.js
 *
 * The reducer for all the actions from the various log states
 */

// import { List } from 'immutable';
/**
 * ## Imports
 *
 * InitialState
 */
 import InitialRouterState from './routingInitialState';


 const initialRouterState = new InitialRouterState();


 function closeOpenModalsIfPossible(state) {
   let s = state;
   if (state.currentModal != null) { // if a modal is open while going to the previous screen
     s = state.setIn(['modalIsOpen', state.currentModal], false).set('currentModal', null);    // stop showing the modal, and set the currentModal to null
   }
   return s;
 }

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
 export default function routingReducer(state = initialRouterState, action) {
   let s = state;

   const previousSchenes = s.previousSchenes;
   const currentSchene = s.currentSchene;

   switch (action.type) {

     case 'NAVIGATE_TO': {
       s = closeOpenModalsIfPossible(s);
      //  if (currentSchene === 'SPLASH_SCREEN') {
      //    return s.set('currentSchene', action.payload);
      //  }

       const prev = action.payload.reset === true ?  // If the reset flag is on
       previousSchenes.clear()  // clear the previous screens
       :
       previousSchenes.push(currentSchene); // else push the cur schene to the previous stack
       return s.set('previousSchenes', prev).set('manualReplaceRootSchene', null).set('currentSchene', action.payload.schene);
     }

     case 'NAVIGATE_TO_PREVIOUS': {
       //  get the previous screen from the list (last() is like calling pop in an js array)
       const previousScheneThatBecomesCurrent = previousSchenes.last();
       s = closeOpenModalsIfPossible(s);
       const prevSc = previousSchenes.pop(); //  remove last schene from the list
       return s.set('previousSchenes', prevSc).set('manualReplaceRootSchene', null).set('currentSchene', previousScheneThatBecomesCurrent);
     }
     case 'SET_MODAL_VISIBILITY': {
       const { name, visibility } = action.payload;
       return s.setIn(['modalIsOpen', name], visibility)
       .set('currentModal', visibility === true ? name : null);
     }
     case 'MANUAL_REPLACE_ROOT':
       return state.set('manualReplaceRootSchene', action.payload);
     default:
      //  console.log("Routing reducer running with no valid action type: "+action.type);
       return s;
   }
 }
