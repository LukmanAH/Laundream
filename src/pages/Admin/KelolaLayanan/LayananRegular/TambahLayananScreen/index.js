import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { HeaderBar } from '../../../../../components';
import SIZES, { ColorPrimary, API } from '../../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import { globalStyles } from '../../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const TambahLayanan = ({ navigation }) => {
  const [unit, setUnit] = useState('kg');
  const [showDropDownLayanan, setShowDropDownLayanan] = useState(false);
  const [layanan, setLayanan] = useState('');
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [estimationComplete, setEstimationComplete] = useState('')

  const [openWaktu, setOpenWaktu] = useState(false);
  const [valueWaktu, setValueWaktu] = useState(null);
  const [waktu, setWaktu] = useState([
    {
      label: 'Jam',
      value: 'jam',
    },
    {
      label: 'Hari',
      value: 'hari',
    },
  ]);

  const [openLayanan, setOpenLayanan] = useState(false);
  const [valueLayanan, setValueLayanan] = useState(null);
  const [layananList, setLayanan] = useState([
    {
      label: 'Keranjang',
      value: 'bucket-outline',
      icon: () => <MaterialCommunityIcons
        name='bucket-outline'
        style={{
          fontSize: 24,
          color: 'black',
        }}
      />
    },
    {
      label: 'Sprei',
      value: 'bed-empty',
      icon: () => <MaterialCommunityIcons
        name='bed-empty'
        style={{
          fontSize: 24,
          color: 'black',
        }}
      />
    },
    {
      label: 'Baju',
      value: 'tshirt-crew',
      icon: () => <MaterialCommunityIcons
        name='tshirt-crew'
        style={{
          fontSize: 24,
          color: 'black',
        }}
      />
    },
    {
      label: 'Pakaian Dalam',
      value: 'lingerie',
      icon: () => <MaterialCommunityIcons
        name='lingerie'
        style={{
          fontSize: 24,
          color: 'black',
        }}
      />
    },
    {
      label: 'Karpet',
      value: 'rug',
      icon: () => <MaterialCommunityIcons
        name='rug'
        style={{
          fontSize: 24,
          color: 'black',
        }}
      />
    },
    {
      label: 'Jas',
      value: 'account-tie',
      icon: () => <MaterialCommunityIcons
        name='account-tie'
        style={{
          fontSize: 24,
          color: 'black',
        }}
      />
    },
  ]);

  const addCatalogPressed = async () => {
    if (name && price && estimationComplete && layanan && valueWaktu) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/catalogs`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          icon: layanan,
          unit: unit,
          price: price,
          estimation_complete: estimationComplete,
          estimation_type: valueWaktu
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.errors == null) {
            navigation.replace('LayananRegular')
            ToastAndroid.show('Sukses menambah layanan', ToastAndroid.SHORT)
          }
        });
    } else {
      alert('Masukkan semua field');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="LayananRegular"
        title="Tambah Layanan"
      />
      <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
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
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
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
        <Text style={styles.titleText}>Jenis Item</Text>

        <DropDownPicker
          open={openLayanan}
          value={valueLayanan}
          items={layananList}
          setOpen={setOpenLayanan}
          setValue={setValueLayanan}
          setItems={setLayanan}
          style={{ backgroundColor: 'white', height: 65, borderRadius: 15, borderColor: 'grey' }}
          labelStyle={globalStyles.bodyText}
          textStyle={globalStyles.bodyText}
          placeholder='Pilih Jenis'
          dropDownContainerStyle={{ borderColor: 'grey' }}
          maxHeight={180}
          scrollViewProps={{
            persistentScrollbar: true
          }}
          listMode={'SCROLLVIEW'}
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
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
        />

        <Text style={styles.titleText}>Estimasi Selesai</Text>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
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
            style={{ ...styles.textInput, flex: 2, marginTop: 0 }}
            inputStyle={globalStyles.bodyText}
            labelStyle={globalStyles.captionText}
          />

          <DropDownPicker
            open={openWaktu}
            value={valueWaktu}
            items={waktu}
            setOpen={setOpenWaktu}
            setValue={setValueWaktu}
            setItems={setWaktu}
            containerStyle={{ flex: 1 }}
            dropDownContainerStyle={{ borderColor: 'grey' }}
            style={{ backgroundColor: 'white', height: 65, borderRadius: 15, borderColor: 'grey' }}
            labelStyle={globalStyles.bodyText}
            textStyle={globalStyles.bodyText}
            placeholder='Waktu'
            zIndex={1}
            listMode={'SCROLLVIEW'}
          />
        </View >
        <TouchableOpacity
          style={styles.button}
          onPress={addCatalogPressed}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView >
    </View >
  );
};

export default TambahLayanan;

const styles = StyleSheet.create({
  titleText: { ...globalStyles.bodyText2, marginVertical: 10 },
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
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
