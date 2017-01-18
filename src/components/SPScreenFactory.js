/**
 * SPScreenFactory.js
 * The allmighty creator of all screens.
 */
 import { Map, Record } from 'immutable';
 import React from 'react';

 /**
  * Redux
  */
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 // import _ from 'underscore';

 import * as routingActions from '../state/routing/routingActions';

const MIN_BTN_HEIGHT = 37.5;
 let btnHeight;

 export default function createScreen(stateActions = [], screenName, navProps, stateProps) {

   /* if stateActions does NOT already contain routingActions, just add them */
   if (stateActions.find(stateAction => stateAction === routingActions) == null) {
     stateActions.push(routingActions);
   }

   return (Component) => {
     function mapStateToProps(state) {
       if (stateProps) {
         return {
           ...state,
           ...stateProps,
         };
       }
       return {
         ...state,
       };
     }

     function mapDispatchToProps(dispatch) {
       const creators = Map()
         .merge(...stateActions)
         .filter(value => typeof value === 'function')
         .toObject();

       return {
         actions: bindActionCreators(creators, dispatch),
         dispatch,
       };
     }

     class SPScreen extends React.Component {

       componentWillReceiveProps(nextProps) {

         // Check if we have a manual Replace of our Root Schene
         if (nextProps.router.get('manualReplaceRootSchene') !== this.props.router.get('manualReplaceRootSchene')) {
           this.replaceScreen(nextProps.router.get('manualReplaceRootSchene'));
         }
       }

       getBtnHeight(height) {
         if (!btnHeight) {
           btnHeight = height || this.props.device.get('screenHeight') * 0.065;
           btnHeight = btnHeight < MIN_BTN_HEIGHT ? btnHeight : MIN_BTN_HEIGHT;
         }
         return btnHeight;
       }


       pushScreen(params) {
         if (params) {
           if (typeof params === 'string') {
             this.props.actions.navigateTo(params);
             this.props.navigator.push({ screen: params, title: '' });
           } else if (params.screen) {
             this.props.actions.navigateTo(params.screen);
             this.props.navigator.push(params);
           }
         }
       }

       replaceScreen(params) {
         if (params) {
           if (typeof params === 'string') {
             this.props.actions.navigateTo(params, true);
            //  console.log(`about to replace screen with ${params}`);
             this.props.navigator.resetTo({ screen: params, title: '' });
           } else if (params.screen) {
             this.props.actions.navigateTo(params.screen, true);
            //  console.log(`about to replace screen with ${JSON.stringify(params)}`);
             this.props.navigator.resetTo(params);
           }
         }
       }

       popScreen(animated = true) {
         this.props.actions.navigateToPrevious();
         this.props.navigator.pop({ animated });
       }

       showModal(params) {
         if (params) {
           if (typeof params === 'string') {
             this.props.actions.navigateTo(params, true);
            //  console.log(`about to replace screen with ${params}`);
             this.props.navigator.showModal({ screen: params, title: '' });
           } else if (params.screen) {
             this.props.actions.navigateTo(params.screen, true);
            //  console.log(`about to replace screen with ${JSON.stringify(params)}`);
             this.props.navigator.showModal(params);
           }
         }
       }

       dismissModal(animationType) {
         this.props.navigator.dismissModal({
           animationType: animationType || 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
         });
       }

       toggleDrawer(forcedNewState) {
         this.props.navigator.toggleDrawer(forcedNewState != null ?
         {
           side: 'left',
           animated: true,
           to: forcedNewState,
         }
         :
         {
           side: 'left',
           animated: true,
         });
       }

       dispatchDeepLink(link) {
         this.props.navigator.handleDeepLink({ link });
       }

       render() {
         return (
           <Component
             {...this.props}
             push={this.pushScreen.bind(this)}
             pop={this.popScreen.bind(this)}
             replace={this.replaceScreen.bind(this)}
             showModal={this.showModal.bind(this)}
             dismissModal={this.dismissModal.bind(this)}
             getBtnHeight={this.getBtnHeight.bind(this)}
             toggleDrawer={this.toggleDrawer.bind(this)}
             navigator={this.props.navigator}
             dispatchDeepLink={this.dispatchDeepLink.bind(this)}
           />);
       }
     }

     if (navProps && navProps.navigatorButtons) {
       SPScreen.navigatorButtons = navProps.navigatorButtons;
     }

     SPScreen.propTypes = {
       router: React.PropTypes.instanceOf(Record).isRequired,
      //  global: React.PropTypes.instanceOf(Record).isRequired,
       navigator: React.PropTypes.object.isRequired,
       actions: React.PropTypes.object.isRequired,
     };
     return connect(mapStateToProps, mapDispatchToProps)(SPScreen);
   };
 }
