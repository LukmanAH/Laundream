import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SIZES, { ColorPrimary } from '../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { IlustrasiRegister } from '../../assets/images';
import { globalStyles } from '../../utils/global';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('bal');
  const [email, setEmail] = useState('bals@bal.com');
  const [password, setPassword] = useState('1');
  const [passwordConf, setPasswordConf] = useState('1');
  const [phoneNumber, setPhoneNumber] = useState('123');

  const registerPressed = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && password && passwordConf && phoneNumber && name) {
      if (emailRegex.test(email)) {
        if (password == passwordConf) {
          await fetch('http://192.168.42.63:8000/api/v1/register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
              no_hp: phoneNumber,
              name: name
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.errors == null) {
                ToastAndroid.show('Berhasil membuat akun', ToastAndroid.SHORT);
                navigation.navigate('LoginScreen');
              } else {
                alert('Email telah digunakan')
              }
            });
        } else {
          alert('Password tidak sama');
        }
      } else {
        alert('Email tidak sesuai');
      }
    } else {
      alert('Masukkan seluruh field');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Daftar Akun</Text>

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
        inputStyle={globalStyles.bodyText}
        labelStyle={globalStyles.captionText}
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
        keyboardType="email-address"
        value={email}
        style={styles.textInput}
        inputStyle={globalStyles.bodyText}
        labelStyle={globalStyles.captionText}
      />

      <Fumi
        label={'Nomor Ponsel'}
        iconClass={FontAwesomeIcon}
        iconName={'phone'}
        iconColor={ColorPrimary}
        iconSize={20}
        iconWidth={40}
        inputPadding={20}
        onChangeText={text => setPhoneNumber(text)}
        autoCapitalize="none"
        value={phoneNumber}
        keyboardType="number-pad"
        style={styles.textInput}
        inputStyle={globalStyles.bodyText}
        labelStyle={globalStyles.captionText}
      />
      <Fumi
        label={'Password'}
        iconClass={FontAwesomeIcon}
        iconName={'lock'}
        iconColor={ColorPrimary}
        iconSize={20}
        iconWidth={40}
        inputPadding={20}
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
        value={password}
        style={styles.textInput}
        secureTextEntry={true}
        inputStyle={globalStyles.bodyText}
        labelStyle={globalStyles.captionText}
      />
      <Fumi
        label={'Konfirmasi Password'}
        iconClass={FontAwesomeIcon}
        iconName={'lock'}
        iconColor={ColorPrimary}
        iconSize={20}
        iconWidth={40}
        inputPadding={20}
        onChangeText={text => setPasswordConf(text)}
        autoCapitalize="none"
        value={passwordConf}
        style={styles.textInput}
        secureTextEntry={true}
        inputStyle={globalStyles.bodyText}
        labelStyle={globalStyles.captionText}
      />

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={registerPressed}>
          <Text style={{ ...globalStyles.titleText, color: 'white' }}>Daftar</Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Text style={globalStyles.captionText}>Sudah Punya Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={{
                ...globalStyles.bodyText2,
                color: ColorPrimary,
                marginLeft: 5
              }}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    marginTop: 10,
    ...globalStyles.titleText
  },
  textInput: {
    width: SIZES.width - 50,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
