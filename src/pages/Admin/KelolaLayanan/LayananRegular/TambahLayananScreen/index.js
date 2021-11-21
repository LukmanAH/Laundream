import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {HeaderBar} from '../../../../../components';
import SIZES, {ColorPrimary} from '../../../../../utils/constanta';

const TambahLayanan = ({navigation}) => {
  const [checked, setChecked] = useState('kg');
  const [showDropDown, setShowDropDown] = useState(false);
  const [waktu, setWaktu] = useState('');
  const waktuList = [
    {
      label: 'Jam',
      value: 'Jam',
    },
    {
      label: 'Hari',
      value: 'Hari',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="LayananRegular"
        title="Tambah Layanan"
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <Text style={styles.titleText}>Nama Layanan</Text>
        <TextInput
          placeholder="Contoh: Sprei "
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary}
        />

        {/* RadioButton */}
        <Text style={styles.titleText}>Satuan Hitung </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value="kg"
            status={checked === 'kg' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('kg')}
          />
          <Text>Kg </Text>
          <RadioButton
            value="meter"
            status={checked === 'meter' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('meter')}
          />
          <Text>Meter</Text>
          <RadioButton
            value="satuan"
            status={checked === 'satuan' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('satuan')}
          />
          <Text>Satuan</Text>
        </View>

        <Text style={styles.titleText}>Harga Per Kg/Meter/Satuan</Text>
        <TextInput
          placeholder="Contoh: 2000 "
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary}
          keyboardType="number-pad"
        />

        <Text style={styles.titleText}>Estimasi Selesai</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Contoh: 3 "
            mode="outlined"
            outlineColor={ColorPrimary}
            activeOutlineColor={ColorPrimary}
            style={{flex: 2}}
            keyboardType="number-pad"
          />
          <DropDown
            // label={'Waktu'}
            placeholder='Waktu'
            mode={'outlined'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={waktu}
            setValue={setWaktu}
            list={waktuList}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LayananRegular')}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TambahLayanan;

const styles = StyleSheet.create({
  titleText: {fontSize: 16, fontWeight: '700', color: 'black', marginTop: 10},
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});
