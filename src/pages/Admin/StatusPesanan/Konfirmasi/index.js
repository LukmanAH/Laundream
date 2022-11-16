import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeranjangIcon, outletLogo } from '../../../../assets/images';
import { HeaderBar, Maps } from '../../../../components';
import SIZES, { API, ColorDanger, ColorPrimary, STATUS_CONFIRMATION,STATUS_QUEUE } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Konfirmasi = ({ navigation, route }) => {
  const { data } = route.params
  const [location, setLocation] = useState({
    latitude: parseFloat(data.lat),
    longitude: parseFloat(data.lng),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [amount, setAmount] = useState('')
  const [info, setInfo] = useState(data.additional_information_laundry);

  const confirmPressed = async () => {
    if(amount){
      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/owner/laundries/${data.laundry.id}/transaction/${data.id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: amount,
          additional_information_laundry: info,
          status: STATUS_QUEUE,  
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == null) {
            navigation.replace('MainApp')
            ToastAndroid.show('Berhasil mengubah status', ToastAndroid.SHORT)
          }
        });
    }else{
      Alert.alert('Field harga wajib diisi');
    }
  }

  const cancelTransactionPressed = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    Alert.alert(
      `Peringatan`,
      `Apakah anda ingin membatalkan transaksi ini ?`,
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/transaction/${data.id}`, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            })
              .then(response => response.json())
              .then(responseJson => {
                console.log(responseJson)
                navigation.replace('MainApp')
                ToastAndroid.show(`Berhasil membatalkan transaksi`, ToastAndroid.SHORT)
              });
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="MainApp"
        title="Detail Pesanan"
      />
      <ScrollView style={{ padding: 20 }}>
        <Text style={globalStyles.bodyText2}>{data.serial}</Text>
        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={globalStyles.bodyText2}>Tanggal Pesan</Text>
            <Text style={globalStyles.bodyText2}>{data.created_at}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={globalStyles.bodyText2}>{data.user.name}</Text>
              <Text style={globalStyles.bodyText}>{data.user.no_hp}</Text>
            </View>
          </View>
          {data.user.no_hp.substring(0,1) == '0'?
            <TouchableOpacity onPress={()=>{ Linking.openURL('https://wa.me/62'+data.user.no_hp.substring(1,data.user.no_hp.length))}}>
              <Icon name="logo-whatsapp" size={30} color="#189D0E" />
            </TouchableOpacity>:
            <TouchableOpacity onPress={()=>{ Linking.openURL('https://wa.me/'+data.user.no_hp)}}>
              <Icon name="logo-whatsapp" size={30} color="#189D0E" />
            </TouchableOpacity>
          }
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={{ ...globalStyles.bodyText2, fontSize: 18 }}>Alamat</Text>
          {/* <Text style={globalStyles.bodyText}>Total Jarak : 12 KM</Text> */}
        </View>

        {/* <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Icon name="map-outline" size={30} color="grey" />
          <Text style={{ ...globalStyles.bodyText, marginLeft: 5 }}>Maps</Text>
        </View>
        <Maps location={location} /> */}
        {/* <Text style={globalStyles.captionText} numberOfLines={2}>
          {data.address}
        </Text> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.textBold}>
            Layanan Antar
          </Text>
          <Text style={{ ...globalStyles.bodyText2, color: ColorPrimary, }}>
            {data.service_type == '1' ? 'Antar Sendiri' : 'Pickup-Delivery'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={styles.textBold}>
            Status Pembayaran
          </Text>
          <Text style={{ ...globalStyles.bodyText2, color: '#22C058', }}>
            {data.payment_type == '1' ? 'Lunas Awal' : 'Lunas Akhir'}
          </Text>
        </View>

        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={{...styles.textBold }}>Estimasi Selesai </Text>
            <Text style={globalStyles.bodyText2}>{data.catalog.estimation_complete} {data.catalog.estimation_type} </Text>
          </View>

        <Text
          style={[
            styles.textBold,
            {
              marginTop: 15,
            },
          ]}>
          Detail Pesanan
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F6F6F6',
            borderRadius: 20,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name={data.catalog.icon}
            style={{
              fontSize: 60,
              color: 'black',
            }}
          />
          <View>
            <Text style={styles.textBold}>{data.catalog.name}</Text>
            <Text style={globalStyles.captionText}>x 1.0 {data.catalog.unit}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.textBold, marginTop: 10 }}>Rp. </Text>
              <TextInput
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  width: '70%',
                  borderColor: '#c4c4c4',
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  ...globalStyles.captionText,
                  fontSize: 17,
                  backgroundColor: '#ffffff',
                  marginBottom:10,
                }}
                value={amount}
                onChangeText={(e) => setAmount(e)} />
            </View>
          </View>
        </View>

       {data.additional_information_user?
          <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                  <Text style={styles.textBold}>
                    Informasi Tambahan Customer
                  </Text>
              </View>
              
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: 'center',
                    }}>

                  <Text style={[globalStyles.bodyText,{margin:10}]}>
                      {data.additional_information_user}
                  </Text>
              </View>
          </View>:null}

        <Text style={[styles.textBold, { marginTop: 15 }]}>
          Informasi Tambahan Laundry
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: '#C4C4C4',
            borderRadius: 20,
            textAlignVertical: 'top',
            paddingHorizontal: 15,
            paddingVertical: 20,
            ...globalStyles.bodyText
          }}
          placeholder="Tidak Ada"
          value={info}
          onChangeText={(e) => setInfo(e)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={confirmPressed}>
          <Text style={styles.textLogin}>Konfirmasi Pesanan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={cancelTransactionPressed}
        >
          <Text style={{ ...globalStyles.H3, color: 'white' }}>
            Batalkan Pesanan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Konfirmasi;

const styles = StyleSheet.create({
  textBold: {
    ...globalStyles.bodyText2,
    fontSize: 18,
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  button2: {
    backgroundColor: ColorDanger,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  textLogin: {
    ...globalStyles.H3,
    color: 'white',
  },
});
