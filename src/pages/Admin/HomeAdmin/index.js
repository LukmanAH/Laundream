import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  bgHeader,
  iconKonfirmasi,
  iconMesinCuci,
  iconMoney,
  iconMotor,
  iconRT,
  KeranjangIcon,
  KeranjangIcon1,
  markIcon,
  outletLogo,
} from '../../../assets/images';
import SIZES, { ColorPrimary, ROLE_EMPLOYEE } from '../../../utils/constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../utils/global';
import { Badge } from 'react-native-paper';
import { Loading } from '../../../components';
import { STATUS_CONFIRMATION, STATUS_PICKUP, STATUS_QUEUE, STATUS_PROCESS, STATUS_READY, STATUS_DELIVER } from '../../../utils/constanta';

const badge = {
  konfirmasi: 1,
  penjemputan: 0,
  antrian: 0,
  proses: 4,
  siapAmbil: 3,
  siapAntar: 1,
};

const HomePage = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [role, setRole] = useState(ROLE_EMPLOYEE);
  const [loading, setLoading] = useState(false);
  const [laundry, setLaundry] = useState('')
  const [confirmation, setConfirmation] = useState([])
  const [pickUp, setPickUp] = useState([])
  const [queue, setQueue] = useState([])
  const [process, setProcess] = useState([])
  const [ready, setReady] = useState([])
  const [deliver, setDeliver] = useState([])
  const [revenue, setRevenue] = useState('0')
  const [all, setAll] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  async function getUser() {
    if (!user && !laundry) {
      const getUser = await AsyncStorage.getItem('user');
      const userParse = JSON.parse(getUser);
      setUser(userParse.name);
      setRole(userParse.role);

      const getLaundry = await AsyncStorage.getItem('laundry');
      const laundryParse = JSON.parse(getLaundry)
      setLaundry(laundryParse.name)
    }
  }

  const fetchHomeApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/home`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setConfirmation(responseJson.confirmation)
        setPickUp(responseJson.pickup)
        setQueue(responseJson.queue)
        setProcess(responseJson.process)
        setReady(responseJson.ready)
        setDeliver(responseJson.deliver)
        setRevenue(responseJson.revenue.toString())
        setAll(responseJson.all)
      });
  }

  useEffect(() => {
    getUser();
    fetchHomeApi()
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchHomeApi();
    }, 1000);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    loading ? <Loading />
      : <SafeAreaView style={styles.container}>
        <StatusBar animated={true} barStyle="default" hidden={false} />
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={outletLogo} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={globalStyles.bodyText}>Hai,</Text>
              <Text style={globalStyles.H3} numberOfLines={1}>
                {laundry}
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[styles.hero, styles.shadow]}>
              <View style={{ flexDirection: 'column', width: '76%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={iconMoney} />
                  <Text style={{ ...globalStyles.H3, marginLeft: 5 }}>
                    Keuangan
                  </Text>
                </View>
                <Text style={globalStyles.bodyText}>Pendapatan</Text>
                <Text
                  style={{ ...globalStyles.titleText, fontSize: 30 }}
                  numberOfLines={1}>
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(revenue)}
                </Text>
              </View>
              <Image source={iconRT} />
            </View>

            <View style={{ marginTop: 24 }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-between',
                  width: SIZES.width,
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  style={[styles.menuOption, styles.shadow]}
                  onPress={() =>
                    navigation.navigate('StatusPesanan', {
                      statusName: '1',
                      data: all
                    })
                  }>
                  <Badge
                    style={{
                      position: 'absolute',
                      backgroundColor: 'red',
                      ...globalStyles.bodyText2,
                      fontSize: 14,
                      color: 'white',
                    }}
                    size={24}
                    visible={confirmation.length > 0}>
                    {confirmation.length}
                  </Badge>
                  <Image
                    source={iconKonfirmasi}
                    style={{ width: 55, height: 55 }}
                    resizeMode="contain"
                  />
                  <Text style={globalStyles.captionText} numberOfLines={1}>
                    Konfirmasi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuOption, styles.shadow]}
                  onPress={() =>
                    navigation.navigate('StatusPesanan', {
                      statusName: '2',
                      data: all
                    })
                  }>
                  <Badge
                    style={{
                      position: 'absolute',
                      backgroundColor: 'red',
                      ...globalStyles.bodyText2,
                      fontSize: 14,
                      color: 'white',
                    }}
                    size={24}
                    visible={pickUp.length > 0}>
                    {pickUp.length}
                  </Badge>
                  <Image
                    style={{ width: 55, height: 55 }}
                    resizeMode="contain"
                    source={markIcon}
                  />
                  <Text style={globalStyles.captionText} numberOfLines={1}>
                    Penjemputan
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuOption, styles.shadow]}
                  onPress={() =>
                    navigation.navigate('StatusPesanan', {
                      statusName: '3',
                      data: all
                    })
                  }>
                  <Badge
                    style={{
                      position: 'absolute',
                      backgroundColor: 'red',
                      ...globalStyles.bodyText2,
                      fontSize: 14,
                      color: 'white',
                    }}
                    size={24}
                    visible={queue.length > 0}>
                    {queue.length}
                  </Badge>
                  <Image
                    style={{ width: 55, height: 55 }}
                    resizeMode="contain"
                    source={KeranjangIcon1}
                  />
                  <Text style={globalStyles.captionText} numberOfLines={1}>
                    Antrian
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-between',
                  width: SIZES.width,
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  style={[styles.menuOption, styles.shadow]}
                  onPress={() =>
                    navigation.navigate('StatusPesanan', {
                      statusName: '4',
                      data: all
                    })
                  }>
                  <Badge
                    style={{
                      position: 'absolute',
                      backgroundColor: 'red',
                      ...globalStyles.bodyText2,
                      fontSize: 14,
                      color: 'white',
                    }}
                    size={24}
                    visible={process.length > 0}>
                    {process.length}
                  </Badge>
                  <Image
                    style={{ width: 55, height: 55 }}
                    resizeMode="contain"
                    source={iconMesinCuci}
                  />
                  <Text style={globalStyles.captionText} numberOfLines={1}>
                    Proses
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuOption, styles.shadow]}
                  onPress={() =>
                    navigation.navigate('StatusPesanan', {
                      statusName: '5',
                      data: all
                    })
                  }>
                  <Badge
                    style={{
                      position: 'absolute',
                      backgroundColor: 'red',
                      ...globalStyles.bodyText2,
                      fontSize: 14,
                      color: 'white',
                    }}
                    size={24}
                    visible={ready.length > 0}>
                    {ready.length}
                  </Badge>
                  <Image
                    style={{ width: 55, height: 55 }}
                    resizeMode="contain"
                    source={KeranjangIcon}
                  />
                  <Text style={globalStyles.captionText} numberOfLines={1}>
                    Siap Ambil
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuOption, styles.shadow]}
                  onPress={() =>
                    navigation.navigate('StatusPesanan', {
                      statusName: '6',
                      data: all
                    })
                  }>
                  <Image
                    style={{ width: 55, height: 55 }}
                    resizeMode="contain"
                    source={iconMotor}
                  />
                  <Badge
                    style={{
                      position: 'absolute',
                      backgroundColor: 'red',
                      ...globalStyles.bodyText2,
                      fontSize: 14,
                      color: 'white',
                    }}
                    size={24}
                    visible={deliver.length > 0}>
                    {deliver.length}
                  </Badge>
                  <Text style={globalStyles.captionText} numberOfLines={1}>
                    Siap Antar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapNavigation}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-between',
                  width: SIZES.width,
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => navigation.navigate('KelolaOutlet')}>
                  <View style={styles.menuNavigation} />
                  <Text style={styles.labelNavigation}>Kelola Outlet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => navigation.navigate('KelolaLayanan')}>
                  <View style={styles.menuNavigation} />
                  <Text style={styles.labelNavigation}>Kelola Layanan</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-between',
                  width: SIZES.width,
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => navigation.navigate('Pegawai')}>
                  <View style={styles.menuNavigation} />
                  <Text style={styles.labelNavigation}>Kelola Pegawai</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center' }}>
                  <View style={styles.menuNavigation} />
                  <Text style={styles.labelNavigation}>Laporan Transaksi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 30,
    paddingLeft: 40,
    height: 120,
    alignItems: 'center',
    width: SIZES.width,
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F6F6',
    marginTop: 20,
    borderRadius: 24,
    width: SIZES.width * 0.9,
  },
  menuOption: {
    alignItems: 'center',
    padding: 17,
    borderRadius: 20,
    width: SIZES.width * 0.29,
    borderColor: '#c6c6c6',
    // width: 160,
    backgroundColor: '#FFFfFf',
  },
  labelMenu: {
    marginTop: 5,
    fontWeight: '700',
    fontSize: 12,
  },
  wrapNavigation: {
    backgroundColor: ColorPrimary,
    paddingTop: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: 5,
  },
  menuNavigation: {
    backgroundColor: '#f6f6f6',
    width: SIZES.width * 0.44,
    height: 90,
    borderRadius: 20,
  },
  labelNavigation: {
    ...globalStyles.bodyText2,
    color: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
