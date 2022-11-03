import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { bgHeader, iconTimbangan, iconList } from '../../../assets/images';
import SIZES, { ColorPrimary, API } from '../../../utils/constanta';
import { globalStyles } from '../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../components';

const Transaksi = ({ navigation }) => {
  const [status, setStatus] = useState('1');
  const [dataList, setDataList] = useState([]);
  const [dataListFilter, setDataListFilter] = useState([]);
  
  const [dataProses, setDataProses] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);

  const [loading, setLoading] = useState(false)

  


  const setStatusFilter = status => {
    if (status == '1') {
      setDataListFilter([...dataList.filter(e => e.status != '7')]);
    } else {
      setDataListFilter([...dataList.filter(e => e.status == '7')]);
    }

    setStatus(status);
  };

  const fetchTransactionApi = async () => {
    const token = await AsyncStorage.getItem('token');

    await fetch(`${API}/api/v1/customer/laundries/transaction`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setDataList(responseJson)
        setDataListFilter([...responseJson.filter(e => e.status != '7')])
        
      });
  }

  useEffect(() => {
    setLoading(true)
    fetchTransactionApi()
    setLoading(false)
  }, [])


  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        {status != '7' ? (
          <TouchableOpacity
            key={index}
            style={styles.wrapItem}
            onPress={() => {
              navigation.navigate('DetailTransaksi', { data: item });
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    padding: 18,
                    backgroundColor: '#F6F6F6',
                    borderRadius: 20,
                  }}>
                  <MaterialCommunityIcons
                    name={item.catalog.icon}
                    style={{
                      fontSize: 70,
                      color: 'black',
                    }}
                  />
                </View>
                <View style={{ marginLeft: 5 }}> 
                  <Text
                    style={globalStyles.bodyText2}
                    numberOfLines={1}>
                    {item.serial}
                  </Text>
                  <Text style={{ ...globalStyles.bodyText }} numberOfLines={1}>
                    Rp. {item.amount}
                  </Text>
                  <Text
                    style={{ ...globalStyles.bodyText, color: '#22C058' }}
                    numberOfLines={1}>
                    {item.status == '1' ?
                      'Konfirmasi' : item.status == '2' ?
                        'Siap Jemput' : item.status == '3' ?
                          'Antrian' : item.status == '4' ?
                            'Proses' : item.status == '5' ?
                              'Siap Ambil' : item.status == '6' ?
                                'Siap Antar' : 'Selesai'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={index}
            style={styles.wrapItem2}
            onPress={() => {
              navigation.navigate('DetailTransaksi',{ data: item });
            }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name={item.catalog.icon}
                style={{
                  fontSize: 70,
                  color: 'black',
                }}
              />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={globalStyles.bodyText2}
                  numberOfLines={1}>
                  {item.serial}
                </Text>
                <Text style={globalStyles.captionText}>Tanggal Pesan : {item.created_at}</Text>
                <Text style={globalStyles.captionText}>Tanggal Selesai : {item.updated_at}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    loading ? <Loading />
      : <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground
          source={bgHeader}
          style={{ width: SIZES.width, height: 120, paddingHorizontal: 20 }}>
          <Text
            style={{
              ...globalStyles.titleText,
              color: 'white',
              fontSize: 32,
              marginTop: 20,
            }}>
            Transaksi
          </Text>
        </ImageBackground>
        <View style={{ paddingHorizontal: 20, marginVertical: 18 }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={[styles.tabBtn, status == '1' && styles.btnActive]}
              onPress={() => setStatusFilter('1')}>
              <Text
                style={[
                  styles.textTab,
                  status == '1' && styles.textActive,
                ]}>
                Proses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, status == '7' && styles.btnActive]}
              onPress={() => { setStatusFilter('7');}}>
              <Text
                style={[
                  styles.textTab,
                  status == '7' && styles.textActive,
                ]}>
                Selesai
              </Text>
            </TouchableOpacity>
          </View>
          {dataListFilter.length > 0 ?(
            <FlatList
              data={dataListFilter}
              renderItem={renderItem}
              ListFooterComponent={<View style={{ height: 250 }} />}
              showsVerticalScrollIndicator={false}
            />):(
            <View 
              style={{ width: SIZES.width, height: SIZES.height*0.6, alignItems:'center', justifyContent:'center' }}  
            >
              <Image
                    source={iconList}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
              />
              <Text 
                style={{
                  ...globalStyles.H3,
                  color:'grey',
                  margin:5
                }}
              > 
                Belum ada isinya nih...
              </Text>
              <Text 
                style={{
                  ...globalStyles.H5,
                  color:'grey',
                  margin:3
                }}
              > 
                Gunakan layaan kami dan transaksi anda akan muncul disini.
              </Text>
            </View>  
            )
          }
        </View>
      </View >
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
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold'
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
