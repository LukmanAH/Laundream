import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import { HeaderBar, Maps, Loading } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../../../utils/global';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import GOOGLE_MAPS_API from '../../../../utils/maps'

const EditProfileOutlet = ({ navigation }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [banner, setBanner] = useState('');
  const [logoOutlet, setLogoOutlet] = useState('');
  const [city, setCity] = useState('');
  const [outlet, setOutlet] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [phone, setPhone] = useState('')
  const [coordinate, setCoordinate] = useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [loading, setLoading] = useState(false)

  const openLibraryImage = tipe => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Cancel');
      } else if (response.error) {
        console.log('Cancel = ', response.errorCode);
      } else {
        const source = response.assets;
        // source[0].uri == letak image
        // source[0].filesize == ukuran image
        if (tipe === 'banner') {
          setLogoOutlet(source);
        }
      }
    });
  };

  const fetchOutletLaundry = async () => {
    setLoading(true)
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);
    setOutlet(laundryParse)

    const token = await AsyncStorage.getItem('token');

    const data = new FormData();
    if (logoOutlet != '') {
      data.append('banner', logoOutlet[0].uri)
    }

    data.append('city', city)
    data.append('address', address)
    data.append('phone', phone)
    data.append('name', outlet)
    data.append('lat', parseFloat(coordinate.latitude).toFixed(7))
    data.append('lng', parseFloat(coordinate.longitude).toFixed(7))

    await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/update`, {
      method: 'PUT',
      enctype: 'multipart/form-data',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        // AsyncStorage.setItem('laundry', JSON.stringify(responseJson.laundry))
        setLoading(false)
      });
  }

  const getOutletInfo = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);
    setOutlet(laundryParse.name)
    setAddress(laundryParse.address)
    setPhone(laundryParse.phone)
    setCity(laundryParse.city)
    setProvince(laundryParse.province)
    setBanner(laundryParse.banner)
    setCoordinate({ ...coordinate, latitude: laundryParse.lat, longitude: laundryParse.lng })
  }

  const getGeocoding = data => {
    Geocoder.init(GOOGLE_MAPS_API);
    Geocoder.from([data.latitude, data.longitude])
      .then(response => {
        const getCity = response.results[0].address_components.filter(
          address => {
            return address.types.includes('administrative_area_level_2');
          },
        );
        const getProvince = response.results[0].address_components.filter(
          address => {
            return address.types.includes('administrative_area_level_1');
          },
        );
        setAddress(response.results[0].formatted_address)
        setCity(getCity[0].long_name);
        setProvince(getProvince[0].long_name)
        setLoading(false)
      })
      .catch(error => console.warn(error));
  }

  const getCoordinate = data => {
    console.log(data)
    setCoordinate(data);
    getGeocoding(data);
  }

  useEffect(() => {
    setLoading(true)
    getOutletInfo();

    Geocoder.init(GOOGLE_MAPS_API);
    Geolocation.getCurrentPosition(x => {
      setCoordinate({
        latitude: x.coords.latitude,
        longitude: x.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      })
      Geocoder.from([x.coords.latitude, x.coords.longitude])
        .then(response => {
          const getCity = response.results[0].address_components.filter(
            address => {
              return address.types.includes('administrative_area_level_2');
            },
          );
          const getProvince = response.results[0].address_components.filter(
            address => {
              return address.types.includes('administrative_area_level_1');
            },
          );
          setAddress(address ? address : response.results[0].formatted_address)
          setCity(city ? city : getCity[0].long_name);
          setProvince(province ? province : getProvince[0].long_name)
          setLoading(false)
        })
        .catch(error => console.warn(error));
    });
  }, [])

  return (
    loading ?
      <Loading />
      : <View style={styles.container}>
        <HeaderBar
          navigation={navigation}
          screenName="KelolaOutlet"
          title="Edit Profil Outlet"
        />
        <ScrollView
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
            <Image
              source={{ uri: banner }}
              style={{
                flex: 1,
                width: 80,
                height: 80,
                backgroundColor: '#c4c4c4',
                borderRadius: 20,
              }}
            />
            <Fumi
              label={'Outlet Kamu'}
              iconClass={FontAwesomeIcon}
              iconName={'store'}
              iconColor={ColorPrimary}
              iconSize={20}
              iconWidth={40}
              inputPadding={20}
              autoCapitalize="none"
              style={{ width: '75%', borderWidth: 1, borderRadius: 20, borderColor: 'grey', marginLeft: 16, }}
              inputStyle={globalStyles.bodyText}
              labelStyle={globalStyles.captionText}
              onChangeText={text => setOutlet(text)}
              value={outlet}
            />
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesomeIcon name='map-marker-alt' size={30} color="grey" />
            <Text style={{ ...globalStyles.bodyText, marginLeft: 5 }}>Maps</Text>
          </View>
          <View>
            <Maps location={coordinate} type="create" getCoordinate={getCoordinate} />

          </View>
          <Fumi
            label="Nomor Ponsel"
            keyboardType="number-pad"
            iconClass={FontAwesomeIcon}
            iconName={'phone'}
            iconColor={ColorPrimary}
            iconSize={20}
            iconWidth={40}
            inputPadding={20}
            autoCapitalize="none"
            style={{ borderWidth: 1, borderRadius: 20, borderColor: 'grey', marginTop: 20 }}
            inputStyle={globalStyles.bodyText}
            labelStyle={globalStyles.captionText}
            onChangeText={text => setPhone(text)}
            value={phone}
          />
          <Text style={{ ...globalStyles.bodyText2, marginTop: 20, marginBottom: 10 }}>Alamat Lengkap</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#C4C4C4',
              borderRadius: 20,
              textAlignVertical: 'top',
              paddingHorizontal: 15,
              paddingVertical: 20,
              ...globalStyles.bodyText,
              height: 100
            }}
            placeholder="Alamat Lengkap"
            multiline={true}
            numberOfLines={5}
            onChangeText={text => setAddress(text)}
            value={address}
          />

          <Text
            style={{
              ...globalStyles.bodyText,
              marginVertical: 5,
            }}>
            Banner
          </Text>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Image
              source={logoOutlet}
              style={{
                width: '65%',
                height: 120,
                borderWidth: 1,
                backgroundColor: '#c4c4c4',
                borderRadius: 20,
              }}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#C4C4C4',
                height: 66,
                width: '30%',
                borderRadius: 20,
                justifyContent: 'center',
              }}
              onPress={() => {
                openLibraryImage('banner');
              }}>
              <Text
                style={{
                  ...globalStyles.H3,
                  textAlign: 'center',
                  color: 'white',
                }}>
                Ganti
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={fetchOutletLaundry}>
            <Text style={styles.btnText}>Simpan</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  btnText: {
    ...globalStyles.H3,
    color: 'white',
  },
});

export default EditProfileOutlet;
