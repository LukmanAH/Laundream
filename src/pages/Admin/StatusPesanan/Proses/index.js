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

const Proses = ({navigation}) => {
    return(
        <SafeAreaView>
<HeaderBar
        navigation={navigation}
        screenName="StatusPesanan"
        title="Detail Pesanan"
      />
      <Text>Proses</Text>
        </SafeAreaView>
    )
}

export default Proses;