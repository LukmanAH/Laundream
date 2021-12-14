import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HeaderBar } from '../../../../../components';
import SIZES, { ColorPrimary } from '../../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from "react-native";
import { globalStyles } from '../../../../../utils/global';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const TambahLayanan = ({ navigation }) => {
  const [checked, setChecked] = useState('kg');
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownLayanan, setShowDropDownLayanan] = useState(false);
  const [waktu, setWaktu] = useState('');
  const [layanan, setLayanan] = useState('');
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [estimationComplete, setEstimationComplete] = useState('')

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

  const addCatalogPressed = async () => {
    if (name) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/catalogs`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.errors == null) {
            navigation.replace('Parfum')
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
        screenName="LayananRegular"
        title="Tambah Layanan"
      />
      <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
        <Fumi
          label={'Nama Layanan'}
          iconClass={FontAwesomeIcon}
          iconName={'certificate'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
          value={name}
          style={styles.textInput}
        />

        <Text style={styles.titleText}>Jenis Item</Text>
        <DropDown
          // label={'Waktu'}
          placeholder="Jenis Item"
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="kg"
            uncheckedColor="black"
            status={checked === 'kg' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('kg')}
          />
          <Text style={{ ...globalStyles.captionText }}>Kg </Text>
          <RadioButton
            value="meter"
            uncheckedColor="black"
            status={checked === 'meter' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('meter')}
          />
          <Text style={{ ...globalStyles.captionText }}>Meter</Text>
          <RadioButton
            value="satuan"
            uncheckedColor="black"
            status={checked === 'satuan' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('satuan')}
          />
          <Text style={{ ...globalStyles.captionText }}>Satuan</Text>
        </View>

        <Fumi
          label={'Harga'}
          iconClass={FontAwesomeIcon}
          iconName={'certificate'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setPrice(text)}
          autoCapitalize="none"
          value={price}
          keyboardType="number-pad"
          style={styles.textInput}
        />

        <Text style={styles.titleText}>Estimasi Selesai</Text>
        <View style={{ flexDirection: 'row' }}>
          <Fumi
            label={'Estimasi Selesai'}
            iconClass={FontAwesomeIcon}
            iconName={'certificate'}
            iconColor={ColorPrimary}
            iconSize={20}
            iconWidth={40}
            inputPadding={20}
            onChangeText={text => setEstimationComplete(text)}
            autoCapitalize="none"
            value={estimationComplete}
            keyboardType="number-pad"
            style={{ ...styles.textInput, flex: 2, marginTop: 0, }}
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
            activeColor="white"
            dropDownStyle={{ color: 'red', backgroundColor: 'black' }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('test')}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TambahLayanan;

const styles = StyleSheet.create({
  titleText: { fontSize: 16, fontWeight: '700', color: 'black', marginTop: 10 },
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
  textInput: {
    width: SIZES.width - 50,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
