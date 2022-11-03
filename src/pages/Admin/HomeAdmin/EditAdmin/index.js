import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, ToastAndroid, Alert, TouchableOpacity} from 'react-native';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderBar} from '../../../../components';
import SIZES, {ColorPrimary, API} from '../../../../utils/constanta';
import {globalStyles} from '../../../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox, RadioButton } from 'react-native-paper';

const EditAdmin = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [numPhone, setnumPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function getUser() { 
    if (name == '') {
      const getUser = await AsyncStorage.getItem('user');
      const parseObject = JSON.parse(getUser);
      setName(parseObject.name);
      setnumPhone(parseObject.no_hp);
    }
  }

  const editProfilPressed = async () => {
    if (name && numPhone && !password && !newPassword && !confirmNewPassword) {
      if(numPhone.length >= 11 && numPhone.length <=13){
      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/profile`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          no_hp: numPhone,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == null) {
            AsyncStorage.setItem('user', JSON.stringify(responseJson.user))
            navigation.navigate('HomePage')
            ToastAndroid.show('Berhasil mengubah profil', ToastAndroid.SHORT)
          }else{
            Alert.alert(responseJson.error);
          }
        });
      } else {
        Alert.alert('Nomor hp harus terdiri dari 11-13 karakter');
      }
    } else if(password || newPassword || confirmNewPassword){

      if(password && newPassword && confirmNewPassword){

        if(numPhone.length >= 11 && numPhone.length <=13){

        if(newPassword.length >= 8){

          if(password != newPassword){
 
          if(newPassword == confirmNewPassword){
            const token = await AsyncStorage.getItem('token');

            await fetch(`${API}/api/v1/profile`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                name: name,
                no_hp: numPhone,
                password : password,
                new_password : newPassword
              })
            })
              .then(response => response.json())
              .then(responseJson => {
                if (responseJson.error == null) {
                  AsyncStorage.setItem('user', JSON.stringify(responseJson.user))
                  setPassword('')
                  setNewPassword('')
                  setConfirmNewPassword('')
                  navigation.navigate('HomePage')
                  ToastAndroid.show('Berhasil mengubah profil', ToastAndroid.SHORT)
                }else{
                  Alert.alert(responseJson.error);
                }
              });
          } else {
            Alert.alert('Field new password dan confirm new password harus sama!');
          }

        }else{
          Alert.alert('Password lama dan password baru tidak boleh sama!');
      }
    
    }else{
      Alert.alert('Password minimal 8 karakter!');
    }
  } else {
    Alert.alert('Nomor hp harus terdiri dari 11-13 karakter');
  }
      }else{
        Alert.alert('Untuk mengubah Profil dan Password, seluruh Field tidak boleh kosong!');
      }
    }else {
      Alert.alert('Field Nama dan Nomor HP tidak boleh kosong!');
    }
  }

  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, []);


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="HomePage"
        title="Edit Profile"
      />

      <View style={{paddingHorizontal: 20, paddingVertical: 1}}>
        <Fumi
          label={'Nama'}
          iconClass={FontAwesome5Icon}
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
      </View>
      
      <View style={{paddingHorizontal: 20, paddingVertical: 1}}>
        <Fumi
          label={'Nomor HP'}
          iconClass={FontAwesome5Icon}
          iconName={'phone'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setnumPhone(text)}
          autoCapitalize="none"
          keyboardType='numeric'
          value={numPhone}
          style={styles.textInput}
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
        />
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 1}}>
        <Fumi
          label={'Password Saat Ini'}
          iconClass={FontAwesome5Icon}
          iconName={'key'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={!checked}
          value={password}
          style={styles.textInput}
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
        />
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 1}}>
        <Fumi
          label={'Password baru'}
          iconClass={FontAwesome5Icon}
          iconName={'key'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setNewPassword(text)}
          autoCapitalize="none"
          secureTextEntry={!checked}
          value={newPassword}
          style={styles.textInput}
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
        />
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 1}}>
        <Fumi
          label={'Konfirmasi Password Baru'}
          iconClass={FontAwesome5Icon}
          iconName={'key'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setConfirmNewPassword(text)}
          autoCapitalize="none"
          secureTextEntry={!checked}
          value={confirmNewPassword}
          style={styles.textInput}
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
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
          onPress={() => editProfilPressed()}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditAdmin;

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
    ...globalStyles.H3,
    color: 'white',
  },
  textInput: {
    width: SIZES.width - 50,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
