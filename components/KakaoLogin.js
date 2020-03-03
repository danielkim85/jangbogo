import React from 'react';
import Kakao from '../constants/Kakao'
import {
  Text,
  Button
} from 'react-native';

export function KakaoLogin(props) {
  function buttonPressed(){
    console.info(Kakao.hello());
  }

  return (
    <Button
      title="Press me"
      onPress={buttonPressed}
    />
  );
}
