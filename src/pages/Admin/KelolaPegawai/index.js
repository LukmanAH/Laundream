import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, ToastAndroid } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBar, Loading } from '../../../components';
import { API, ColorDanger, ColorPrimary, token } from '../../../utils/constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../utils/global';

const Pegawai = ({ navigation, data }) => {

  const deleteEmployeePressed = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    Alert.alert(
      `Peringatan`,
      `Hapus karyawan ${data.user.name}`,
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/employees/${data.id}`, {
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
                navigation.replace('Pegawai')
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
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        padding: 10,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10
      }}>
      <Text style={{ ...globalStyles.bodyText }}>{data.user.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#64CB7B',
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('DetailPegawai', { data: data })}>
          <Icon name="eye-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: ColorPrimary,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('EditPegawai', { data: data })}>
          <Icon name="create-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: ColorDanger,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={deleteEmployeePressed}>
          <Icon name="trash-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PegawaiScreen = ({ navigation }) => {
  const [pegawai, setPegawai] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchPegawaiApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/employees`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setPegawai(responseJson)
      });
  }

  useEffect(() => {
    setLoading(true)
    fetchPegawaiApi();
    setLoading(false)
  }, [])

  return (
    loading ? <Loading />
      : <View style={{ backgroundColor: 'white', flex: 1 }}>
        <HeaderBar
          navigation={navigation}
          screenName="HomePage"
          title="Kelola Pegawai"
        />
        <ScrollView
          style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
          {pegawai.length > 0 && pegawai.map((data, index) => {
            return <Pegawai navigation={navigation} key={index} data={data} />
          })}
        </ScrollView>

        <FAB
          style={styles.fab}
          medium
          icon="plus"
          onPress={() => navigation.navigate('TambahPegawai')}
        />
      </View>
  );
};

export default PegawaiScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorPrimary,
  },
});

