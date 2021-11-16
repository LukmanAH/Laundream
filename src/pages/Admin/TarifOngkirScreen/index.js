import React from 'react';
import {Text, View} from 'react-native';
import {HeaderBar} from '../../../components';

const TarifOngkirScreen = ({navigation}) => {
  return (
    <View>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaOutlet"
        title="Tarif Ongkir"
      />
      <Text>Tarif Ongkir</Text>
    </View>
  );
};

export default TarifOngkirScreen;
