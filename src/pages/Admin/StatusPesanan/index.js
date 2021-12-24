import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
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
import { HeaderBar } from '../../../components';
import SIZES, { ColorPrimary } from '../../../utils/constanta';
import { globalStyles } from '../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const listTab = [
  {
    name: 'Konfirmasi',
    status: '1',
    icon: iconKonfirmasi,
  },
  {
    name: 'Penjemputan',
    status: '2',
    icon: markIcon,
  },
  {
    name: 'Antrian',
    status: '3',
    icon: KeranjangIcon1,
  },
  {
    name: 'Proses',
    status: '4',
    icon: iconMesinCuci,
  },
  {
    name: 'Siap Ambil',
    status: '5',
    icon: KeranjangIcon,
  },
  {
    name: 'Siap Antar',
    status: '6',
    icon: iconMotor,
  },
];

// const data = [
//   {
//     status: 'Konfirmasi',
//     icon: iconTimbangan,
//     invoice: 'TRX/20212101/002',
//     pelanggan: 'Lukman',
//     tglPesan: '15 Oktober 2021',
//     estimasi: '15 Oktober 2021',
//   },
//   {
//     status: 'Konfirmasi',
//     icon: iconTimbangan,
//     invoice: 'TRX/20212101/002',
//     pelanggan: 'Apip',
//     tglPesan: '15 Oktober 2021',
//     estimasi: '15 Oktober 2021',
//   },
//   {
//     status: 'Penjemputan',
//     icon: iconTimbangan,
//     invoice: 'TRX/20212101/002',
//     pelanggan: 'Lukmen',
//     tglPesan: '15 Oktober 2021',
//     estimasi: '15 Oktober 2021',
//   },
//   {
//     status: 'Antrian',
//     icon: iconTimbangan,
//     invoice: 'TRX/20212101/002',
//     pelanggan: 'Lukmin',
//     tglPesan: '15 Oktober 2021',
//     estimasi: '15 Oktober 2021',
//   },
//   {
//     status: 'Proses',
//     icon: iconTimbangan,
//     invoice: 'TRX/20212101/002',
//     pelanggan: 'Lukmun',
//     tglPesan: '15 Oktober 2021',
//     estimasi: '15 Oktober 2021',
//   },
//   {
//     status: 'Siap Ambil',
//     icon: iconTimbangan,
//     invoice: 'TRX/20212101/002',
//     pelanggan: 'Lukmon',
//     tglPesan: '15 Oktober 2021',
//     estimasi: '15 Oktober 2021',
//   },
//   {
//     status: 'Siap Antar',
//     icon: iconTimbangan,
//     invoice: 'TRX/20212101/002',
//     pelanggan: 'Lukmain',
//     tglPesan: '15 Oktober 2021',
//     estimasi: '15 Oktober 2021',
//   },
// ];

const StatusPesanan = ({ navigation, route }) => {
  const { statusName, data } = route.params;
  const [status, setStatus] = useState(statusName);
  const [dataList, setDataList] = useState(
    data.filter(e => e.status == '1'),
  );
  const setStatusFilter = status => {
    setDataList([...data.filter(e => e.status == status)]);
    setStatus(status);
  };

  const movePage = (data) => {
    if (status == '1') {
      navigation.navigate('Konfirmasi', { data: data });
    } else if (status == '2') {
      navigation.navigate('Penjemputan', { data: data });
    } else if (status == '3') {
      navigation.navigate('Antrian', { data: data });
    } else if (status == '4') {
      navigation.navigate('Proses', { data: data });
    } else if (status == '5') {
      navigation.navigate('Pengambilan', { data: data });
    } else if (status == '6') {
      navigation.navigate('Pengantaran', { data: data });
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          key={index}
          style={styles.wrapItem}
          onPress={() => movePage(item)}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name={item.catalog.icon}
              style={{
                fontSize: 60,
                color: 'black',
              }}
            />
            <View style={{ marginLeft: 8 }}>
              <Text style={globalStyles.bodyText} numberOfLines={1}>{item.serial}</Text>
              <Text style={{ ...globalStyles.bodyText2, fontSize: 18 }} numberOfLines={1}>
                {item.user.name}
              </Text>
              <Text style={globalStyles.captionText} numberOfLines={1}>Tanggal Pesan : {item.created_at}</Text>
              <Text style={globalStyles.captionText} numberOfLines={1}>Biaya : {item.amount}</Text>
            </View>
          </View>
          <Icon
            name="chevron-forward-outline"
            size={24}
            color={ColorPrimary}
            style={{ alignSelf: 'flex-start' }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="HomePage"
        title="Status Pesanan"
      />
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          horizontal={true}
          data={listTab}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tabBtn,
                status === item.status && styles.btnActive,
              ]}
              onPress={() => { setStatusFilter(item.status); }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={item.icon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.textTab,
                    status === item.status && styles.textActive,
                  ]}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <FlatList
          data={dataList}
          renderItem={renderItem}
          ListFooterComponent={<View style={{ height: 210 }} />}
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
    ...globalStyles.bodyText2,
    fontSize: 14
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
