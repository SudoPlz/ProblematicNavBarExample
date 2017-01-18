
import { Navigation } from 'react-native-navigation';

import Main from '../components/Main';

/* eslint-disable import/prefer-default-export */
export function registerScreens(store, Provider) {
  for (const { name, screen } of [
    Main,
  ]) {
    // console.log(name);
    Navigation.registerComponent(name, () => screen(), store, Provider);
  }
}
