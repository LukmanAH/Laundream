import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Logo } from '../../assets/images';
import { ColorPrimary } from '../../utils/constanta';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
        navigation.replace('LoginScreen');
    }, 2500);
    
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