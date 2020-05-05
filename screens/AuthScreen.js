import React, { Component } from 'react';
import {Button, StatusBar, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import {getCachedAuthAsync, signInAsync} from "../components/GoogleLogin";
import GLOBAL from '../components/Global.js';

export default class AuthScreen extends Component {

  state = {
    authState : null,
    userProfile : null
  };

  componentDidMount(){
    (async () => {
      console.info('useEffectCalled on render');
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !this.state.authState) {
        this.setState({authState:cachedAuth});
      }
    })();
  }

  componentDidUpdate(prevProps,prevState){
    if (prevState.authState !== this.state.authState) {
      (async () => {
        if(!this.state.authState){
          return;
        }
        console.info('useEffectCalled on authState');
        //console.info(authState);
        let resp = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${this.state.authState.accessToken}` },
        });
        const userProfile = await resp.json();
        GLOBAL.userProfile = userProfile;
        this.setState({userProfile:userProfile});
      })();
    }
  }

  render() {
   return(
     !this.state.userProfile ? (
       <View style={styles.signInContainer}>
         <TouchableOpacity
           style={styles.signInButton}
           onPress={async () => {
             const authState = await signInAsync();
             this.setState({authState:authState});
           }}
         >
           <Image
             style={styles.signInButtonImage}
             source={require('../assets/images/btn_google_signin.png')}
           />
         </TouchableOpacity>

       </View>
     ) : (
       <View style={styles.loggedInContainer}>
         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
         <AppNavigator />
       </View>
     )
   );
  }
}

const styles = StyleSheet.create({
  signInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#000'
  },
  loggedInContainer: {
    flex: 1,
  },
  signInButton: {
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInButtonImage: {
    width: '100%',
    resizeMode: 'contain'
  }
});
