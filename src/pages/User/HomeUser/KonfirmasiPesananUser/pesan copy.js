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

const Pesan = ({ navigation, route }) => {
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

  const confirmPressed = async () => {
    if(parfum){
    if (checked) {
      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/customer/laundries/${data.id}/store`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          catalog_id: catalog.id,
          parfume_id: parfum,
          service_type: layanan,
          payment_type: pembayaran,
          lat: parseFloat(pickUpCoordinate.latitude).toFixed(7),
          lng: parseFloat(pickUpCoordinate.longitude).toFixed(7),
          additional_information_user: additional,
          address: addressInput,
          status: layanan
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          if (responseJson.error == null) {
            handleModal()
            // navigation.replace('Tabs')
            // ToastAndroid.show('Berhasil membuat pesanan', ToastAndroid.SHORT)
            
          }
        });
    } else {
      Alert.alert('Harap setujui ketentuan laundry')
    }
    }else{
      Alert.alert('Silahkan pilih parfume yang tersedia')
    }
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3 }}>
      <RadioButton
        value={item.id}
        status={parfum === item.id ? 'checked' : 'unchecked'}
        onPress={() => setParfum(item.id)}
        color={ColorPrimary}
        uncheckedColor="black"
      />
      <Text style={{ width: SIZES.width * 0.2, ...globalStyles.captionText }} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

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
              <TextInput
                style={{
                  flex: 1,
                  height: 75,
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  marginVertical: 10,
                  borderColor: '#C4C4C4',
                  ...globalStyles.captionText
                }}
                onChangeText={(e) => setAddressInput(e)}
                value={addressInput}
                multiline={true}
              />
            </View>
          ):(
            <View>
              <Maps location={laundryCoordinate} banner={data.banner} laundry={data.name} type="user" getLocation={getLocation} pickCoordinate={pickUpCoordinate} />
            </View>
          )
        }

          <Text style={{ marginTop: 10, ...globalStyles.H3 }}>Detail Pesanan</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name={catalog.icon}
                style={{
                  fontSize: 65,
                  color: 'black',
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={globalStyles.bodyText}>{catalog.name}</Text>
                <Text style={globalStyles.bodyText}>{catalog.estimation_complete} {catalog.estimation_type}</Text>
                <Text style={globalStyles.bodyText}>Rp.{catalog.price}</Text>
              </View>
            </View>
          </View>

          <Text style={{ marginTop: 10, ...globalStyles.H3 }}>Pilih Parfum</Text>
        </View>
      </>
    )
  }
  

  const FooterComponentList = () => {
    return (
      <>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ marginTop: 5, ...globalStyles.H3 }}>Metode Pembayaran</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="1"
              uncheckedColor="black"
              status={pembayaran === '1' ? 'checked' : 'unchecked'}
              onPress={() => setPembayaran('1')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Di Awal</Text>
            <RadioButton
              value="2"
              uncheckedColor="black"
              status={pembayaran === '2' ? 'checked' : 'unchecked'}
              onPress={() => setPembayaran('2')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Di Akhir</Text>
          </View>
          <Text style={{ ...globalStyles.captionText, flex: 1, marginBottom: 10, color: ColorPrimary }}>
            Pembayaran dapat dilakukan ketika kurir menjemput ataupun mengantarkan
            pakaian.
          </Text>

          <Text style={globalStyles.H3}>Informasi Tambahan</Text>
          <TextInput
            style={{
              flex: 1,
              height: 75,
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 10,
              marginVertical: 10,
              borderColor: '#C4C4C4',
              ...globalStyles.captionText
            }}
            onEndEditing={(e) => setAdditional(e)}
            value={additional}
            multiline={true}
          />

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(checked => !checked);
              }}
              color={ColorPrimary}
              uncheckedColor="black"
            />
            <Text style={globalStyles.captionText}>
              Dengan ini, kamu setuju ketentuan perhitungan berat, ongkir dan
              total harga akan dihitung oleh pihak laundry disaat pakaian dijemput
              / diantarkan.
            </Text>
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
              onPress={confirmPressed}
            >
              <Text style={{ ...globalStyles.H3, color: 'white' }}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 10 }} />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={data.parfumes}
        renderItem={renderItem}
        horizontal={false}
        numColumns={5}
        ListHeaderComponent={HeaderComponentList}
        ListFooterComponent={FooterComponentList}
      />

      {/* <ScrollView>
      <HeaderComponentList/>
      <FooterComponentList/>
      </ScrollView> */}
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            width: SIZES.width * 0.8,
            backgroundColor: 'white',
            height: SIZES.height * 0.5,
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 20,
            paddingHorizontal: 40,
          }}>
          {layanan === '2' ? (
            <View>
              <Image
                source={iconMotor}
                style={{
                  width: SIZES.width * 0.5,
                  height: SIZES.width * 0.5,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
              <Text style={{ ...globalStyles.captionText, textAlign: 'center', paddingVertical: 16 }}>
                Berhasil Order, Silahkan tunggu karyawan kami menjemput pakaian
                anda.
              </Text>
            </View>
          ) : (
            <View>
              <Image
                source={KeranjangIcon1}
                style={{
                  width: SIZES.width * 0.3,
                  height: SIZES.width * 0.3,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
              <Text style={{ ...globalStyles.captionText, textAlign: 'center', paddingVertical: 16 }}>
                Berhasil Order, Silahkan antarkan pakaian anda ke gerai kami
                untuk di proses lebih lanjut.
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={okPressed}  
            style={{
              backgroundColor: ColorPrimary,
              alignSelf: 'center',
              paddingHorizontal: 24,
              paddingVertical: 18,
              borderRadius: 16,
            }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Pesan;

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
