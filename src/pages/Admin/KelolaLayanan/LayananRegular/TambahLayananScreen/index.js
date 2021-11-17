import React from 'react';
import {Text, View} from 'react-native';
import {HeaderBar} from '../../../../../components';

const TambahLayanan = ({navigation}) => {
  return (
    <View>
      <HeaderBar
        navigation={navigation}
        screenName="LayananRegular"
        title="Tambah Layanan"
      />
      <Text>Tambah Layanan</Text>
    </View>
  );
};

export default TambahLayanan;
