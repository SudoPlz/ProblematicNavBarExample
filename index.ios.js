/* eslint-disable no-unused-vars */
import React from 'react';
import { DatePickerIOS } from 'react-native';
import init from './src/Init';

/*
  Avoiding invalid rn 26 warnings
*/
DatePickerIOS.propTypes.date = React.PropTypes.any.isRequired;
DatePickerIOS.propTypes.onDateChange = React.PropTypes.func;
DatePickerIOS.propTypes.maximumDate = React.PropTypes.any;
DatePickerIOS.propTypes.minimumDate = React.PropTypes.any;

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['View #'];
