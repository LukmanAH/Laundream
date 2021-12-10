import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {bgHeader} from '../../../assets/images';
import SIZES from '../../../utils/constanta';
import { globalStyles } from '../../../utils/global';

const Profil = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={bgHeader}
        style={{width: SIZES.width, height: 120, paddingHorizontal: 20}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 32,
            color: 'white',
            marginTop: 20,
          }}>
          Profil
        </Text>
      </ImageBackground>
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="person" size={30} color="#C4C4C4" />
          <Text
            style={{
              ...globalStyles.H3,
              marginLeft: 10,
            }}>
            Tono
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="call" size={30} color="#C4C4C4" />
          <Text
            style={{
              ...globalStyles.H3,
              marginLeft: 10,
            }}>
            0812 3456 7890
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="mail" size={30} color="#C4C4C4" />
          <Text
            style={{
              ...globalStyles.H3,
              marginLeft: 10,
            }}>
            tono11@gmail.com
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profil;
