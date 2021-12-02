import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { HeaderBar } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPegawaiScreen = ({ navigation, route }) => {
  const { data } = route.params

  const [name, setName] = useState(data.user.name)
  const [email, setEmail] = useState(data.user.email)
  const [phone, setPhone] = useState(data.user.no_hp)

  const editEmployeePressed = async () => {
    if (name && email && phone) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`http://192.168.42.63:8000/api/v1/owner/laundries/${laundryParse.id}/employees/${data.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          email: email,
          no_hp: parseInt(phone)
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.errors == null) {
            navigation.replace('Pegawai')
          } else {
            alert('Email telah digunakan');
          }
        });
    } else {
      alert('Masukkan semua field');
    }
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderBar
        navigation={navigation}
        screenName="Pegawai"
        title="Edit Pegawai"
      />

      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Fumi
          label={'Nama'}
          iconClass={FontAwesomeIcon}
          iconName={'user'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
          value={name}
          style={styles.textInput}
        />

        <Fumi
          label={'Telepon'}
          iconClass={FontAwesomeIcon}
          iconName={'phone'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setPhone(text)}
          autoCapitalize="none"
          value={phone}
          style={styles.textInput}
          keyboardType="phone-pad"
        />

        <Fumi
          label={'Email'}
          iconClass={FontAwesomeIcon}
          iconName={'envelope'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType="email-address"
          style={styles.textInput}
        />
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
          onPress={editEmployeePressed}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditPegawaiScreen;

const styles = StyleSheet.create({
  titleText: { fontSize: 16, fontWeight: '700', color: 'black', marginTop: 10 },
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
});