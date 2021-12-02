import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  iconKonfirmasi,
  iconMesinCuci,
  iconMotor,
  iconTimbangan,
  KeranjangIcon,
  KeranjangIcon1,
  markIcon,
} from '../../../assets/images';
import {HeaderBar} from '../../../components';
import SIZES, {ColorPrimary} from '../../../utils/constanta';

const listTab = [
  {
    status: 'Konfirmasi',
    icon: iconKonfirmasi,
  },
  {
    status: 'Penjemputan',
    icon: markIcon,
  },
  {
    status: 'Antrian',
    icon: KeranjangIcon1,
  },
  {
    status: 'Proses',
    icon: iconMesinCuci,
  },
  {
    status: 'Siap Ambil',
    icon: KeranjangIcon,
  },
  {
    status: 'Siap Antar',
    icon: iconMotor,
  },
];

const data = [
  {
    status: 'Konfirmasi',
    icon: iconTimbangan,
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukman',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Konfirmasi',
    icon: iconTimbangan,
    invoice: 'TRX/20212101/002',
    pelanggan: 'Apip',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Penjemputan',
    icon: iconTimbangan,
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmen',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Antrian',
    icon: iconTimbangan,
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmin',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Proses',
    icon: iconTimbangan,
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmun',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Siap Ambil',
    icon: iconTimbangan,
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmon',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Siap Antar',
    icon: iconTimbangan,
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmain',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
];

const StatusPesanan = ({navigation}) => {
  const [status, setStatus] = useState('Konfirmasi');
  const [dataList, setDataList] = useState(data)
  const setStatusFilter = status => {
    setDataList([...data.filter(e => e.status === status)])
    setStatus(status);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity key={index} style={styles.wrapItem}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={item.icon}
              style={{width: 70, height: 70}}
              resizeMode="contain"
            />
            <View style={{marginLeft: 8}}>
              <Text>{item.invoice}</Text>
              <Text style={{fontWeight: '700', fontSize: 18, color: 'black'}}>
                {item.pelanggan}
              </Text>
              <Text>Tanggal Pesan : {item.tglPesan}</Text>
              <Text>Estimasi Selesai : {item.estimasi}</Text>
            </View>
          </View>
          <Icon
            name="chevron-forward-outline"
            size={24}
            color={ColorPrimary}
            style={{alignSelf: 'flex-start'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="HomePage"
        title="Status Pesanan"
      />
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          horizontal={true}
          data={listTab}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.tabBtn,
                status === item.status && styles.btnActive,
              ]}
              onPress={() => setStatusFilter(item.status)}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={item.icon}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.textTab,
                    status === item.status && styles.textActive,
                  ]}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <FlatList
          data={dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
          ListFooterComponent={<View style={{height: 210}}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default StatusPesanan;

const styles = StyleSheet.create({
  tabBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 20,
    marginTop: 15,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
  btnActive: {
    backgroundColor: ColorPrimary,
  },
  textActive: {
    color: 'white',
  },
  textTab: {
    marginLeft: 2,
    fontWeight: '700',
    color: '#000',
  },
  wrapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 12,
    borderRadius: 20,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
});
