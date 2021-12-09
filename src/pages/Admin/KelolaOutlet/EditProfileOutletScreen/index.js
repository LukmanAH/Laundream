import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import {HeaderBar, Maps} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfileOutlet = ({navigation}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [Banner, setBanner] = useState('');
  const [logoOutlet, setLogoOutlet] = useState('');
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

  const [location, setLocation] = useState({
    latitude: -5.358909,
    longitude: 105.298424,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const openLibraryImage = tipe => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: true,
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('Cancel');
      } else if (response.error) {
        console.log('Cancel = ', response.errorCode);
      } else {
        const source = response.assets;
        // source[0].uri == letak image
        // source[0].filesize == ukuran image
        if (tipe === 'banner') {
          setBanner(source);
        }
        if (tipe === 'logo') {
          setLogoOutlet(source);
        }
      }
    });
  };

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
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:10}}>
          <TouchableOpacity
            onPress={() => {
              openLibraryImage('logo');
            }}>
            <Image
              source={logoOutlet}
              style={{
                flex: 1,
                width: 80,
                height: 80,
                backgroundColor: '#c4c4c4',
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 3,
              marginLeft: 16,
            }}
            label="Outlet kamu"
          />
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Icon name="map-outline" size={30} color="grey" />
          <Text>Maps</Text>
        </View>
        <Maps location={location} />

        <TextInput
          style={{
            marginVertical: 20,
          }}
          label="Nomor Ponsel"
          keyboardType="number-pad"
        />
        <DropDown
          label={'Kota'}
          mode={'outlined'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={kota}
          setValue={setKota}
          list={kotaList}
        />
        <TextInput
          style={{
            marginVertical: 20,
          }}
          label="Alamat Lengkap"
          multiline={true}
          numberOfLines={4}
        />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: 'black',
            marginVertical: 5,
          }}>
          Banner
        </Text>
        <View
          style={{
            marginBottom: 100,
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Image
            source={Banner}
            style={{
              width: '65%',
              height: 120,
              borderWidth: 1,
              backgroundColor: '#c4c4c4',
              borderRadius: 20,
            }}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#C4C4C4',
              height: 66,
              width: '30%',
              borderRadius: 20,
              justifyContent: 'center',
            }}
            onPress={() => {
              openLibraryImage('banner');
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Ganti
            </Text>
          </TouchableOpacity>
        </View>
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
