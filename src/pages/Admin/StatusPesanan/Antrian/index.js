import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { HeaderBar } from '../../../../components';

const Antrian = ({navigation}) => {
    return(
        <SafeAreaView>
<HeaderBar
        navigation={navigation}
        screenName="StatusPesanan"
        title="Detail Pesanan"
      />
      <Text>Antrian</Text>
        </SafeAreaView>
    )
}

export default Antrian;