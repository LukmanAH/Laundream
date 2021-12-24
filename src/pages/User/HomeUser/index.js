import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { outletLogo, smatLaundry, userHeader } from '../../../assets/images';
import SIZES from '../../../utils/constanta';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import GOOGLE_MAPS_API from '../../../utils/maps'
import { globalStyles } from '../../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../components';

const data = [
  {
    status: 'online',
    nama: 'Dennis Laundry',
    alamat: 'Jl. Ryacudu No.05, Sukarame, Bandar Lampung',
    image: outletLogo,
  },
  {
    status: 'online',
    nama: 'Smarty Laundry',
    alamat: 'Jl. Airan Raya No.20, Way Huwi, Kec. Jati Agung ',
    image: smatLaundry,
  },
  {
    status: 'offline',
    nama: 'Oyo Laundry',
    alamat: 'Jl. Ryacudu No.05, Sukarame, Bandar Lampung',
    image: outletLogo,
  },
  {
    status: 'offline',
    nama: 'Low Laundry asdasdsda',
    alamat: 'Jl. Ryacudu No.05, Sukarame, Bandar Lampung sdfhkjhsdfkjhsdkjfhkjsdfh',
    image: smatLaundry,
  },
];

const Home = ({ navigation }) => {
  const [location, setLocation] = useState('')
  const [coordinate, setCoordinate] = useState({
    latitude: '',
    longitude: '',

  });
  const [laundries, setLaundries] = useState([])
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')

  const getNearestLaundry = async (x) => {
    setLoading(true)
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    await fetch(`http://192.168.42.174:8000/api/v1/customer/laundries?lat=${x.coords.latitude}&lng=${x.coords.longitude}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLaundries(responseJson)
        setLoading(false)
      });
  }

  useEffect(() => {
    setLoading(true)

    Geocoder.init(GOOGLE_MAPS_API);
    Geolocation.getCurrentPosition(x => {
      setCoordinate({
        latitude: x.coords.latitude,
        longitude: x.coords.longitude,
      })
      getNearestLaundry(x)

      Geocoder.from([x.coords.latitude, x.coords.longitude])
        .then(response => {
          const filterred_area = response.results[0].address_components.filter(
            address => {
              return address.types.includes('administrative_area_level_2');
            },
          );
          setLocation(filterred_area[0].long_name);
          setAddress(response.results[0].formatted_address)
        })
        .catch(error => console.warn(error));
    });
    console.log(coordinate.lat, coordinate.lng)

  }, [])

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: 160,
          height: 250,
          borderRadius: 24,
          backgroundColor: '#FFFEF4',
          marginRight: 16,
          marginBottom: 16,
          ...styles.shadow,
        }}
        onPress={() => navigation.navigate('DetailPesanan', { data: item, address: address, coordinate: coordinate })}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: (item.status === 1) ? '#42E379' : 'red',
            borderRadius: 10,
            alignSelf: 'flex-end',
            margin: 15,
          }}
        />
        <Image
          source={{ uri: item.banner }}
          resizeMode="contain"
          style={{ width: 100, height: 84, alignSelf: 'center' }}
        />
        <View
          style={{
            width: '100%',
            height: 75,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            padding: 16,
          }}>
          <Text style={{ ...globalStyles.bodyText2, fontSize: 14 }} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{ ...globalStyles.captionText, color: '#6D6D6D', fontSize: 10 }} numberOfLines={2}>
            {item.distance} km
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const InfoCard = () => {
    return (
      <TouchableOpacity
        style={{
          width: SIZES.width * 0.84,
          height: 150,
          borderRadius: 24,
          backgroundColor: '#F4F6F6',
          ...styles.shadow,
          justifyContent: 'center',
          marginBottom: 15
        }}>
        <Text
          style={{
            alignSelf: 'center',
            ...globalStyles.titleText
          }}>
          Coming Soon
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    loading ? <Loading />
      : <ScrollView style={styles.container}>
        <ImageBackground
          source={userHeader}
          style={{ width: SIZES.width, height: 166 }}>
          <View
            style={{
              paddingBottom: 25,
              paddingHorizontal: 40,
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Icon name="location" size={40} color="white" />
                </TouchableOpacity>
                <View>
                  <Text style={{ ...globalStyles.bodyText2, color: 'white', }}>
                    Lokasi
                  </Text>
                  <Text style={{ ...globalStyles.bodyText, color: 'white' }}>{location}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <Icon name="notifications" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={{ paddingLeft: 28 }}>
          <Text
            style={{
              ...globalStyles.titleText,
              marginBottom: 12,
              marginTop: 10,
            }}>
            Outlet Sekitar Anda
          </Text>

          <FlatList
            data={laundries}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          />

          <Text
            style={{
              ...globalStyles.titleText,
              marginBottom: 12,
              marginTop: 10,
            }}>
            Info dan Promo
          </Text>
          <InfoCard />
          <InfoCard />
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 1,
  },
});
