import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {iconTimbangan, outletLogo} from '../../../../assets/images';
import {HeaderBar} from '../../../../components';
import SIZES, {ColorDanger, ColorPrimary} from '../../../../utils/constanta';

const data = [
  {
    icon: iconTimbangan,
    nama: 'Regular',
    waktu: '3 hari',
    harga: '4.000',
  },
  {
    icon: iconTimbangan,
    nama: 'Ekspress',
    waktu: '2 hari',
    harga: '5.000',
  },
  {
    icon: iconTimbangan,
    nama: 'Kilat',
    waktu: '1 hari',
    harga: '6.000',
  },
];

const DetailPesanan = ({navigation}) => {
  const [isPress, setIsPress] = useState(false);

  const touchProps = {
    style: isPress ? styles.btnPress : styles.btnNormal,
    onPress: () => {
      setIsPress(!isPress);
    },
  };
  function renderItem({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image source={item.icon} />
          <View style={{marginLeft:10}}>
            <Text>{item.nama}</Text>
            <Text>{item.waktu}</Text>
            <Text>Rp {item.harga}</Text>
          </View>
        </View>
        <TouchableOpacity {...touchProps}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 15,
              textAlign: 'center',
            }}>
            {isPress === false ? 'Pilih' : 'Hapus'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="Tabs"
        title="Nama Outlet Laundry"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Image
              source={outletLogo}
              style={{width: 100, height: 100}}
              resizeMode="contain"
            />
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#42E379',
                    marginRight: 4,
                  }}
                />
                <Text>Buka</Text>
              </View>
              <Text style={styles.h3}>Dennis Laundry</Text>
              <Text>Jl. Ryacudu No.05, Sukarame, Bandar Lampung</Text>
            </View>
          </View>

          <Image
            source={{
              uri: 'https://1.bp.blogspot.com/-Wch9riepMds/X-kjArlyeII/AAAAAAAAI1c/Nz_ISWN0LmA_JHRwQ9cduwt0dCfYiOwGQCLcBGAsYHQ/w640-h218/spanduk%2Bbanner%2Blaundry%2Bcdr.png',
            }}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 140,
              borderRadius: 20,
              marginBottom: 10,
            }}
          />
          <Text style={styles.h3}>Layanan Kami</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{height: 40}} />
      </ScrollView>
      <View
        style={{
          // flex: 1,
          // justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('KonfirmasiPesanan')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.textLogin}>1 Layanan</Text>
            <Text
              style={{
                color: 'white',
              }}>
              Lihat Detail
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailPesanan;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 1,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
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
    // alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});
