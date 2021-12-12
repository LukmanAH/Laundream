import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import {HeaderBar, Maps} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../../../utils/global';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

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
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:10, justifyContent:'space-between'}}>
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
          <Fumi
          label={'Outlet Kamu'}
          iconClass={FontAwesomeIcon}
          iconName={'store'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          autoCapitalize="none"
          style={{width:'75%', borderWidth:1, borderRadius:20, borderColor:'grey'}}
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
        />
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <FontAwesomeIcon name='map-marker-alt' size={30} color="grey"/>
          <Text style={{...globalStyles.bodyText, marginLeft:5}}>Maps</Text>
        </View>
        <Maps location={location} />
        <Fumi
          label="Nomor Ponsel"
          keyboardType="number-pad"
          iconClass={FontAwesomeIcon}
          iconName={'phone'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          autoCapitalize="none"
          style={{borderWidth:1, borderRadius:20, borderColor:'grey', marginTop:20}}
          inputStyle={globalStyles.bodyText}
          labelStyle={globalStyles.captionText}
        />
        {/* <DropDown
          label={'Kota'}
          mode={'outlined'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={kota}
          setValue={setKota}
          list={kotaList}
        /> */}
        <Text style={{...globalStyles.bodyText2, marginTop:20, marginBottom:10}}>Alamat Lengkap</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#C4C4C4',
            borderRadius: 20,
            textAlignVertical: 'top',
            paddingHorizontal: 15,
            paddingVertical: 20,
            ...globalStyles.bodyText,
            height:100
          }}
          placeholder="Alamat Lengkap"
          multiline={true}
          numberOfLines={4}
        />

        <Text
          style={{
            ...globalStyles.bodyText,
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
                ...globalStyles.H3,
                textAlign: 'center',
                color: 'white',
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
    ...globalStyles.H3,
    color: 'white',
  },
});

export default EditProfileOutlet;
