/**
 * # MainRender.js
 */


import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableHighlight,
  // findNodeHandle,
  Platform,
  Text,
  Dimensions,
} from 'react-native';

const {height: h, width: w} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    flexDirection: 'column',
  },
  cContainer: {
    flexGrow: 1,
    // backgroundColor: 'orange',
    // justifyContent: 'center',
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'column',
  },
  dayChangerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'pink',
  },
  dayBtnContainer: {
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  dayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },

});

class MainRender extends React.Component {

  renderDayChangingBtns(paddingHorizontal) {
    return (
      <View style={styles.dayChangerContainer}>
        <TouchableHighlight
          style={[
            styles.dayBtnContainer,
            { paddingHorizontal, paddingBottom: h * 0.014, backgroundColor: 'white', },
          ]}
          onPress={() => {alert('Actual button below nav bar clicked.')}}
          underlayColor="#A3D2D0"
        >
          <View style={styles.dayBtn}>
            <Text
              style={{ paddingHorizontal: w * 0.015 }}
            >Try to * click on the asterisk</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }



  render() {
    const paddingHorizontal = w * 0.03;
    const timeComponentWidth = w * 0.15;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.cContainer}>
          <View
            style={styles.headerContainer}
          >
            {this.renderDayChangingBtns(paddingHorizontal)}
          </View>
        </View>
      </View>
    );
  }
}

MainRender.propTypes = {
};
export default MainRender;
