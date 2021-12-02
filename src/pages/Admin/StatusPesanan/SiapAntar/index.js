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

const Pengantaran = ({navigation}) => {
    return(
        <SafeAreaView>
<HeaderBar
        navigation={navigation}
        screenName="StatusPesanan"
        title="Detail Pesanan"
      />
      <Text>Pengantaran</Text>
        </SafeAreaView>
    )
}

export default Pengantaran;