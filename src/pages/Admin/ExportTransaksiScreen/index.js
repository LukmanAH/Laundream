import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, View,ToastAndroid, PermissionsAndroid } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { HeaderBar, Loading } from '../../../components';
import SIZES,  { API, ColorPrimary } from '../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
var RNFS = require('react-native-fs');
import { globalStyles } from '../../../utils/global';
import XLSX from 'xlsx';

const ExportTransaksi = ({ navigation }) => {
  
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState('')

  const [openMonth, setOpenMonth] = useState(false);
  const [valueMonth, setValueMonth] = useState(null);
  const [month, setMonth] = useState([
    {
      label: 'Januari',
      value: '01',
    },
    {
      label: 'Februari',
      value: '02',
    },
    {
      label: 'Maret',
      value: '03',
    },
    {
      label: 'April',
      value: '04',
    },
    {
      label: 'Mei',
      value: '05',
    },
    {
      label: 'Juni',
      value: '06',
    },
    {
      label: 'Juli',
      value: '07',
    },
    {
      label: 'Agustus',
      value: '08',
    },
    {
      label: 'September',
      value: '09',
    },
    {
      label: 'Oktober',
      value: '10',
    },
    {
      label: 'November',
      value: '11',
    },
    {
      label: 'Desember',
      value: '12',
    },
  ]);

  const ExportTransaction = async () => {
    setLoading(true)
    if (year && valueMonth) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/transaction/export`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          year: year,
          month: valueMonth
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == null) {
           //code exportnya
           if(responseJson.all.length >= 1){
              let wb = XLSX.utils.book_new();
              let ws = XLSX.utils.json_to_sheet(responseJson.all)    
              XLSX.utils.book_append_sheet(wb,ws,"Transaction")
              const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

              RNFS.mkdir(RNFS.DownloadDirectoryPath + '/Laundream');

              // Write generated excel to Storage
              RNFS.writeFile(RNFS.DownloadDirectoryPath + '/Laundream/Transaction_'+valueMonth+'_'+year+'.xlsx', wbout, 'ascii').then((r)=>{
                console.log('Success')
                ToastAndroid.show('Berhasil mengexport Laporan, silahkan cek folder download/laundream', ToastAndroid.LONG);
              }).catch((e)=>{
                console.log('Error bro', e);
              });
            }else{
              Alert.alert('Tidak ada transaksi pada '+ month[parseInt(valueMonth)-1].label +' '+ year);
              console.log(month[valueMonth])    
            }
          }else{
           Alert.alert(responseJson.error); 
          }
        });
    } else {
      Alert.alert('Masukkan semua field');
    }
    setLoading(false)
  }


  const handleClick = async () => {

   try{
     // Check for Permission (check if permission is already given or not)
     let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

     if(!isPermitedExternalStorage){

       // Ask for permission
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         {
           title: "Storage permission needed",
           buttonNeutral: "Ask Me Later",
           buttonNegative: "Cancel",
           buttonPositive: "OK"
         }
       );

       
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         // Permission Granted (calling our exportDataToExcel function)
         ExportTransaction();
         console.log("Permission granted");
       } else {
         // Permission denied
         console.log("Permission denied");
       }
     }else{
        // Already have Permission (calling our exportDataToExcel function)
        ExportTransaction();
     }
   }catch(e){
     console.log('Error while checking permission');
     console.log(e);
     return
   }
   
 };

  return (
  loading ? <Loading />
    :
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="HomePage"
        title="Export Laporan Transaksi"
      />
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <Fumi
          label={'Tahun'}
          iconClass={FontAwesomeIcon}
          iconName={'certificate'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setYear(text)}
          autoCapitalize="none"
          keyboardType="number-pad"
          value={year}
          style={styles.textInput}
        />

        

      <DropDownPicker
            open={openMonth}
            value={valueMonth}
            items={month}
            setOpen={setOpenMonth}
            setValue={setValueMonth}
            setItems={setMonth}
            containerStyle={{ flex: 1 }}
            dropDownContainerStyle={{ borderColor: 'grey' }}
            style={{ backgroundColor: 'white', height: 65, borderRadius: 15, borderColor: 'grey', marginTop: 10,width: SIZES.width - 50, }}
            labelStyle={globalStyles.bodyText}
            textStyle={globalStyles.bodyText}
            placeholder='Pilih Bulan'
            zIndex={1}
            listMode={'SCROLLVIEW'}
          />

          
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
          onPress={handleClick}>
          <Text style={styles.btnText}>Export</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExportTransaksi;

const styles = StyleSheet.create({
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
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey'
  },
});
