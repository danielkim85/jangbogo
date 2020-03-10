import React, { useEffect, useState } from 'react';
import {Button, StatusBar, StyleSheet, View} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import {getCachedAuthAsync, signInAsync} from "../components/GoogleLogin";
import GLOBAL from '../components/Global.js';

export default function AuthScreen() {
  let [authState, setAuthState] = useState(null);
  let [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    (async () => {
      console.info('useEffectCalled on render');
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if(!authState){
        return;
      }
      console.info('useEffectCalled on authState');
      //console.info(authState);
      let resp = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authState.accessToken}` },
      });
      const userProfile = await resp.json();
      GLOBAL.userProfile = userProfile;
      setUserProfile(userProfile);
    })();
  }, [authState]);

  return (

      !userProfile ? (
        <View style={styles.container}>
          <Button
            title="Sign In with Google "
            onPress={async () => {
              const authState = await signInAsync();
              setAuthState(authState);
            }}
          />
        </View>
      ) : (
        <View style={styles.container2}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
        </View>
      )
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  container2: {
    flex: 1,
    backgroundColor: '#000',
  }
});
