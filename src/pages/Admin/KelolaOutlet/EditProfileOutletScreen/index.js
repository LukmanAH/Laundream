import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {outletLogo} from '../../../../assets/images';
import {HeaderBar} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';

const EditProfileOutlet = ({navigation}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [kota, setKota] = useState('');
  const kotaList = [
    {
      label: 'Bandar Lampung',
      value: 'Bandar Lampung',
    },
    {
      label: 'Jakarta',
      value: 'Jakarta',
    },
    {
      label: 'Palembang',
      value: 'Palembang',
    },
  ];
  
  return (
    <View style={styles.container}>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaOutlet"
        title="Edit Profil Outlet"
      />
      <ScrollView
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={outletLogo}
            style={{
              flex: 1,
            }}
          />
          <TextInput
            style={{
              flex: 3,
              marginLeft: 16,
            }}
            label="Outlet kamu"
          />
        </View>

        <TextInput
          style={{
            marginVertical:20
          }}
          label='Nomor Ponsel'
          keyboardType="number-pad"
        />
        <DropDown
              label={"Kota"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={kota}
              setValue={setKota}
              list={kotaList}
            />
            <TextInput
          style={{
            marginVertical:20
          }}
          label='Alamat Lengkap'
          multiline={true}
          numberOfLines={4}
        />
      </ScrollView>
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});

export default EditProfileOutlet;
