import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderBar} from '../../../../components';

const DetailPegawaiScreen = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="Pegawai"
        title="Detail Pegawai"
      />
      <View style={{padding: 20}}>
        <View style={styles.wrap}>
          <Icon name="person" size={25} color="#c4c4c4" />
          <Text style={styles.text}>Tono</Text>
        </View>
        <View style={styles.wrap}>
          <Icon name="call" size={25} color="#c4c4c4" />
          <Text style={styles.text}>08232983289xx</Text>
        </View>
        <View style={styles.wrap}>
          <Icon name="mail" size={25} color="#c4c4c4" />
          <Text style={styles.text}>laundream@gmail.com</Text>
        </View>
        <View style={styles.wrap}>
          <Icon name="body-outline" size={25} color="#c4c4c4" />
          <Text style={styles.text}>Tono</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailPegawaiScreen;

const styles = StyleSheet.create({
  wrap: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  text: {
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },
});
