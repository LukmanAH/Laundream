import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {outletLogo} from '../../../../assets/images';
import {HeaderBar} from '../../../../components';
import DropDownPicker from 'react-native-dropdown-picker';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';

const EditProfileOutlet = ({navigation}) => {
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
              borderWidth: 1,
              flex: 3,
              marginLeft: 16,
              padding: 20,
              borderRadius: 16,
            }}
            placeholder="Outlet kamu"
          />
        </View>

        <DropDownPicker
          items={[
            {label: 'Indonesia', value: 'item1'},
            {label: 'Russia', value: 'item2'},
          ]}
          defaultIndex={1}
          containerStyle={{height: 90}}
          onChangeItem={item => console.log(item.label, item.value)}
          placeholder="Pilih kota kamu"
          style={{height: 69, borderRadius: 16, marginTop: 20}}
        />
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            padding: 20,
            borderRadius: 16,
            height: 69,
            marginTop: 20,
          }}
          placeholder="Nomor Ponsel"
          keyboardType="number-pad"
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
