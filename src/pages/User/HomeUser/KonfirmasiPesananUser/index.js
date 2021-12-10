import React, {useState} from 'react';
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
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  iconMotor,
  iconTimbangan,
  KeranjangIcon,
  KeranjangIcon1,
  outletLogo,
} from '../../../../assets/images';
import {HeaderBar} from '../../../../components';
import SIZES, {ColorPrimary} from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';

const dataParfum = [
  {
    nama: 'Parfum A',
  },
  {
    nama: 'Parfum B',
  },
  {
    nama: 'Parfum C',
  },
  {
    nama: 'Parfum D',
  },
  {
    nama: 'Parfum E',
  },
];

const KonfirmasiPesanan = ({navigation}) => {
  const [layanan, setLayanan] = useState('pickUp');
  const [parfum, setParfum] = useState('Parfum A');
  const [pembayaran, setPembayaran] = useState('awal');
  const [isPress, setIsPress] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const touchProps = {
    style: isPress ? styles.btnPress : styles.btnNormal,
    onPress: () => {
      setIsPress(!isPress);
    },
  };

  const renderItem = ({item}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <RadioButton
        value={item.nama}
        status={parfum === item.nama ? 'checked' : 'unchecked'}
        onPress={() => setParfum(item.nama)}
        color={ColorPrimary}
      />
      <Text style={{width: SIZES.width * 0.2, ...globalStyles.captionText}} numberOfLines={1}>
        {item.nama}
      </Text>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="DetailPesanan"
        title="Konfirmasi Pesanan"
      />
      <ScrollView
        style={{paddingHorizontal: 20, paddingVertical: 16}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={outletLogo}
            style={{width: 100, height: 100}}
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={globalStyles.H3}>Dennis Laundry</Text>
            <Text style={globalStyles.captionText}>Jl. Ryacudu No.05, Sukarame, Bandar Lampung</Text>
          </View>
        </View>

        <Text style={globalStyles.H3}>Layanan Pengantaran</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value="pickUp"
            status={layanan === 'pickUp' ? 'checked' : 'unchecked'}
            onPress={() => setLayanan('pickUp')}
            color={ColorPrimary}
          />
          <Text style={globalStyles.captionText}>Pickup - Delivery </Text>
          <RadioButton
            value="antar"
            status={layanan === 'antar' ? 'checked' : 'unchecked'}
            onPress={() => setLayanan('antar')}
            color={ColorPrimary}
          />
          <Text style={globalStyles.captionText}>Antar Sendiri</Text>
        </View>

        <Text style={{marginTop: 10, ...globalStyles.H3}}>Lokasi Penjemputan</Text>
        <TextInput
          style={{
            flex: 1,
            height: 75,
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 10,
            borderColor: '#C4C4C4',
            ...globalStyles.captionText
          }}
          multiline={true}
        />

        <Text style={{marginTop: 10, ...globalStyles.H3}}>Detail Pesanan</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width:65, height:65}} source={iconTimbangan} />
            <View style={{marginLeft: 5}}>
              <Text style={globalStyles.bodyText}>Ekspress</Text>
              <Text style={globalStyles.bodyText}>2 Hari</Text>
              <Text style={globalStyles.bodyText}>Rp 5000</Text>
            </View>
          </View>
          {/* <TouchableOpacity {...touchProps}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 15,
                textAlign: 'center',
              }}>
              {isPress === false ? 'Pilih' : 'Hapus'}
            </Text>
          </TouchableOpacity> */}
        </View>

        <Text style={{marginTop: 10, ...globalStyles.H3}}>Pilih Parfum</Text>
        <FlatList
          data={dataParfum}
          renderItem={renderItem}
          horizontal={false}
          numColumns={3}
        />
        <Text style={{marginTop: 10, ...globalStyles.H3}}>Metode Pembayaran</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value="awal"
            status={pembayaran === 'awal' ? 'checked' : 'unchecked'}
            onPress={() => setPembayaran('awal')}
            color={ColorPrimary}
          />
          <Text style={globalStyles.captionText}>Di Awal</Text>
          <RadioButton
            value="akhir"
            status={pembayaran === 'akhir' ? 'checked' : 'unchecked'}
            onPress={() => setPembayaran('akhir')}
            color={ColorPrimary}
          />
          <Text style={globalStyles.captionText}>Di Akhir</Text>
        </View>
        <Text style={{...globalStyles.captionText ,flex: 1, marginBottom: 10, color: ColorPrimary}}>
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
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 10,
            borderColor: '#C4C4C4',
            ...globalStyles.captionText
          }}
          multiline={true}
        />
        <View style={{flexDirection: 'row', flex: 1}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color={ColorPrimary}
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
          <TouchableOpacity style={styles.button} onPress={handleModal}>
            <Text style={{...globalStyles.H3, color:'white'}}>Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 10}} />
      </ScrollView>
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
          {layanan === 'pickUp' ? (
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
              <Text style={{textAlign: 'center', paddingVertical: 16}}>
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
              <Text style={{textAlign: 'center', paddingVertical: 16}}>
                Berhasil Order, Silahkan antarkan pakaian anda ke gerai kami
                untuk di proses lebih lanjut.
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              handleModal();
              navigation.navigate('Tabs');
            }}
            style={{
              backgroundColor: ColorPrimary,
              alignSelf: 'center',
              paddingHorizontal: 24,
              paddingVertical: 18,
              borderRadius: 16,
            }}>
            <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
