import React, { useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { HeaderBar } from '../../../../../components';
import SIZES,  { API, ColorPrimary } from '../../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditParfum = ({ navigation, route }) => {
  const { data } = route.params;

  const [name, setName] = useState(data.name)

  const editParfumePressed = async () => {
    if (name) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/parfumes/${data.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == null) {
            navigation.replace('Parfum')
          }
        });
    } else {
      Alert.alert('Masukkan semua field');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="Parfum"
        title="Edit Parfum"
      />
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <Fumi
          label={'Nama'}
          iconClass={FontAwesomeIcon}
          iconName={'certificate'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
          value={name}
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
          onPress={editParfumePressed}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditParfum;

const styles = StyleSheet.create({
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
