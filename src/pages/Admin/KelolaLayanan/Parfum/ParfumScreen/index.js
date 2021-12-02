import React, { useState, useEffect } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HeaderBar } from '../../../../../components';
import { ColorPrimary } from '../../../../../utils/constanta';
import { FAB } from 'react-native-paper';
import { KeranjangIcon } from '../../../../../assets/images';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Parfum = ({ navigation, data, screenName }) => {

  const parfumeDeletePressed = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    Alert.alert(
      `Peringatan`,
      `Hapus parfum ${data.name}`,
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            await fetch(`http://192.168.42.63:8000/api/v1/owner/laundries/${laundryParse.id}/parfumes/${data.id}`, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            })
              .then(response => response.json())
              .then(responseJson => {
                ToastAndroid.show(`Sukses menghapus parfum ${data.name}`, ToastAndroid.SHORT)
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
        <Image
          source={KeranjangIcon}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'contain',
          }}
        />
        <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: 'black', width: 180 }}>
            {data.name}
          </Text>
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
          onPress={parfumeDeletePressed}>
          <Icon name="trash-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ParfumScreen = ({ navigation }) => {
  const [parfumes, setParfumes] = useState([])

  const fetchParfumesApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`http://192.168.42.63:8000/api/v1/owner/laundries/${laundryParse.id}/parfumes`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setParfumes(responseJson)
      });
  }

  useEffect(() => {
    fetchParfumesApi();
  }, [parfumes])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaLayanan"
        title="Parfum"
      />
      <ScrollView
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
        }}>
        {parfumes.length > 0 && parfumes.map((data, index) => {
          return <Parfum data={data} navigation={navigation} screenName='EditParfum' key={index} />
        })}
      </ScrollView>
      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => navigation.navigate('TambahParfum')}
      />
    </View>
  );
};

export default ParfumScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorPrimary,
  },
});
