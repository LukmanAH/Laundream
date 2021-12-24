import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { HeaderBar } from '../../../../../components';
import SIZES, { ColorPrimary } from '../../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from "react-native";
import { globalStyles } from '../../../../../utils/global';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);


const EditLayanan = ({ navigation, route }) => {
  const { data } = route.params
  const [unit, setUnit] = useState(data.unit);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownLayanan, setShowDropDownLayanan] = useState(false);
  const [estimationType, setEstimationType] = useState(data.estimation_type);
  const [layanan, setLayanan] = useState(data.icon);
  const [name, setName] = useState(data.name)
  const [price, setPrice] = useState(data.price.toString())
  const [estimationComplete, setEstimationComplete] = useState(data.estimation_complete.toString())

  const estimationTypeList = [
    {
      label: 'Jam',
      value: 'jam',
    },
    {
      label: 'Hari',
      value: 'hari',
    },
  ];

  const layananList = [
    {
      label: 'Keranjang',
      value: 'bucket-outline',
    },
    {
      label: 'Sprei',
      value: 'bed-empty',
    },
    {
      label: 'Baju',
      value: 'tshirt-crew',
    },
    {
      label: 'Pakaian Dalam',
      value: 'lingerie',
    },
    {
      label: 'Karpet',
      value: 'rug',
    },
    {
      label: 'Jas',
      value: 'account-tie',
    },
  ];

  const editCatalogPressed = async () => {
    if (name && price && estimationComplete && layanan && estimationType) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/catalogs/${data.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          icon: layanan,
          unit: unit,
          price: price,
          estimation_complete: estimationComplete,
          estimation_type: estimationType
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.errors == null) {
            navigation.navigate('LayananRegular')
            ToastAndroid.show('Sukses mengubah layanan', ToastAndroid.SHORT)
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
        title="Edit Layanan"
      />
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={styles.titleText}>Nama Layanan</Text>
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

        <Text style={styles.titleText}>Icon Item</Text>
        <DropDown
          placeholder="Icon Layanan"
          mode={'outlined'}
          visible={showDropDownLayanan}
          showDropDown={() => setShowDropDownLayanan(true)}
          onDismiss={() => setShowDropDownLayanan(false)}
          value={layanan}
          setValue={setLayanan}
          list={layananList}
          backgroundColor="white"

        />

        {/* RadioButton */}
        <Text style={styles.titleText}>Satuan Hitung </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="kg"
            uncheckedColor="black"
            status={unit === 'kg' ? 'checked' : 'unchecked'}
            onPress={() => setUnit('kg')}
          />
          <Text style={{ ...globalStyles.captionText }}>Kg </Text>
          <RadioButton
            value="meter"
            uncheckedColor="black"
            status={unit === 'meter' ? 'checked' : 'unchecked'}
            onPress={() => setUnit('meter')}
          />
          <Text style={{ ...globalStyles.captionText }}>Meter</Text>
          <RadioButton
            value="satuan"
            uncheckedColor="black"
            status={unit === 'satuan' ? 'checked' : 'unchecked'}
            onPress={() => setUnit('satuan')}
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
            value={estimationType}
            setValue={setEstimationType}
            list={estimationTypeList}
            activeColor="white"
            dropDownStyle={{ color: 'red', backgroundColor: 'black' }}
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
          onPress={editCatalogPressed}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditLayanan;

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
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  textInput: {
    width: SIZES.width - 50,
    borderRadius: 16,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
