import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HeaderBar} from '../../../../../components';
import { ColorPrimary } from '../../../../../utils/constanta';

const LayananRegular = ({navigation}) => {
  return (
    <View style={{
        flex:1,
        backgroundColor:'white'
    }}>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaLayanan"
        title="Layanan Regular"
      />
      <Text>Layanan Regular</Text>
      <View style={{
          paddingHorizontal:20,
          marginTop:10  
      }}>

      <TouchableOpacity style={{
          width:'100%',
          height:40,
          backgroundColor:ColorPrimary,
          justifyContent:'center',
          alignItems:'center',
      }}
      onPress={() => navigation.navigate("TambahLayanan")}>
          <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>Tambah Layanan</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LayananRegular;
