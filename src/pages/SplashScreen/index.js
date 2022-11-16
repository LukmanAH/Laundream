import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Logo } from '../../assets/images';
import { ColorPrimary, ROLE_CUSTOMER } from '../../utils/constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {

  const checkSesion = async () =>{
    const findingToken = await AsyncStorage.getItem('token');

    if (findingToken){
      const getUser = await AsyncStorage.getItem('user');
      const parseObject = JSON.parse(getUser);

      if (parseObject.role == ROLE_CUSTOMER) {
         navigation.replace('Tabs');
      } else {
         navigation.replace('MainApp');
      }
    }else{
      navigation.replace('LoginScreen');
    }
  }

  useEffect(() => {
    setTimeout(() => {
        checkSesion();
        //navigation.replace('Latihan');
    }, 5000);
    
  }, []);

  return (
    <View style={styles.container}>
      <View>
          <Image source={Logo} resizeMode='center' />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
      },
});