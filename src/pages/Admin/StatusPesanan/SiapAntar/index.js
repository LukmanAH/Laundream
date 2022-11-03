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
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import Icon from 'react-native-vector-icons/Ionicons';
import { KeranjangIcon, outletLogo } from '../../../../assets/images';
import { HeaderBar, Maps } from '../../../../components';
import SIZES, { API, ColorPrimary, STATUS_CLEAR } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pengantaran = ({ navigation, route }) => {
  const { data } = route.params
  const [deliverylocation, setDeliveryLocation] = useState({
    latitude: parseFloat(data.lat),
    longitude: parseFloat(data.lng),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [laundryCoordinate, setLaundryCoordinate] = useState({
    latitude: parseFloat(data.laundry.lat),
    longitude: parseFloat(data.laundry.lng),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })
  const [info, setInfo] = useState('')

  const deliverPressed = async () => {
    const token = await AsyncStorage.getItem('token');

    await fetch(`${API}/api/v1/owner/laundries/${data.laundry.id}/transaction/${data.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        additional_information_laundry: info,
        status: STATUS_CLEAR
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error == null) {
          navigation.replace('MainApp')
          ToastAndroid.show('Berhasil mengubah status', ToastAndroid.SHORT)
        } 
      });
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 30,
        height: 330,
        // marginTop:-10
      }}>
      
      <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '600', color: 'black',paddingTop:20 }}>Total Tagihan</Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 36,
          fontWeight: '700',
          color: 'black',
        }}>
        {data.amount + data.delivery_fee}
      </Text>
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
          Detail Tagihan
        </Text>
        <View style={{ marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> Harga :</Text>
          {data.amount == null?(
              <Text style={{ fontSize: 14, fontWeight: '500', color: ColorPrimary }}> Menunggu dihitung pihak laundry</Text>
            ):(
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> {data.amount}</Text>
            )
          }
        </View>
        <View style={{ marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> Ongkir :</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> {data.delivery_fee}</Text>
        </View>

        <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
          Detail Layanan
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 5
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>Nama Layanan</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>{data.catalog.name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 5
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>Harga Layanan</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>{data.catalog.price}/{data.catalog.unit}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 8,
          }}>
          <Text>Ongkir</Text>
          <Text>{data.delivery_fee}</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: 'black',
          marginVertical: 5,
        }}
      />
      <Text style={{ alignSelf: 'center', color: 'black' }}>Status Pembayaran</Text>
      {/* <TouchableOpacity
        style={[styles.button, { backgroundColor: 'white', borderWidth:2, borderColor:ColorPrimary }]}
        onPress={() => sheetRef.current.snapTo(1)}>
          
        <Text style={[styles.textLogin, {color:'black'}]}>Lunas Akhir</Text>
      </TouchableOpacity> */}
      
      {data.payment_type == 1 ? 
        (
          <Text style={[styles.textLogin, {color:'#22C058', alignSelf:'center'}]}>Lunas Awal</Text>
        ):(
          <Text style={[styles.textLogin, {color: ColorDanger, alignSelf:'center'}]}>Lunas Akhir</Text>
        )
      }
      
      
    </View>
  );


  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[330, 0, 0]}
        initialSnap={1}
        enabledGestureInteraction={true}
        borderRadius={20}
        renderContent={renderContent}
        renderHeader={renderHeader}
        callbackNode={fall}
        borderWidth={1}
        borderColor="black"
      />
      <Animated.View
        style={{ opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)) }}>
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

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Icon name="map-outline" size={30} color="grey" />
            <Text style={{ ...globalStyles.bodyText, marginLeft: 5 }}>Maps</Text>
          </View>
          <Maps location={laundryCoordinate}  laundry={data.laundry.name} type="laundry" pickCoordinate={deliverylocation} />
        
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
              {data.service_type == '2' ? 'Pickup-Delivery' : 'Antar Sendiri'}
            </Text>
          </View>

          {data.service_type == '2' ?  
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={styles.textBold}>Jarak</Text>
              <Text style={{ ...globalStyles.bodyText2}}>
                {data.distance >= 1 ? data.distance +' KM' : data.distance*1000 +' M'}
              </Text>
            </View> : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={styles.textBold}>Status Pembayaran</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => sheetRef.current.snapTo(0)}>
              <Text style={{ ...globalStyles.bodyText2, color: '#22C058' }}>
                {data.payment_type == '1' ? 'Lunas Awal' : 'Lunas Akhir'}
              </Text>
              <Icon name="chevron-forward-outline" size={20} color="#22C058" />
            </TouchableOpacity>
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
              ...globalStyles.bodyText,
            }}
            placeholder="Tidak Ada"
            value={info}
            onChangeText={(e) => setInfo(e)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={deliverPressed}>
            <Text style={{ ...globalStyles.H3, color: 'white' }}>
              Selesai Diantar
            </Text>
          </TouchableOpacity>
          <View style={{ height: 120 }} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Pengantaran;

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
    marginBottom: 40,
  },
  textLogin: {
    ...globalStyles.H3,
    color: 'white',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 80,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#000',
  },
});
