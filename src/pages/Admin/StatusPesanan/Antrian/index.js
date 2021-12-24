import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeranjangIcon, outletLogo } from '../../../../assets/images';
import { HeaderBar, Maps } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Antrian = ({ navigation, route }) => {
  const { data } = route.params
  const [location, setLocation] = useState({
    latitude: parseFloat(data.lat),
    longitude: parseFloat(data.lng),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [info, setInfo] = useState('')

  const queuePressed = async () => {
    const token = await AsyncStorage.getItem('token');

    await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${data.laundry.id}/transaction/${data.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        additional_information_laundry: info,
        status: 4
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.errors == null) {
          navigation.replace('MainApp')
          ToastAndroid.show('Sukses mengubah status', ToastAndroid.SHORT)
        }
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="MainApp"
        title="Detail Pesanan"
      />
      <ScrollView style={{ padding: 20 }}>
        <Text style={globalStyles.bodyText}>{data.serial}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={outletLogo} style={{ width: 60, height: 60 }} />
            <View style={{ marginTop: 10 }}>
              <Text style={globalStyles.bodyText2}>{data.user.name}</Text>
              <Text style={globalStyles.captionText}>{data.user.no_hp}</Text>
            </View>
          </View>
          <Icon name="logo-whatsapp" size={30} color="#189D0E" />
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

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Icon name="map-outline" size={30} color="grey" />
          <Text style={{ ...globalStyles.bodyText, marginLeft: 5 }}>Maps</Text>
        </View>

        <Maps location={location} />
        <Text style={globalStyles.captionText} numberOfLines={2}>
          {data.address}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.textBold}>Layanan Antar</Text>
          <Text style={{ ...globalStyles.bodyText2, color: ColorPrimary }}>
            {data.service_type == '1' ? 'Pickup-Delivery' : 'Antar Sendiri'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={styles.textBold}>Status Pembayaran</Text>
          <Text style={{ ...globalStyles.bodyText2, color: '#22C058' }}>
            {data.delivery_type == '1' ? 'Lunas Awal' : 'Lunas Akhir'}
          </Text>
        </View>

        {/* <Text
          style={{
            ...styles.textBold,
            marginTop: 20,
          }}>
          Estimasi Selesai
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={globalStyles.bodyText}>03 Oktober 2021</Text>
          <Text style={globalStyles.bodyText}>15:00:00 WIB</Text>
        </View> */}

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
          </View>
        </View>

        <Text style={[styles.textBold, { marginTop: 15 }]}>
          Informasi Tambahan
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
          onPress={queuePressed}>
          <Text style={styles.textLogin}>Proses Pesanan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Antrian;

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
    marginBottom: 40
  },
  textLogin: {
    ...globalStyles.H3,
    color: 'white',
  },
});
