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
import { globalStyles } from '../../../../utils/global';

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
      <Text style={globalStyles.bodyText}>TRX/20212101/002</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={outletLogo} style={{width: 60, height: 60}} />
            <View>
              <Text style={globalStyles.bodyText2}>Lukman</Text>
              <Text style={globalStyles.captionText}>081234567890</Text>
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
          <Text style={{...globalStyles.bodyText2, fontSize: 18}}>Alamat</Text>
          <Text style={globalStyles.bodyText}>Total Jarak : 12 KM</Text>
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Icon name="map-outline" size={30} color="grey" />
          <Text style={{...globalStyles.bodyText, marginLeft: 5}}>Maps</Text>
        </View>

        <Maps location={location} />
        <Text style={globalStyles.captionText} numberOfLines={2}>
          Jl. Airan Raya No.99, Way Huwi, Kec. Jati Agung, Kabupaten Lampung
          Selatan, Lampung, Indonesia.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.textBold}>
            Layanan Antar
          </Text>
          <Text style={{...globalStyles.bodyText2, color: ColorPrimary, }}>
            Pickup -Delivery
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
          <Text style={{...globalStyles.bodyText2, color: '#22C058',}}>
            Lunas Akhir
          </Text>
        </View>

        <Text
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
            style={{width: 70, height: 70, marginRight: 10}}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.textBold}>Seprai</Text>
            <Text style={globalStyles.captionText}>x 1.0 Satuan</Text>
          </View>
        </View>

        <Text style={[styles.textBold, {marginTop: 15}]}>
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
