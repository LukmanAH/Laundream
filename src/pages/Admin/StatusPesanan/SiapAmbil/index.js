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

const Pengambilan = ({navigation}) => {
    return(
        <SafeAreaView>
<HeaderBar
        navigation={navigation}
        screenName="StatusPesanan"
        title="Detail Pesanan"
      />
      <Text>Pengambilan</Text>
        </SafeAreaView>
    )
}

export default Pengambilan;