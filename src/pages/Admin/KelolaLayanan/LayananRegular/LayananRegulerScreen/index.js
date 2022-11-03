import React, { useState, useEffect } from 'react';
import { Alert, RefreshControl, ScrollView, DropDown, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { HeaderBar, Loading } from '../../../../../components';
import { ColorPrimary, API } from '../../../../../utils/constanta';
import { FAB } from 'react-native-paper';
import { KeranjangIcon } from '../../../../../assets/images';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Layanan = ({ navigation, data, screenName }) => {
  const deleteCatalogPressed = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    Alert.alert(
      `Peringatan`,
      `Hapus layanan ${data.name}`,
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/catalogs/${data.id}`, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            })
              .then(response => response.json())
              .then(responseJson => {
                console.log(responseJson)  
                navigation.replace('LayananRegular')
                ToastAndroid.show(`${responseJson.message}`, ToastAndroid.SHORT)
              });
          },
        },
      ],
    );

  }

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        padding: 5,
        marginTop: 10
      }}>
      <View style={{ flexDirection: 'row' }}>
        {/* <MaterialCommunityIcons
          name={data.icon}
          style={{
            fontSize: 60,
            color: 'black',
          }}
        /> */}
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: 'black', width: 180 }}>
            {data.name}
          </Text>
          <Text style={{ color: 'black' }}>{`${data.estimation_complete} ${data.estimation_type} `}</Text>
          <Text style={{ color: 'black' }}>{data.price} / {data.unit}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            backgroundColor: ColorPrimary,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
            marginRight: 10,
          }}
          onPress={() => navigation.navigate(screenName, { data: data })}>
          <Icon name="create-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={deleteCatalogPressed}>
          <Icon name="trash-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LayananRegular = ({ navigation }) => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCatalogApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/catalogs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false)
        setCatalogs(responseJson)
      });
  }

  useEffect(() => {
    setLoading(true)
    fetchCatalogApi()
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchCatalogApi();
    }, 1000);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    loading ? <Loading />
      : <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <HeaderBar
          navigation={navigation}
          screenName="KelolaLayanan"
          title="Layanan Regular"
        />
        <ScrollView
          style={{
            paddingHorizontal: 20,
            marginTop: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>

          <Text style={{ fontSize: 24, fontWeight: '700', color: 'black' }}>
            Layanan
          </Text>
          
          {
            catalogs.length > 0 &&catalogs.map((data, index) => {
              return <Layanan data={data} navigation={navigation} screenName='EditLayanan' key={index} />
            })
          }
        </ScrollView>

        <FAB
          style={styles.fab}
          medium
          icon="plus"
          onPress={() => navigation.navigate('TambahLayanan')}
        />
      </View>
  );
};

export default LayananRegular;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorPrimary,
  },
});
