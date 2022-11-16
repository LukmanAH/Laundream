import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, Image, ScrollView, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SIZES,{ API, ColorPrimary } from '../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { IlustrasiRegister } from '../../assets/images';
import { globalStyles } from '../../utils/global';
import { color } from 'react-native-reanimated';
import { Checkbox, RadioButton } from 'react-native-paper';
import {useNetInfo} from "@react-native-community/netinfo";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checked, setChecked] = useState(false);
  const netInfo = useNetInfo();

  const registerPressed = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && password && passwordConf && phoneNumber && name) {
      if (emailRegex.test(email)) {
        if(password.length >= 8){
          if(phoneNumber.length >=11 && phoneNumber.length <=13){

          if (password == passwordConf) {
            if (netInfo.isConnected) {
              
              setEmail(email.replace(/\s/g, ''))
              setPassword(password.replace(/\s/g, ''))
            await fetch(`${API}/api/v1/register`, { 
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                no_hp: phoneNumber
                
              }),
            })
              .then(response => response.json())
              .then(responseJson => {
                if (responseJson.error == null) {
                  ToastAndroid.show('Berhasil membuat akun', ToastAndroid.SHORT);
                  navigation.navigate('LoginScreen');
                } else {
                  Alert.alert(responseJson.error);
                }
              });
          }else{
            Alert.alert("Anda sedang offline, periksa kembali koneksi internet anda!");
          } 
        } else {
          Alert.alert('Password tidak sesuai'); 
        }
      } else {
        Alert.alert('Nomor hp harus tediri dari 11-13 karakter');
      }
      } else {
        Alert.alert('Password harus tediri dari minimal 8 karakter');
      }
      } else {
        Alert.alert('Email tidak valid');
      }
    } else {
      Alert.alert('Seluruh field tidak boleh kosong');
    }
  }

  return (
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={styles.container}>
      <Text style={styles.headerText}>Daftar Akun</Text>
      <Image source={IlustrasiRegister} resizeMode='center' style={{width: SIZES.width/2, height: SIZES.width/2 }}/>
      <Fumi
        label={'Nama'}
        iconClass={FontAwesomeIcon}
        iconName={'user'}
        iconColor={ColorPrimary}
        iconSize={25}
        iconWidth={40}
        inputPadding={16}
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
        inputPadding={16}
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
        inputPadding={16}
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
        inputPadding={16}
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
        value={password}
        style={styles.textInput}
        secureTextEntry={!checked}
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
        inputPadding={16}
        onChangeText={text => setPasswordConf(text)}
        autoCapitalize="none"
        value={passwordConf}
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
  </ScrollView>
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
    width: SIZES.width - 100,
    height: 55,
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
