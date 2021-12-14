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
import {HeaderBar, Maps} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';

const Pengantaran = ({navigation}) => {
  const [location, setLocation] = useState({
    latitude: -5.358909,
    longitude: 105.298424,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingTop: 22,
        height: 310,
        // marginTop:-10
      }}>
      <Text style={{alignSelf: 'center', ...globalStyles.bodyText}}>
        Total Tagihan
      </Text>
      <Text
        style={{
          alignSelf: 'center',
          ...globalStyles.bodyText2,
          fontSize: 36,
        }}>
        23000
      </Text>
      <View>
        <Text style={globalStyles.bodyText2}>Detail Tagihan</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={globalStyles.captionText}>Subtotal</Text>
          <Text style={globalStyles.captionText}>23000</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 8,
          }}>
          <Text style={globalStyles.captionText}>Bed Cover Single</Text>
          <Text style={globalStyles.captionText}>20000</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 8,
          }}>
          <Text style={globalStyles.captionText}>Ongkir</Text>
          <Text style={globalStyles.captionText}>3000</Text>
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
      <Text style={{alignSelf: 'center', ...globalStyles.bodyText}}>
        Pembayaran
      </Text>
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
          screenName="StatusPesanan"
          title="Detail Pesanan"
        />
        <ScrollView style={{padding: 20}}>
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
            <Text style={{...globalStyles.bodyText2, fontSize: 18}}>
              Alamat
            </Text>
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
            <Text style={styles.textBold}>Layanan Antar</Text>
            <Text style={{...globalStyles.bodyText2, color: ColorPrimary}}>
              Pickup -Delivery
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={styles.textBold}>Status Pembayaran</Text>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => sheetRef.current.snapTo(0)}>
              <Text style={{...globalStyles.bodyText2, color: '#22C058'}}>
                Lunas Akhir
              </Text>
              <Icon name="chevron-forward-outline" size={20} color="#22C058" />
            </TouchableOpacity>
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
              ...globalStyles.bodyText,
            }}
            placeholder="Tidak Ada"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Mashok')}>
            <Text style={{...globalStyles.H3, color: 'white'}}>
              Pesanan Diantar
            </Text>
          </TouchableOpacity>
          <View style={{height: 120}} />
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
