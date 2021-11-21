import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderBar} from '../../../../components';
import {ColorPrimary} from '../../../../utils/constanta';

const TarifOngkirScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaOutlet"
        title="Tarif Ongkir"
      />
      <View style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 10}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: '#f6f6f6',
              paddingHorizontal: 15,
              paddingVertical: 20,
              borderRadius: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>KM awal</Text>
              <Text style={styles.bodyText}>0</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>KM Akhir</Text>
              <Text style={styles.bodyText}>2</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>Harga</Text>
              <Text style={styles.bodyText}>2000</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onPress={() => alert('Hapus')}>
              <Icon name="trash-outline" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => navigation.navigate('TambahTarifOngkir')}
      />
    </View>
  );
};

export default TarifOngkirScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorPrimary,
  },
  title: {fontSize: 12, fontWeight: '600', color: 'black'},
  bodyText: {fontSize: 24, fontWeight: '700', color: 'black'},
});
