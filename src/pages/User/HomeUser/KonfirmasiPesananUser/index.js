import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  iconMotor,
  iconTimbangan,
  KeranjangIcon,
  KeranjangIcon1,
  outletLogo,
} from '../../../../assets/images';
import { HeaderBar, Maps } from '../../../../components';
import SIZES, { S3, API, ColorPrimary } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import GOOGLE_MAPS_API from '../../../../utils/maps'
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Pesan from './pesan';

const KonfirmasiPesanan = ({ navigation, route }) => {
  const { data, catalog, address, coordinate } = route.params;
  const [layanan, setLayanan] = useState('2');
  const [parfum, setParfum] = useState();
  const [pembayaran, setPembayaran] = useState('1');
  const [checked, setChecked] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [laundryCoordinate, setLaundryCoordinate] = useState({
    latitude: parseFloat(data.lat),
    longitude: parseFloat(data.lng),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [pickUpCoordinate, setPickUpCoordinate] = useState({
    latitude: parseFloat(coordinate.latitude),
    longitude: parseFloat(coordinate.longitude)
  })
  const [additional, setAdditional] = useState('')
  const [info, setInfo] = useState('')
  const [addressInput, setAddressInput] = useState(address)

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const okPressed = ()=>{
    handleModal()
    navigation.replace('Tabs')
  };


  

  

  const getGeocoding = data => {
    Geocoder.init(GOOGLE_MAPS_API);
    Geocoder.from([data.latitude, data.longitude])
      .then(response => {
        // const getCity = response.results[0].address_components.filter(
        //   address => {
        //     return address.types.includes('administrative_area_level_2');
        //   },
        // );
        // const getProvince = response.results[0].address_components.filter(
        //   address => {
        //     return address.types.includes('administrative_area_level_1');
        //   },
        // );
        setAddressInput(response.results[0].formatted_address)
        // setCity(getCity[0].long_name);
        // setProvince(getProvince[0].long_name)
      })
      .catch(error => console.warn(error));
  }

  const getLocation = (data) => {
    setPickUpCoordinate({ latitude: data.latitude, longitude: data.longitude })
    getGeocoding(data)
    console.log(data)
  }

  const HeaderComponentList = () => {
    return (
      <>
    
      </>
    )
  }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <HeaderBar
          navigation={navigation}
          screenName="DetailPesanan"
          title="Konfirmasi Pesanan"
          data={data}
          address={address}
          coordinate={coordinate}
        />
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={{ uri: S3 + '/' + data.banner }}
              style={{ width: 55, height: 55 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft:10 }}>
              <Text style={globalStyles.H3}>{data.name}</Text>
              <Text style={globalStyles.captionText} numberOfLines={2}>{data.address}</Text>
              {data.distance >= 1? (
                  <Text style={globalStyles.captionText}>{data.distance} KM</Text>
                ):(
                  <Text style={globalStyles.captionText}>{data.distance * 1000} M</Text>
                )
              }
            </View>
          </View> */}

          <Text style={globalStyles.H3}>Layanan Pengantaran</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="1"
              uncheckedColor="black"
              status={layanan === '2' ? 'checked' : 'unchecked'}
              onPress={() => setLayanan('2')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Antar - Jemput </Text>
            <RadioButton
              value="2"
              uncheckedColor="black"
              status={layanan === '1' ? 'checked' : 'unchecked'}
              onPress={() => setLayanan('1')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Antar Sendiri</Text>
          </View>
        { 
          layanan == '2'? (
            <View>
              <Maps location={laundryCoordinate} banner={data.banner} laundry={data.name} type="user" getLocation={getLocation} pickCoordinate={pickUpCoordinate} />

              <Text style={{ marginTop: 10, ...globalStyles.H3 }}>Lokasi Penjemputan</Text>
              <View
                style={{
                  flex: 1,
                  height: 75,
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: '#C4C4C4',
                  
                }}
              >
                <Text style={{ 
                  paddingHorizontal: 10,
                  marginVertical: 10,
                  ...globalStyles.captionText 
                  }}>{addressInput}</Text>
              </View>
            </View>
          ):(
            <View>
              <Maps location={laundryCoordinate} banner={data.banner} laundry={data.name} type="user" getLocation={getLocation} pickCoordinate={pickUpCoordinate} />
            </View>
          )
        }
        </View>
      </ScrollView>
      <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={()=>{navigation.navigate('Pesan',{ data: data, catalog: catalog, address: addressInput, layanan:layanan, coordinate: pickUpCoordinate })}}
            >
              <Text style={{ ...globalStyles.H3, color: 'white' }}>Selanjutnya</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 10 }} />

    </SafeAreaView>
  );
};

export default KonfirmasiPesanan;

const styles = StyleSheet.create({
  btnNormal: {
    backgroundColor: ColorPrimary,
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: 'center',
  },
  btnPress: {
    backgroundColor: '#ED1010',
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: 'center',
  },
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
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
});
