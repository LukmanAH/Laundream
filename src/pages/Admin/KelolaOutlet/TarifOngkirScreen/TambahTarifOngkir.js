import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { HeaderBar } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TambahTarifOngkirScreen = ({ navigation }) => {
  const [kmAwal, setKMAwal] = React.useState('');
  const [kmAkhir, setKMAkhir] = React.useState('');
  const [harga, setHarga] = React.useState('');

  const addShippingRatePressed = async () => {
    if (kmAwal && kmAkhir && harga) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/shipping`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          initial_km: parseFloat(kmAwal),
          final_km: parseFloat(kmAkhir),
          price: parseFloat(harga)
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.errors == null) {
            navigation.replace('TarifOngkir')
          } else {
            alert('Masukkan field dengan benar')
          }
        });
    } else {
      alert('Masukkan semua field');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="TarifOngkirScreen"
        title="Tambah Tarif Ongkir"
      />

      <View style={{ paddingHorizontal: 16 }}>
        <Fumi
          label={'KM Awal'}
          iconClass={FontAwesomeIcon}
          iconName={'road'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setKMAwal(text)}
          autoCapitalize="none"
          value={kmAwal}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <Fumi
          label={'KM Akhir'}
          iconClass={FontAwesomeIcon}
          iconName={'road'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setKMAkhir(text)}
          autoCapitalize="none"
          value={kmAkhir}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <Fumi
          label={'Harga'}
          iconClass={FontAwesomeIcon}
          iconName={'tag'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setHarga(text)}
          autoCapitalize="none"
          value={harga}
          keyboardType="number-pad"
          style={styles.textInput}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={addShippingRatePressed}>
          <Text style={styles.textLogin}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TambahTarifOngkirScreen;

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
