import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {bgHeader, iconTimbangan} from '../../../assets/images';
import SIZES, {ColorPrimary} from '../../../utils/constanta';

const listTab = [
  {
    status: 'Proses',
  },
  {
    status: 'Selesai',
  },
];

const data = [
  {
    status: 'Penjemputan',
    icon: iconTimbangan,
    nama: 'Daily Kiloan',
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukman',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Selesai',
    icon: iconTimbangan,
    nama: 'Daily Kiloan',
    invoice: 'TRX/20212101/002',
    pelanggan: 'Apip',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Menunggu Di Antar',
    icon: iconTimbangan,
    nama: 'Daily Kiloan',
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmen',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Penjemputan',
    icon: iconTimbangan,
    nama: 'Daily Kiloan',
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmin',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Proses',
    icon: iconTimbangan,
    nama: 'Daily Kiloan sdafjklsdfjlkjljalsdkfjk',
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmun',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Selesai',
    icon: iconTimbangan,
    nama: 'Daily Kiloan',
    invoice: 'TRX/20212101/002',
    pelanggan: 'Lukmon',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
  {
    status: 'Selesai',
    icon: iconTimbangan,
    nama: 'Daily Kiloan',
    invoice: 'TRX/20212101/002 asdfsdfsafsdfsasdasdas',
    pelanggan: 'Lukmain',
    tglPesan: '15 Oktober 2021',
    estimasi: '15 Oktober 2021',
  },
];

const Transaksi = ({navigation}) => {
  const [status, setStatus] = useState('Proses');
  const [dataList, setDataList] = useState(
    data.filter(e => e.status !== 'Selesai'),
  );
  const setStatusFilter = status => {
    if (status === 'Proses') {
      setDataList([...data.filter(e => e.status !== 'Selesai')]);
    } else {
      setDataList([...data.filter(e => e.status === 'Selesai')]);
    }

    // setDataList([...data.filter(e => e.status === status)]);
    setStatus(status);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        {status !== 'Selesai' ? (
          <TouchableOpacity key={index} style={styles.wrapItem} onPress={() => {navigation.navigate('DetailTransaksi')}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    padding: 18,
                    backgroundColor: '#F6F6F6',
                    borderRadius: 20,
                  }}>
                  <Image
                    source={item.icon}
                    style={{width: 36, height: 36}}
                    resizeMode="contain"
                  />
                </View>
                <Text style={{marginLeft:5, fontSize:16, fontWeight:'700', color:'black', width:'40%'}} numberOfLines={2}>{item.nama}</Text>
              </View>
              <Text style={{fontSize:14, fontWeight:'600', color:'#22C058', width:'40%', textAlign:'right', paddingRight:16}} numberOfLines={1}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity key={index} style={styles.wrapItem2} onPress={() => {navigation.navigate('DetailTransaksi')}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={item.icon}
                style={{width: 70, height: 70}}
                resizeMode="contain"
              />
              <View style={{marginLeft: 8}}>
                <Text style={{fontWeight: '700', fontSize: 18, color: 'black'}} numberOfLines={1} >
                  {item.invoice}
                </Text>
                <Text>Tanggal Pesan : {item.tglPesan}</Text>
                <Text>Estimasi Selesai : {item.estimasi}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={bgHeader}
        style={{width: SIZES.width, height: 120, paddingHorizontal: 20}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 32,
            color: 'white',
            marginTop: 20,
          }}>
          Transaksi
        </Text>
      </ImageBackground>
      <View style={{paddingHorizontal: 20, marginVertical: 18}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={[styles.tabBtn, status === 'Proses' && styles.btnActive]}
            onPress={() => setStatusFilter('Proses')}>
            <Text
              style={[
                styles.textTab,
                status === 'Proses' && styles.textActive,
              ]}>
              Proses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, status === 'Selesai' && styles.btnActive]}
            onPress={() => setStatusFilter('Selesai')}>
            <Text
              style={[
                styles.textTab,
                status === 'Selesai' && styles.textActive,
              ]}>
              Selesai
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dataList}
          renderItem={renderItem}
          ListFooterComponent={<View style={{height: 250}} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Transaksi;

const styles = StyleSheet.create({
  tabBtn: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(158, 150, 150, .5)',
    width: '48%',
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
    textAlign: 'center',
  },
  wrapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'space-between',
    marginTop: 12,
    borderRadius: 20,
    borderColor: 'rgba(158, 150, 150, .5)',
  },
  wrapItem2: {
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
