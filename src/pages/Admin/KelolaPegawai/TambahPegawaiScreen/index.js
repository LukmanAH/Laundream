import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { HeaderBar, Loading } from '../../../../components';
import SIZES, { API,ColorPrimary } from '../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox, RadioButton } from 'react-native-paper';

const TambahPegawaiScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checked, setChecked] = React.useState(false);

  const addEmployeePressed = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && password && confirmPassword&& phone && name) {
      if (emailRegex.test(email)) {
        if(phone.length >= 11 && phone.length <=13){
        if(password.length >= 8){
          if (password == confirmPassword) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/employees`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          email: email,
          no_hp: phone,
          password: password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == null) {
            navigation.replace('Pegawai')
          } else {
            Alert.alert(responseJson.error);
          }
        });
      } else {
        Alert.alert('Password tidak sesuai');
      }
    } else {
      Alert.alert('Password harus tediri dari minimal 8 karakter');
    }
  } else {
    Alert.alert('Nomor hp harus terdiri dari 11-13 karakter');
  }
    } else {
      Alert.alert('Email tidak valid');
    }
  } else {
    Alert.alert('Seluruh field tidak boleh kosong');
  }
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderBar
        navigation={navigation}
        screenName="Pegawai"
        title="Tambah Pegawai"
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

        <Fumi
          label={'Password'}
          iconClass={FontAwesomeIcon}
          iconName={'key'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          value={password}
          secureTextEntry={!checked}
          keyboardType="default"
          style={styles.textInput}
        />

        <Fumi
          label={'Konfirmasi Password'}
          iconClass={FontAwesomeIcon}
          iconName={'key'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setConfirmPassword(text)}
          autoCapitalize="none"
          value={confirmPassword}
          secureTextEntry={!checked}
          keyboardType="default"
          style={styles.textInput}
        />

        
      </View>
      <View style={{ flexDirection:'row', paddingHorizontal: 20, paddingVertical: 1}}>
        
        <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={ColorPrimary}
              uncheckedColor="black"
        />
        <Text style={{ margin:9, color:'black' }}>Tampilkan Password</Text>
        
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
          onPress={addEmployeePressed}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TambahPegawaiScreen;

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
