import React, { useState } from 'react';
import { Text, View, Alert, Image, StyleSheet, Button } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SIZES, { ColorPrimary, ROLE_CUSTOMER, API, ROLE_OWNER, ROLE_EMPLOYEE } from '../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../utils/global';
import { Logo, IlustrasiRegister } from '../../assets/images';
import { Checkbox, RadioButton } from 'react-native-paper';
import {useNetInfo} from "@react-native-community/netinfo";
import OfflineNotice from '../../components/OfflineNotice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const netInfo = useNetInfo();

  const loginPressed = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && password) {
      if (emailRegex.test(email)) {
        if(password.length >= 8){
            if (netInfo.isConnected) {
              setEmail(email.replace(/\s/g, ''))
              setPassword(password.replace(/\s/g, ''))
              await fetch(`${API}/api/v1/login`, {
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
                      navigation.replace('Tabs'); //home customer screen
                    } else if (responseJson.user.role == ROLE_OWNER || responseJson.user.role == ROLE_EMPLOYEE){
                      navigation.replace('MainApp'); //home Admin/employee screen
                    } else {
                      Alert.alert("Akun anda tidak terdaftar!");
                    }
                  } else {
                    Alert.alert(responseJson.error);
                  }
              });
            }else{
                Alert.alert("Anda sedang offline, periksa kembali koneksi internet anda!");
            } 
        }else{
            Alert.alert('Password harus tediri dari minimal 8 karakter');
         }
      } else {
          Alert.alert('Format Email tidak sesuai');
      }
    } else {
        Alert.alert('Field tidak boleh kosong');
    }
  }

  return (
    <View style={styles.container}>
      {netInfo.isConnected ? null:<OfflineNotice/>}
      <Text style={styles.headerText}>Masuk LaunDream</Text>
      <Image source={IlustrasiRegister} resizeMode='center' style={{width: SIZES.width/2, height: SIZES.width*0.6 }}/>
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
        secureTextEntry={!checked}
        inputStyle={globalStyles.bodyText}
        labelStyle={globalStyles.captionText}
      />
       <View style={{ flexDirection:'row', paddingHorizontal: 20, paddingVertical: 1}}>
        
        <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={ColorPrimary}
              uncheckedColor="black"
        />
        <Text style={{ marginTop:9, color:'black' }}>Tampilkan Password</Text>
        
      </View>

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
    width: SIZES.width - 100,
    height: 55,
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
