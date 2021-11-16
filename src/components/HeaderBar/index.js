import React from 'react';
import {
  ImageBackground,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { bgHeader } from '../../assets/images';
import SIZES, {ColorPrimary} from '../../utils/constanta';

export default Header = ({navigation, screenName, title}) => {
    return (
      <ImageBackground
        source={bgHeader}
        style={{width: SIZES.width, height: 120}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingBottom: 25,
            paddingLeft: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
              onPress={() => navigation.navigate(screenName)}>
              <Icon name="arrow-back-outline" size={24} color={ColorPrimary} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 10,
                color: '#fff',
              }}>
              {title}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };