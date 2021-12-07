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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeranjangIcon, outletLogo } from '../../../../assets/images';
import { HeaderBar, Maps } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';

const Antrian = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: -5.358909,
    longitude: 105.298424,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="StatusPesanan"
        title="Detail Pesanan"
      />
      <ScrollView style={{ padding: 20 }}>
        <Text>TRX/20212101/002</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={outletLogo} style={{ width: 60, height: 60 }} />
            <View>
              <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>
                Lukman
              </Text>
              <Text>081234567890</Text>
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
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>
            Alamat
          </Text>
          <Text>Total Jarak : 12 KM</Text>
        </View>

        {/* <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Icon name="map-outline" size={30} color="grey" />
          <Text>Maps</Text>
        </View>
        <View style={{ borderWidth: 1, height: 160, borderRadius: 20 }}></View> */}

        <Maps
          location={location}
        />

        <Text>
          Jl. Airan Raya No.99, Way Huwi, Kec. Jati Agung, Kabupaten Lampung
          Selatan, Lampung, Indonesia.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>
            Layanan Antar
          </Text>
          <Text style={{ color: ColorPrimary, fontWeight: '700', fontSize: 15 }}>Pickup -Delivery</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>
            Status Pembayaran
          </Text>
          <Text style={{ color: '#22C058', fontWeight: '700', fontSize: 15 }}>Lunas Akhir</Text>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'black',
            marginTop: 20,
          }}>
          Estimasi Selesai
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>03 Oktober 2021</Text>
          <Text>15:00:00 WIB</Text>
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
          <Image
            source={KeranjangIcon}
            style={{ width: 70, height: 70, marginRight: 10 }}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.textBold}>Seprai</Text>
            <Text>x 1.0 Satuan</Text>
          </View>
        </View>

        <Text style={[styles.textBold, { marginTop: 15 }]}>Informasi Tambahan</Text>
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
          }}
          placeholder="Tidak Ada"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Mashok')}>
          <Text style={styles.textLogin}>Proses Pesanan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Antrian;

const styles = StyleSheet.create({
  textBold: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
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
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});
