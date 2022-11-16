import React from 'react';
import {
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { bgHeader } from '../../assets/images';
import SIZES, { ColorPrimary } from '../../utils/constanta';
import { globalStyles } from '../../utils/global';

export default HeaderBar = ({ navigation, screenName, title, data, address, coordinate, catalog }) => {
  return (
    <ImageBackground
      source={bgHeader}
      style={{ width: SIZES.width, height: 120, }}>
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
            paddingRight: 25
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
            onPress={() => {
              if (screenName == "DetailPesanan") {
                navigation.navigate(screenName, { data: data, address: address, coordinate: coordinate })
              } else if(screenName == "KonfirmasiPesanan") {
                navigation.navigate(screenName, {data:data, address: address, coordinate: coordinate, catalog: catalog})
              }else {
                navigation.navigate(screenName)
              }
            }}>
            <Icon name="arrow-back-outline" size={24} color={ColorPrimary} />
          </TouchableOpacity>
          <Text
            style={{
              ...globalStyles.titleText,
              marginLeft: 10,
              color: '#fff',
              fontSize: 20
            }} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};