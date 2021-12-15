import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {HeaderBar} from '../../../../../components';
import SIZES, {ColorPrimary} from '../../../../../utils/constanta';
import { iconTimbangan, jas, KeranjangIcon, shirt } from '../../../../../assets/images';
import { Fumi } from 'react-native-textinput-effects';
import DropDownPicker from 'react-native-dropdown-picker';
import { globalStyles } from '../../../../../utils/global';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';


const EditLayanan = ({navigation}) => {
  const [checked, setChecked] = useState('kg');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [estimationComplete, setEstimationComplete] = useState('');

  
  const [openWaktu, setOpenWaktu] = useState(false);
  const [valueWaktu, setValueWaktu] = useState(null);
  const [waktu, setWaktu] = useState([
    {label: 'Jam', value: 'Jam'},
    {label: 'Hari', value: 'Hari'},
  ]);

  const [openLayanan, setOpenLayanan] = useState(false);
  const [valueLayanan, setValueLayanan] = useState(null);
  const [layananList, setLayanan] = useState([
    {
      label: 'Sprei',
      value: 'Sprei',
      icon: () => <Image source={KeranjangIcon} style={{width:24, height:24}} />
    },
    {
      label: 'Pakaian',
      value: 'Pakaian',
      icon: () => <Image source={shirt} style={{width:24, height:24}} />
    },
    {
      label: 'Daleman',
      value: 'Daleman',
      icon: () => <Image source={iconTimbangan} style={{width:24, height:24}} />
    },
    {
      label: 'Bed',
      value: 'Bed',
      icon: () => <FontAwesomeIcon name="bed" size={24} color={ColorPrimary} />,
    },
    {
      label: 'Karpet',
      value: 'Karpet',
      icon: () => <Image source={iconTimbangan} style={{width:24, height:24}} />
    },
    {
      label: 'Jas',
      value: 'Jas',
      icon: () => <Image source={jas} style={{width:24, height:24}} />
    },
    {
      label: 'Lainnya',
      value: 'Lainnya',
      icon: () => <Image source={iconTimbangan} style={{width:24, height:24}} />
    },
  ]);
  
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="LayananRegular"
        title="Edit Layanan"
      />
      <ScrollView
        style={{paddingHorizontal: 20, paddingVertical: 10}}
        showsVerticalScrollIndicator={false}>
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

        <Text style={styles.titleText}>Jenis Item</Text>
        
        <DropDownPicker
            open={openLayanan}
            value={valueLayanan}
            items={layananList}
            setOpen={setOpenLayanan}
            setValue={setValueLayanan}
            setItems={setLayanan}
            style={{backgroundColor:'white', height:65, borderRadius:15, borderColor:'grey'}}
            labelStyle={globalStyles.bodyText}
            textStyle={globalStyles.bodyText}
            placeholder='Pilih Jenis'
            dropDownContainerStyle={{borderColor:'grey'}}
            maxHeight={180}
            scrollViewProps={{
              persistentScrollbar: true
             }}
             listMode={'SCROLLVIEW'}
          />

        {/* RadioButton */}
        <Text style={styles.titleText}>Satuan Hitung </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value="kg"
            uncheckedColor="black"
            status={checked === 'kg' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('kg')}
          />
          <Text style={{...globalStyles.captionText}}>Kg </Text>
          <RadioButton
            value="meter"
            uncheckedColor="black"
            status={checked === 'meter' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('meter')}
          />
          <Text style={{...globalStyles.captionText}}>Meter</Text>
          <RadioButton
            value="satuan"
            uncheckedColor="black"
            status={checked === 'satuan' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('satuan')}
          />
          <Text style={{...globalStyles.captionText}}>Satuan</Text>
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
        <View style={{flexDirection: 'row', flex:1, alignItems:'center'}}>
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
            style={{...styles.textInput, flex: 2, marginTop: 0}}
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
            containerStyle={{flex:1}}
            dropDownContainerStyle={{borderColor:'grey'}}
            style={{backgroundColor:'white', height:65, borderRadius:15, borderColor:'grey'}}
            labelStyle={globalStyles.bodyText}
            textStyle={globalStyles.bodyText}
            placeholder='Waktu'
            zIndex={1}
            listMode={'SCROLLVIEW'}
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

export default EditLayanan;

const styles = StyleSheet.create({
  titleText: {...globalStyles.bodyText2, marginVertical: 10},
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
