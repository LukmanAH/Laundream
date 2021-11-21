import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderBar} from '../../../../../components';
import {ColorPrimary} from '../../../../../utils/constanta';
import {FAB} from 'react-native-paper';
import {KeranjangIcon} from '../../../../../assets/images';
import Icon from 'react-native-vector-icons/Ionicons';

const Layanan = ({navigation, harga, waktu, layanan, screenName}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        padding: 5,
        marginTop:10
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={KeranjangIcon}
          style={{
            width:60,
            height:60,
            resizeMode: 'contain',
          }}
        />
        <View style={{paddingLeft: 10}}>
          <Text style={{fontWeight: '700', fontSize: 16, color: 'black', width:180}}>
            {layanan}
          </Text>
          <Text style={{color:'black'}}>{waktu}</Text>
          <Text style={{color:'black'}}>{harga} / Kg</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            backgroundColor: ColorPrimary,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
            marginRight: 10,
          }}
          onPress={() => navigation.navigate(screenName)}>
          <Icon name="create-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={() => alert('Hapus')}>
          <Icon name="trash-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LayananRegular = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaLayanan"
        title="Layanan Regular"
      />
      <ScrollView
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
        }}>
        <Text style={{fontSize:24, fontWeight:'700', color:'black'}}>Layanan</Text>
        <Layanan layanan='Regular ' waktu='3 Hari' harga='Rp.8000' navigation={navigation} screenName='EditLayanan'/>
        <Layanan layanan='Ekspress' waktu='2 Hari' harga='Rp.12000' navigation={navigation} screenName='EditLayanan'/>
      </ScrollView>

      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => navigation.navigate('TambahLayanan')}
      />
    </View>
  );
};

export default LayananRegular;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorPrimary,
  },
});
