import React from 'react';
import { Button } from "react-native";
import { signOutAsync } from "../components/GoogleLogin";
import { Updates } from 'expo';

//import { ExpoConfigView } from '@expo/samples';

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  //return <ExpoConfigView />;

  const signOut = async function(){
      await signOutAsync();
      Updates.reload();
  };

  return (
    <Button
      title="Sign Out of Google"
      onPress={signOut}
    />
  );
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
