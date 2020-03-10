import React, { useEffect, useState } from 'react';
import Kakao from '../constants/Kakao'
import {
  Text,
  Button, View
} from 'react-native';
import * as AppAuth from "expo-app-auth";

export function KakaoLogin(props) {
  let [authState, setAuthState] = useState(null);

  function buttonPressed(){
    console.info(Kakao.hello());
  }

  return (
    <View>
      {!authState ? (
        <Button
          title="Sign In with Kakao Login"
          onPress={async () => {
            const authState = await signInAsync();
            setAuthState(authState);
          }}
        />
      ) : (
        <Button
          title="Sign Out of Kakao"
          onPress={async () => {
            await signOutAsync(authState);
            setAuthState(null);
          }}
        />
      )}
    </View>
  );
}

export async function signInAsync() {
  console.info('kakkao signin async');
}
