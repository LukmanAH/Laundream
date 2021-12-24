import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  ToastAndroid,
} from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  iconMotor,
  iconTimbangan,
  KeranjangIcon,
  KeranjangIcon1,
  outletLogo,
} from '../../../../assets/images';
import { HeaderBar, Maps } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KonfirmasiPesanan = ({ navigation, route }) => {
  const { data, catalog, address, coordinate } = route.params;
  const [layanan, setLayanan] = useState('2');
  const [parfum, setParfum] = useState(data.parfumes[0].id);
  const [pembayaran, setPembayaran] = useState('1');
  const [checked, setChecked] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [laundryCoordinate, setLaundryCoordinate] = useState({
    latitude: parseFloat(data.lat),
    longitude: parseFloat(data.lng),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [pickUpCoordinate, setPickUpCoordinate] = useState({
    latitude: parseFloat(coordinate.latitude),
    longitude: parseFloat(coordinate.longitude)
  })
  const [additional, setAdditional] = useState('')
  const [addressInput, setAddressInput] = useState(address)

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const confirmPressed = async () => {
    if (checked) {
      const token = await AsyncStorage.getItem('token');

      await fetch(`http://192.168.42.174:8000/api/v1/customer/laundries/${data.id}/store`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          catalog_id: catalog.id,
          parfume_id: parfum,
          service_type: layanan,
          delivery_type: pembayaran,
          lat: parseFloat(pickUpCoordinate.latitude).toFixed(7),
          lng: parseFloat(pickUpCoordinate.longitude).toFixed(7),
          additional_information_user: additional,
          address: addressInput,
          status: layanan
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          if (responseJson.errors == null) {
            navigation.replace('Tabs')
            ToastAndroid.show('Sukses membuat pesanan', ToastAndroid.SHORT)
            handleModal()
          }
        });
    } else {
      alert('Setujui ketentuan laundry')
    }
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3 }}>
      <RadioButton
        value={item.id}
        status={parfum === item.id ? 'checked' : 'unchecked'}
        onPress={() => setParfum(item.id)}
        color={ColorPrimary}
        uncheckedColor="black"
      />
      <Text style={{ width: SIZES.width * 0.2, ...globalStyles.captionText }} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  const getLocation = (data) => {
    setPickUpCoordinate({ latitude: data.latitude, longitude: data.longitude })
    console.log(data)
  }

  const HeaderComponentList = () => {
    return (
      <>
        <HeaderBar
          navigation={navigation}
          screenName="DetailPesanan"
          title="Konfirmasi Pesanan"
          data={data}
          address={address}
          coordinate={coordinate}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={{ uri: data.banner }}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={globalStyles.H3}>{data.name}</Text>
              <Text style={globalStyles.captionText} numberOfLines={2}>{data.address}</Text>
              <Text style={globalStyles.captionText}>{data.distance} km</Text>
            </View>
          </View>

          <Text style={globalStyles.H3}>Layanan Pengantaran</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="1"
              uncheckedColor="black"
              status={layanan === '2' ? 'checked' : 'unchecked'}
              onPress={() => setLayanan('2')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Antar - Jemput </Text>
            <RadioButton
              value="2"
              uncheckedColor="black"
              status={layanan === '1' ? 'checked' : 'unchecked'}
              onPress={() => setLayanan('1')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Antar Sendiri</Text>
          </View>

          <Maps location={laundryCoordinate} laundry={data.name} type="user" getLocation={getLocation} pickCoordinate={pickUpCoordinate} />

          <Text style={{ marginTop: 10, ...globalStyles.H3 }}>Lokasi Penjemputan</Text>
          <TextInput
            style={{
              flex: 1,
              height: 75,
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 10,
              marginVertical: 10,
              borderColor: '#C4C4C4',
              ...globalStyles.captionText
            }}
            onChangeText={(e) => setAddressInput(e)}
            value={address}
            multiline={true}
          />

          <Text style={{ marginTop: 10, ...globalStyles.H3 }}>Detail Pesanan</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name={catalog.icon}
                style={{
                  fontSize: 65,
                  color: 'black',
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={globalStyles.bodyText}>{catalog.name}</Text>
                <Text style={globalStyles.bodyText}>{catalog.estimation_complete} {catalog.estimation_type}</Text>
                <Text style={globalStyles.bodyText}>Rp.{catalog.price}</Text>
              </View>
            </View>
          </View>

          <Text style={{ marginTop: 10, ...globalStyles.H3 }}>Pilih Parfum</Text>
        </View>
      </>
    )
  }

  const FooterComponentList = () => {
    return (
      <>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ marginTop: 5, ...globalStyles.H3 }}>Metode Pembayaran</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="1"
              uncheckedColor="black"
              status={pembayaran === '1' ? 'checked' : 'unchecked'}
              onPress={() => setPembayaran('1')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Di Awal</Text>
            <RadioButton
              value="2"
              uncheckedColor="black"
              status={pembayaran === '2' ? 'checked' : 'unchecked'}
              onPress={() => setPembayaran('2')}
              color={ColorPrimary}
            />
            <Text style={globalStyles.captionText}>Di Akhir</Text>
          </View>
          <Text style={{ ...globalStyles.captionText, flex: 1, marginBottom: 10, color: ColorPrimary }}>
            Pembayaran dapat dilakukan ketika kurir menjemput ataupun mengantarkan
            pakaian.
          </Text>

          <Text style={globalStyles.H3}>Informasi Tambahan</Text>
          <TextInput
            style={{
              flex: 1,
              height: 75,
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 10,
              marginVertical: 10,
              borderColor: '#C4C4C4',
              ...globalStyles.captionText
            }}
            onChangeText={(e) => setAdditional(e)}
            value={additional}
            multiline={true}
          />
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(checked => !checked);
              }}
              color={ColorPrimary}
              uncheckedColor="black"
            />
            <Text style={globalStyles.captionText}>
              Dengan ini, kamu setuju ketentuan perhitungan berat, ongkir dan
              total harga akan dihitung oleh pihak laundry disaat pakaian dijemput
              / diantarkan.
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              if (checked) {
                handleModal()
              } else {
                alert('Harap setujui ketentuan laundry')
              }
            }}>
              <Text style={{ ...globalStyles.H3, color: 'white' }}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 10 }} />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={data.parfumes}
        renderItem={renderItem}
        horizontal={false}
        numColumns={3}
        ListHeaderComponent={HeaderComponentList}
        ListFooterComponent={FooterComponentList}
      />

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            width: SIZES.width * 0.8,
            backgroundColor: 'white',
            height: SIZES.height * 0.5,
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 20,
            paddingHorizontal: 40,
          }}>
          {layanan === '2' ? (
            <View>
              <Image
                source={iconMotor}
                style={{
                  width: SIZES.width * 0.3,
                  height: SIZES.width * 0.3,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
              <Text style={{ ...globalStyles.captionText, textAlign: 'center', paddingVertical: 16 }}>
                Berhasil Order, Silahkan tunggu karyawan kami menjemput pakaian
                anda.
              </Text>
            </View>
          ) : (
            <View>
              <Image
                source={KeranjangIcon1}
                style={{
                  width: SIZES.width * 0.3,
                  height: SIZES.width * 0.3,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
              <Text style={{ ...globalStyles.captionText, textAlign: 'center', paddingVertical: 16 }}>
                Berhasil Order, Silahkan antarkan pakaian anda ke gerai kami
                untuk di proses lebih lanjut.
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={confirmPressed}
            style={{
              backgroundColor: ColorPrimary,
              alignSelf: 'center',
              paddingHorizontal: 24,
              paddingVertical: 18,
              borderRadius: 16,
            }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default KonfirmasiPesanan;

const styles = StyleSheet.create({
  btnNormal: {
    backgroundColor: ColorPrimary,
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: 'center',
  },
  btnPress: {
    backgroundColor: '#ED1010',
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: 'center',
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
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
});
