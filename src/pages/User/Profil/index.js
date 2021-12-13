import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {bgHeader} from '../../../assets/images';
import SIZES, { ColorPrimary } from '../../../utils/constanta';
import {globalStyles} from '../../../utils/global';

const Profil = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={bgHeader}
        style={{width: SIZES.width, height: 120, paddingHorizontal: 20}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 32,
            color: 'white',
            marginTop: 20,
          }}>
          Profil
        </Text>
      </ImageBackground>
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="person" size={30} color="#C4C4C4" />
            <Text
              style={{
                ...globalStyles.H3,
                marginLeft: 10,
              }}>
              Tono
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="pencil" size={24} color="#fff" style={{padding:8, backgroundColor:ColorPrimary, borderRadius:30,}} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="call" size={30} color="#C4C4C4" />
          <Text
            style={{
              ...globalStyles.H3,
              marginLeft: 10,
            }}>
            0812 3456 7890
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="mail" size={30} color="#C4C4C4" />
          <Text
            style={{
              ...globalStyles.H3,
              marginLeft: 10,
            }}>
            tono11@gmail.com
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={{...globalStyles.H3, color: 'white'}}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});
