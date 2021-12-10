import React, {useState} from 'react';
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
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import Icon from 'react-native-vector-icons/Ionicons';
import {KeranjangIcon, outletLogo} from '../../../../assets/images';
import {HeaderBar} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';

const DetailTransaksi = ({navigation}) => {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingTop: 22,
        height: 310,
        // marginTop:-10
      }}>
      <Text style={{alignSelf: 'center'}}>Total Tagihan</Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 36,
          fontWeight: '700',
          color: 'black',
        }}>
        23000
      </Text>
      <View>
        <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
          Detail Tagihan
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Subtotal</Text>
          <Text>23000</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 8,
          }}>
          <Text>Bed Cover Single</Text>
          <Text>20000</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 8,
          }}>
          <Text>Ongkir</Text>
          <Text>3000</Text>
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
      <Text style={{alignSelf: 'center', color: 'black'}}>Pembayaran</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#22C058'}]}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.textLogin}>Lunas Akhir</Text>
      </TouchableOpacity>
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
        style={{opacity: Animated.add(0.3, Animated.multiply(fall, 1.0))}}>
        <HeaderBar
          navigation={navigation}
          screenName="Transaksi"
          title="Detail Transaksi"
        />
        <ScrollView style={{padding: 20}}>
          <Text style={{...globalStyles.H3, color: 'black'}}>
            TRX/20212101/00112
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={globalStyles.bodyText}>Tanggal Pesan</Text>
            <Text style={globalStyles.bodyText}>17 Nov 2021 15:00</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={globalStyles.H3}>
              Alamat
            </Text>
            <Text style={globalStyles.bodyText}>Total Jarak : <Text style={globalStyles.bodyText2}>12 KM</Text></Text>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Icon name="map-outline" size={30} color="grey" />
            <Text style={globalStyles.bodyText}>Maps</Text>
          </View>
          <View style={{borderWidth: 1, height: 160, borderRadius: 20}}></View>
          <Text style={globalStyles.captionText}>
            Jl. Airan Raya No.99, Way Huwi, Kec. Jati Agung, Kabupaten Lampung
            Selatan, Lampung, Indonesia.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text
              style={globalStyles.bodyText2}>
              Layanan Antar
            </Text>
            <Text
              style={{color: ColorPrimary, fontFamily:'Montserrat-SemiBold', fontSize: 15}}>
              Pickup -Delivery
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={globalStyles.bodyText2}>
              Status Pembayaran
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => sheetRef.current.snapTo(0)}>
              <Text style={{color: '#22C058', fontFamily:'Montserrat-SemiBold', fontSize: 15}}>
                Lunas Akhir
              </Text>
              <Icon name="chevron-forward-outline" size={20} color="#22C058" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              ...globalStyles.bodyText2,
              marginTop: 20,
            }}>
            Estimasi Selesai
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={globalStyles.captionText}>03 Oktober 2021</Text>
            <Text style={globalStyles.captionText}>15:00:00 WIB</Text>
          </View>

          <Text
            style={{...globalStyles.bodyText2, marginVertical:10}}>
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
              <Text style={globalStyles.bodyText2}>Seprai</Text>
              <Text style={globalStyles.captionText}>x 1.0 Satuan</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text style={globalStyles.bodyText2}>
              Status Transaksi
            </Text>
            <View
              style={{
                backgroundColor: '#22C058',
                paddingHorizontal: 20,
                paddingVertical: 7,
                borderRadius: 20,
              }}>
              <Text style={{color: 'white', fontFamily:'Montserrat-SemiBold', fontSize: 14}}>
                Penjemputan
              </Text>
            </View>
          </View>
          <View style={{height: 160}} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default DetailTransaksi;

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
    marginBottom: 40,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -3},
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
