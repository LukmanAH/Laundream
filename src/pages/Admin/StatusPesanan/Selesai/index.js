import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { HeaderBar } from '../../../../components';

const StatusSelesai = ({ navigation }) => {
  return (
    <SafeAreaView>
      <HeaderBar
        navigation={navigation}
        screenName="MainApp"
        title="Detail Pesanan"
      />
      <Text>StatusSelesai</Text>
    </SafeAreaView>
  )
}

export default StatusSelesai;