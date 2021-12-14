import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderBar} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';
import {globalStyles} from '../../../../utils/global';

const EditAdmin = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numPhone, setnumPhone] = useState('');

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
          label={'Email'}
          iconClass={FontAwesome5Icon}
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
          value={numPhone}
          style={styles.textInput}
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
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
          onPress={() => navigation.navigate('HomePage')}>
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
