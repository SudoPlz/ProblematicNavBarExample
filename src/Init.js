/* @flow */

import { Provider } from 'react-redux'; // Provider will tie the React-Native to the Redux store
import { Text, NetInfo, Linking, PixelRatio, Platform } from 'react-native';
// import Immutable from 'immutable';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './router/Screens';


/*
/**
* ### configureStore
*
*  ```configureStore``` will connect the ```reducers``` in one object
*
*/
import configureStore from './lib/configureStore';
import { initialState } from './state';
/**
* ## Actions
*  The necessary actions for dispatching our bootstrap values
*/


Text.defaultProps.allowFontScaling = false;


// configureStore will combine reducers from SP and main application
// it will then create the store based on aggregate state from all reducers
const store = configureStore(initialState);


/*
       \/    \/    \/     PROJECT STARTS HERE     \/    \/    \/
*/
async function init() {

  registerScreens(store, Provider);
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'MAIN',
      title: ' ',
      navigatorStyle: {
        statusBarColor: 'black',
        statusBarTextColorScheme: 'light',
        navBarBackgroundColor: 'black',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        tabBarButtonColor: 'red',
        tabBarSelectedButtonColor: 'red',
        tabBarBackgroundColor: 'white',
        backButtonHidden: true,
      },
    },
    animationType: 'slide-down',  // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
  });
}

init();
