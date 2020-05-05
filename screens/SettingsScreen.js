import React from 'react';
import {Button, StyleSheet, View} from "react-native";
import { signOutAsync } from "../components/GoogleLogin";
import { Updates } from 'expo';
import GLOBAL from '../components/Global.js';
import MongoDB from "../components/MongoDB";

//import { ExpoConfigView } from '@expo/samples';

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  //return <ExpoConfigView />;

  (async () => {
    console.info('settings screen');
    const mongoDB = GLOBAL.mongoDB;
    //console.info(GLOBAL.userProfile);
    //mongoDB.insertUser(GLOBAL.userProfile);
    const user = await mongoDB.getUser(GLOBAL.userProfile.id);
    console.info(await user);
  })();

  const signOut = async function(){
      await signOutAsync();
      Updates.reload();
  };

  return (
    <View style={styles.container}>
      <Button
        title="Sign Out of Google"
        onPress={signOut}
      />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  }
});
