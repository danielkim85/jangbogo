import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  View
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Text } from 'native-base';

import LocationChooser from '../components/LocationChooser.js';
import MongoDB from '../components/MongoDB.js';
import GLOBAL from '../components/Global.js';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    location: null,
    errorMessage: null,
  };

  constructor(props) {
    super(props);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      //load geo info
      this._getLocationAsync();
      //async load mongoDB stuff
      (async () => {
        const mongoDB = new MongoDB();
        GLOBAL.mongoDB = mongoDB;
        await mongoDB.upsert('users',GLOBAL.userProfile.id,GLOBAL.userProfile);
        const user = await mongoDB.get('users',GLOBAL.userProfile.id);
        console.info(await user);
      })();
    }
  }

  componentDidMount(){
    this.props.navigation.addListener('willFocus', (route) => {
      console.log(" Tab click is working ")
    });
  }

  componentWillUnmount() {
    try {
      this._unsubscribe();
    }catch(err){}
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    const search = {
      latitude :location.coords.latitude,
      longitude : location.coords.longitude
    };
    GLOBAL.location= await Location.reverseGeocodeAsync(search);
  };

  onPressLearnMore = async () => {
    console.info('button pressed');
    const mongoDB = GLOBAL.mongoDB;
    await mongoDB.upsert('rooms',GLOBAL.location[0].name,GLOBAL.location[0]);
    const room = await mongoDB.get('rooms',GLOBAL.location[0].name);
    console.info(room);
  }

  render() {

    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(GLOBAL.location);
    }

    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Button
            onPress={this.onPressLearnMore}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <LocationChooser>test</LocationChooser>
          <Text style={styles.getStartedText}>
            Hello, {GLOBAL.userProfile ? GLOBAL.userProfile.name : ''}
          </Text>
          <Text>{text}</Text>
        </View>
      </View>
    );
  }
}

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
