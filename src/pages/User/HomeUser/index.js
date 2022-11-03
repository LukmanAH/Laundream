import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  DevSettings,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { outletLogo, smatLaundry, userHeader, iconList } from '../../../assets/images';
import SIZES, {API,ColorPrimary, S3} from '../../../utils/constanta';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import GOOGLE_MAPS_API from '../../../utils/maps'
import { globalStyles } from '../../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../components';
import OfflineNotice from '../../../components/OfflineNotice';

import {useNetInfo} from "@react-native-community/netinfo";



const Home = ({ navigation }) => {
  const [location, setLocation] = useState('')
  const [coordinate, setCoordinate] = useState({
    latitude: '',
    longitude: '',
  });
  const [laundries, setLaundries] = useState([])
  
  const [informations, setInformations] = useState([])
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')

  const netInfo = useNetInfo();


  async function getUser() { 
    
    if (name == '') {
      const getUser = await AsyncStorage.getItem('user');
      const parseObject = JSON.parse(getUser);
      setName(parseObject.name);
    }
  }

  const getNearestLaundry = async (x) => {
    const token = await AsyncStorage.getItem('token');

    await fetch(`${API}/api/v1/customer/laundries?lat=${x.coords.latitude}&lng=${x.coords.longitude}`, {
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
      });
  }

  const getInformations = async (x) => {

    await fetch(`${API}/api/v1/info`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setInformations(responseJson)
      });
  }

  useEffect(() => {
    setLoading(true);
    getUser();
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
                return address.types.includes('administrative_area_level_4');
              },
            );
            setLocation(filterred_area[0].long_name);
            setAddress(response.results[0].formatted_address)
          })
          .catch(error => console.warn(error));
      });
      
      console.log(coordinate.latitude, coordinate.longitude)
      getInformations()
      
      console.log('refresh')
      setLoading(false);



    const interval=setInterval(()=>{
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
                return address.types.includes('administrative_area_level_4');
              },
            );
            setLocation(filterred_area[0].long_name);
            setAddress(response.results[0].formatted_address)
          })
          .catch(error => console.warn(error));
      });
      
      console.log(coordinate.latitude, coordinate.longitude)
      getInformations()

      console.log('refresh')
    },30000)
    
  return()=>clearInterval(interval)

  }, [])

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: 160,
          height: 235,
          borderRadius: 24,
          backgroundColor: '#FFFEF4',
          marginRight: 16,
          marginBottom: 16,
          ...styles.shadow,
          elevation: 3,
        }}
        onPress={() =>{ 
          navigation.navigate('DetailPesanan', { data: item, address: address, coordinate: coordinate })
        }}
      >
        <Image
          source={{ uri: `${S3}/` + item.banner}} 
          resizeMode="stretch"
          style={{ width: 160, height: 160, alignSelf: 'center' }}
        />
        <View
          style={{ 
            width: 20,
            height: 20,
            backgroundColor: (item.condition === 1) ? '#42E379' : 'grey',
            borderRadius: 10,
            alignSelf: 'flex-end',
            margin: 10,
            position: 'absolute',
          }}
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

          {item.distance >= 1 ? (
            <Text style={{ ...globalStyles.captionText, color: '#6D6D6D'}} numberOfLines={2}>
              {item.distance} KM
            </Text>
          ):(
            <Text style={{ ...globalStyles.captionText, color: '#6D6D6D' }} numberOfLines={2}>
              {item.distance * 1000} M
            </Text>
          )
          }

        </View>
      </TouchableOpacity>
    );
  };

  const renderInfo = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: SIZES.width * 0.80,
          height: SIZES.width * 0.40,
          borderRadius: 24,
          backgroundColor: '#FFFEF4',
          marginRight: 16,
          marginBottom: 16,
          ...styles.shadow,
          elevation: 3,
        }}
        onPress={() =>{ 
          navigation.navigate('DetailInfo', { data: item})
        }}
      >
        <Image
          source={{ uri: `${S3}/`+ item.picture}}
          resizeMode="stretch"
          style={{ width:'100%', height: SIZES.width * 0.30, alignSelf: 'center' }}
        />
      
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            padding: 16,
          }}>
          <Text style={{ ...globalStyles.bodyText2, fontSize: 14 }} numberOfLines={1}>
            {item.title}
          </Text>

        </View>
      </TouchableOpacity>
    );
  };

 
  return (
    loading ? <Loading />
      : <ScrollView style={styles.container}>
        <ImageBackground
          source={userHeader}
          style={{ width: SIZES.width, height: SIZES.width*0.42 }}>
            
          <View
            style={{
              paddingBottom: 25,
              paddingHorizontal: 40,
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <View>
              
      
            {/* <Icon name="person" size={40} color="white" /> */}
            <Text style={{ ...globalStyles.bodyText2, color: 'white', }}>
              Halo, 
            </Text>

            <Text style={{ ...globalStyles.H3, color: 'white', }}>
              {name.split(' ').slice(0,1).join(' ')} 
            </Text>
            </View>
            
            
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row' }}>
                
                <View>
                  <Text style={{ ...globalStyles.bodyText2, color: 'white', textAlign:'right' }}>
                    Lokasi 
                  </Text>
                  <Text style={{ ...globalStyles.bodyText2, color: 'white' }}>{location} </Text>
                </View>
                <TouchableOpacity>
                  <Icon name="location" size={40} color="#d63031" />
                </TouchableOpacity>
              </View>
            </View>
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
          
          {laundries.length > 0 ?
              (
              <FlatList
                data={laundries}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              />
              ):(
              <View style={{ 
                backgroundColor:'blue',
                width: SIZES.width*0.85,
                height: 250,
                borderRadius: 24,
                backgroundColor: 'white',
                marginBottom: 16,
                ...styles.shadow,
                elevation: 3,
                alignItems: 'center',
                justifyContent: 'center'

              }}>
                <Image
                        source={iconList}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                  />
                  <Text 
                    style={{
                      ...globalStyles.H3,
                      color:'grey',
                      margin:5
                    }}
                  > 
                    Oooopsss!
                  </Text>
                  <Text 
                    style={{
                      ...globalStyles.H4,
                      color:'grey',
                      margin:3
                    }}
                  > 
                    Belum ada mitra LaunDream disekitar anda :(
                  </Text>
              
              </View>
             )
          }

          

        {informations.length > 0 ?(
          <View>
            <Text
              style={{
                ...globalStyles.titleText,
                marginBottom: 12,
                marginTop: 10,
              }}>
              Informasi
            </Text>

            <FlatList
              data={informations}
              renderItem={renderInfo}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />
          </View>):null}
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
