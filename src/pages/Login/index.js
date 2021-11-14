import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import SIZES, {ColorPrimary} from '../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    navigation.replace('HomePage');
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
      />

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textLogin}>Masuk</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 10, alignItems:'center'}}>
          <Text>Belum Punya Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              fontWeight: "500",
              color: ColorPrimary,
              marginLeft:5
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
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
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

export default LoginScreen;
