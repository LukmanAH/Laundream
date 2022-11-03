import React from 'react';
import { StyleSheet, ToastAndroid, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { HeaderBar } from '../../../../../components';
import SIZES, {  API, ColorPrimary } from '../../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditOngkirScreen = ({ navigation, route }) => {
 const { data } = route.params

  const [kmAwal, setKMAwal] = React.useState(String(data.initial_km));
  const [kmAkhir, setKMAkhir] = React.useState(String(data.final_km));
  const [harga, setHarga] = React.useState(String(data.price));

  const editShippingRatePressed = async () => {
    if (kmAwal && kmAkhir && harga) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/shipping/${data.id}`, {
        method: 'PUT',
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
          if (responseJson.error == null) {
            navigation.replace('TarifOngkir')
            ToastAndroid.show('Berhasil mengubah tarif ongkir', ToastAndroid.SHORT)
          } else {
            Alert.alert('Masukkan field dengan benar')
          }
        });
    } else {
      Alert.alert('Masukkan semua field');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="TarifOngkirScreen"
        title="Ubah Tarif Ongkir"
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
          onPress={editShippingRatePressed}>
          <Text style={styles.textLogin}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditOngkirScreen;

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
