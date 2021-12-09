import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderBar} from '../../../../../components';
import SIZES, {ColorPrimary} from '../../../../../utils/constanta';

const TambahLayanan = ({navigation}) => {
  const [checked, setChecked] = useState('kg');
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownLayanan, setShowDropDownLayanan] = useState(false);
  const [waktu, setWaktu] = useState('');
  const [layanan, setLayanan] = useState('');

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

  const layananList = [
    {
      label: 'Sprei',
      value: 'Spreiasd',
      icon: <Icon name="person" size={24} color="red" />,
    },
    {
      label: 'Pakaian',
      value: 'Pakaian',
    },
    {
      label: 'Daleman',
      value: 'Daleman',
    },
    {
      label: 'Bed',
      value: 'Bed',
    },
    {
      label: 'Karpet',
      value: 'Karpet',
    },
    {
      label: 'Jas',
      value: 'Jas',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="LayananRegular"
        title="Tambah Layanan"
      />
      <ScrollView style={{paddingHorizontal: 20, paddingVertical: 10}} showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>Nama Layanan</Text>
        <TextInput
          placeholder="Contoh: Sprei "
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary}
        />

        <Text style={styles.titleText}>Jenis Item</Text>
        <DropDown
          // label={'Waktu'}
          placeholder="Contoh: Sprei"
          mode={'outlined'}
          visible={showDropDownLayanan}
          showDropDown={() => setShowDropDownLayanan(true)}
          onDismiss={() => setShowDropDownLayanan(false)}
          value={layanan}
          setValue={setLayanan}
          list={layananList}
          showTickIcon={true}
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
            placeholder="Waktu"
            mode={'outlined'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={waktu}
            setValue={setWaktu}
            list={waktuList}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LayananRegular')}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 40,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});
