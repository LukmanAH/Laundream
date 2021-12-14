import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SIZES, { ColorPrimary, ROLE_CUSTOMER } from '../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../utils/global';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('owner@owner.com');
  const [password, setPassword] = useState('password');

  const loginPressed = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && password) {
      if (emailRegex.test(email)) {
        await fetch('http://192.168.42.174:8000/api/v1/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.error == null) {
              AsyncStorage.setItem('token', responseJson.token);
              AsyncStorage.setItem('user', JSON.stringify(responseJson.user));

              if (responseJson.laundry != null) {
                AsyncStorage.setItem('laundry', JSON.stringify(responseJson.laundry))
              }

              setEmail('');
              setPassword('');

              if (responseJson.user.role == ROLE_CUSTOMER) {
                navigation.replace('Tabs');
              } else {
                navigation.replace('MainApp');
              }
            } else {
              alert(responseJson.error);
            }
          });
      } else {
        alert('Email tidak sesuai');
      }
    } else {
      alert('Masukkan email dan password');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Masuk Laundream</Text>

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

      <View style={styles.bottom}>
        {/* ganti ke user screen bentar */}
        <TouchableOpacity style={styles.button} onPress={loginPressed}>
          <Text style={{ ...globalStyles.titleText, color: 'white', }}>Masuk</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Text style={globalStyles.captionText}>Belum Punya Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
            <Text
              style={{
                ...globalStyles.bodyText2,
                color: ColorPrimary,
                marginLeft: 5
              }}
            >
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    marginTop: 10,
    ...globalStyles.titleText,
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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
