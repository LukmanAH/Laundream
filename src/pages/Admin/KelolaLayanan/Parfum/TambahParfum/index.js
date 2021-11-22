import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {HeaderBar} from '../../../../../components';
import SIZES, {ColorPrimary} from '../../../../../utils/constanta';

const TambahParfum = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="Parfum"
        title="Tambah Parfum"
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 5}}>
          Wangi Parfum
        </Text>
        <TextInput
          placeholder="Contoh: Mawar "
          activeUnderlineColor={ColorPrimary}
          backgroundColor="#f7f7f7"
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
          onPress={() => navigation.navigate('Parfum')}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TambahParfum;

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
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});
