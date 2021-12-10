import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SIZES, {ColorPrimary} from '../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import {IlustrasiRegister} from '../../assets/images';
import { globalStyles } from '../../utils/global';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function register() {
    navigation.replace('HomePage');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Daftar Akun</Text>
      {/* <Image
        source={IlustrasiRegister}
        style={{width: 145, height: 166}}
        resizeMode="center"
      /> */}

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

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => register()}>
          <Text style={{...globalStyles.titleText, color:'white'}}>Daftar</Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Text>Sudah Punya Akun?</Text>
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
