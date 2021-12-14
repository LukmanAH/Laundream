import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBar, Loading } from '../../../../components';
import { ColorPrimary } from '../../../../utils/constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TarifOngkir = ({ data }) => {

  const deleteShippingRatePressed = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    Alert.alert(
      `Peringatan`,
      `Hapus tarif ongkir?`,
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/shipping/${data.id}`, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            })
              .then(response => response.json())
              .then(responseJson => {
                ToastAndroid.show(`Sukses menghapus tarif ongkir`, ToastAndroid.SHORT)
              });
          },
        },
      ],
    );
  }

  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: '#f6f6f6',
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 20,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>KM awal</Text>
          <Text style={styles.bodyText}>{data.initial_km}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>KM Akhir</Text>
          <Text style={styles.bodyText}>{data.final_km}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Harga</Text>
          <Text style={styles.bodyText}>{data.price}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={deleteShippingRatePressed}>
          <Icon name="trash-outline" size={25} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const TarifOngkirScreen = ({ navigation }) => {
  const [tarif, setTarif] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTarifOngkirApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/shipping`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setTarif(responseJson)
        setLoading(false)
      });
  }

  useEffect(() => {
    setLoading(true)
    fetchTarifOngkirApi();
  }, [])

  return (
    loading ? <Loading />
      : <View style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderBar
          navigation={navigation}
          screenName="KelolaOutlet"
          title="Tarif Ongkir"
        />
        <View style={{ paddingHorizontal: 20 }}>
          {tarif.length > 0 && tarif.map((data, index) => {
            return <TarifOngkir data={data} key={index} />
          })}
        </View>

        <FAB
          style={styles.fab}
          medium
          icon="plus"
          onPress={() => navigation.navigate('TambahTarifOngkir')}
        />
      </View>
  );
};

export default TarifOngkirScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorPrimary,
  },
  title: { fontSize: 12, fontWeight: '600', color: 'black' },
  bodyText: { fontSize: 24, fontWeight: '700', color: 'black' },
});
