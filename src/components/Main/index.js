/**
 * Main.js
 *  The main screen of our app (after the user logs in)
 */
// import performanceNow from 'performance-now';
import React from 'react';


/**
 * Components
 */

import createScreen from '../SPScreenFactory';
import MainRender from './MainRender';



function getNavButtonsWithMonthString(monthString, isOpen = false) {
  const monthBtnObject = { // buttons for the left side of the nav bar
    title: `${monthString} ${isOpen === true ? '▴' : '▾'}`,
    // '︿' : '﹀'
    id: 'month', // id of the button which will pass to our press event handler
    // disabled: true,
  };

  /*  We check for the platform because on Android, only 1 button
      is allowed to the left side of the nav bar. */
  const leftButtons = [monthBtnObject];

  return {
    navigatorButtons: {
      animated: false,
      leftButtons, // buttons for the left side of the nav bar
    },
  };
}

class Main extends React.Component {

  /*
  **
  ** Container boilerplate
  **
  */
  componentWillMount() {
    // For nav button click events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }


  componentWillUnmount() {
    // For nav button click events
    this.props.navigator.cleanup();
  }

  /*
  **
  ** Nav Bar
  **
  */
  onNavigatorEvent(e) {
    // console.log(`@@@@@ Main onNavigatorEvent: ${JSON.stringify(e)}`);
    if (e.type === 'NavBarButtonPress') {
      switch (e.id) {
        case 'month': // do something on nav btn month click
          alert('Nav bar JANUARY was clicked.');
          break;
        default:
          break;
      }
    }
  }

  render() {


    return (
      <MainRender />
    );
  }
}


Main.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

export default {
  name: 'MAIN',
  screen: () => createScreen(
    [],
    this.name, getNavButtonsWithMonthString('January'))(Main),
};
