import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bgHeader } from '../../../assets/images';
import SIZES from '../../../utils/constanta';
import { globalStyles } from '../../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../components';

const Profil = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function getUser() {
    if (name == '') {
      const getUser = await AsyncStorage.getItem('user');
      const parseObject = JSON.parse(getUser);
      setName(parseObject.name);
      setPhone(parseObject.no_hp);
      setEmail(parseObject.email);
    }
  }

  useEffect(() => {
    setLoading(true)
    getUser()
    setLoading(false)
  }, [])

  return (
    loading ? <Loading />
      :
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground
          source={bgHeader}
          style={{ width: SIZES.width, height: 120, paddingHorizontal: 20 }}>
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
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="person" size={30} color="#C4C4C4" />
            <Text
              style={{
                ...globalStyles.H3,
                marginLeft: 10,
              }}>
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Icon name="call" size={30} color="#C4C4C4" />
            <Text
              style={{
                ...globalStyles.H3,
                marginLeft: 10,
              }}>
              {phone}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Icon name="mail" size={30} color="#C4C4C4" />
            <Text
              style={{
                ...globalStyles.H3,
                marginLeft: 10,
              }}>
              {email}
            </Text>
          </View>
        </View>
      </View>
  );
};

export default Profil;
