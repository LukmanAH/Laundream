import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {HeaderBar} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';

const TambahTarifOngkirScreen = ({navigation}) => {
  const [kmAwal, setKMAwal] = React.useState('');
  const [kmAkhir, setKMAkhir] = React.useState('');
  const [harga, setHarga] = React.useState('');

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="TarifOngkirScreen"
        title="Tambah Tarif Ongkir"
      />

      <View style={{paddingHorizontal: 16}}>
        <TextInput
          label="KM Awal"
          value={kmAwal}
          onChangeText={kmAwal => setKMAwal(kmAwal)}
          style={styles.textInput}
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary}
        />
        <TextInput
          label="KM Akhir"
          value={kmAkhir}
          onChangeText={kmAkhir => setKMAkhir(kmAkhir)}
          style={styles.textInput}
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary}
        />
        <TextInput
          label="Harga"
          value={harga}
          onChangeText={harga => setHarga(harga)}
          style={styles.textInput}
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary}
        />
      </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('simpan')}>
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
