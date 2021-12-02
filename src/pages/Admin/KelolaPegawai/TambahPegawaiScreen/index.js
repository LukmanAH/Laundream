import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import { HeaderBar } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';

const TambahPegawaiScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderBar
        navigation={navigation}
        screenName="Pegawai"
        title="Tambah Pegawai"
      />

      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Text style={styles.titleText}>Nama Pegawai</Text>
        <TextInput
          placeholder="Nama Pegawai"
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary}
        />

        <Text style={styles.titleText}>Telepon</Text>
        <TextInput
          placeholder="Nomor HP"
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary} h
          keyboardType='phone-pad'
        />

        <Text style={styles.titleText}>Email</Text>
        <TextInput
          placeholder="Email"
          mode="outlined"
          outlineColor={ColorPrimary}
          activeOutlineColor={ColorPrimary} h
          keyboardType='email-address'
        />

        {/* <Text style={styles.titleText}>Role</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value="Admin"
            status={checked === 'Admin' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Admin')}
          />
          <Text>Admin </Text>
          <RadioButton
            value="Karyawan"
            status={checked === 'Karyawan' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Karyawan')}
          />
          <Text>Karyawan</Text>
        </View> */}
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
          onPress={() => navigation.navigate('Pegawai')}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TambahPegawaiScreen;

const styles = StyleSheet.create({
  titleText: { fontSize: 16, fontWeight: '700', color: 'black', marginTop: 10 },
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
