import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { iconJam, iconOutlet } from '../../../../assets/images';
import { HeaderBar } from '../../../../components';

const MenuLayanan = ({title, screenName, navigation, icon}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 28,
          // borderWidth:1,
          paddingHorizontal: 28,
          alignItems: 'center',
          paddingVertical: 30,
          backgroundColor: '#f6f6f6',
          borderRadius: 20,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate(screenName)}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 36,
            width: '70%',
            color: '#000',
          }}>
          {title}
        </Text>
        <Image source={icon} />
      </TouchableOpacity>
    );
  };

const KelolaLayanan = ({navigation}) => {
  return (
    <View>
      <HeaderBar
        navigation={navigation}
        screenName="HomePage"
        title="Kelola Layanan"
      />
      <MenuLayanan icon={iconOutlet} title="Layanan Regular" navigation={navigation} screenName='LayananRegular'/>
        <MenuLayanan icon={iconJam} title="Parfum"  navigation={navigation} screenName='Parfum'/>
        
    </View>
  );
};

export default KelolaLayanan;
