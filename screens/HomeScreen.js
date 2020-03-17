import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GLOBAL from '../components/Global.js';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          Hello, { GLOBAL.userProfile ? GLOBAL.userProfile.name : ''}
        </Text>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
  //title: 'Home',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  }
});
