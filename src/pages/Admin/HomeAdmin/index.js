import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  Switch
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  bgHeader,
  iconKonfirmasi,
  iconMesinCuci,
  iconMoney,
  iconMotor2,
  iconOutlet,
  iconKatalog,
  iconKaryawan,
  iconRiwayat,
  iconRT,
  KeranjangIcon,
  KeranjangIcon1,
  markIcon,
  outletLogo,
  iconHamburger
} from '../../../assets/images';
import SIZES, { ColorPrimary, ROLE_EMPLOYEE, API } from '../../../utils/constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../utils/global';
import { Badge } from 'react-native-paper';
import { Loading } from '../../../components';
import { STATUS_CONFIRMATION, STATUS_PICKUP, STATUS_QUEUE, STATUS_PROCESS, STATUS_READY, STATUS_DELIVER } from '../../../utils/constanta';

const HomePage = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [laundry, setLaundry] = useState('');
  const [confirmation, setConfirmation] = useState([]);
  const [pickUp, setPickUp] = useState([]);
  const [queue, setQueue] = useState([]);
  const [process, setProcess] = useState([]);
  const [ready, setReady] = useState([]);
  const [deliver, setDeliver] = useState([]);
  const [revenue, setRevenue] = useState('0');
  const [all, setAll] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [isOpen, setIsOpen] = useState(0);
  const [badges, setBadges] = useState({
    confirmation: 0, pickup: 0, queue: 0, process: 0, ready: 0, deliver: 0
  })

  async function getUser() {
    //if (!user && !laundry) {
      const getUser = await AsyncStorage.getItem('user');
      const userParse = JSON.parse(getUser);
      setUser(userParse.name);
      setRole(userParse.role);

      const laundry = await AsyncStorage.getItem('laundry');
      const laundryParse = JSON.parse(laundry);

      setLaundry(laundryParse);
    
    // }
  }

  const fetchHomeApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);
    
    const token = await AsyncStorage.getItem('token');

    await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/home`, {
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
        setRevenue(String(responseJson.revenue))
        setAll(responseJson.all)
        setBadges({
          confirmation: (responseJson.confirmation).length, 
          pickup: (responseJson.pickup).length, 
          queue: (responseJson.queue).length, 
          process: (responseJson.process).length, 
          ready: (responseJson.ready).length, 
          deliver: (responseJson.deliver).length
        })
        setIsOpen(responseJson.condition)
      });
  }


  useEffect(() => {  
    setLoading(true) 
    getUser()
    fetchHomeApi()
    setLoading(false) 

    const interval=setInterval(()=>{ 
      getUser()
      fetchHomeApi()
      console.log('refresh')
     },10000)
       
     return()=>clearInterval(interval)
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchHomeApi();
    }, 100);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  return (
    loading ? <Loading />
      : <SafeAreaView style={styles.container}>
        <StatusBar animated={true} barStyle="default" hidden={false} />
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
          style={{ height: SIZES.height}} />
        }>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image 
                source={iconHamburger} 
                style={{ width: 45, height: 45 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={{ width:'40%',flexDirection: 'column', marginLeft: 20 }}>
              <Text style={globalStyles.bodyText}>Hai,</Text>
              <Text style={globalStyles.H3} numberOfLines={1}>
                {laundry.name}
              </Text>
            </View>
        
            <View style={{width:'40%', alignItems:'flex-end' }}>
              <View style={{borderRadius:10, width:20, height:20,marginRight:7, backgroundColor: isOpen == 1? ColorPrimary : 'grey'}}/>
              {isOpen == 1?<Text style={[globalStyles.bodyText,{color:ColorPrimary}]}>Buka</Text> : <Text style={globalStyles.bodyText}>Tutup</Text>}
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
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

{/* ================== menuOption =============== */}
            <View style={{ marginTop: 24, height: SIZES.height*0.27, }}>
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
                    visible={badges.confirmation != 0}
                    >
                    {badges.confirmation}
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
                    visible={badges.pickup != 0}>
                    {badges.pickup}
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
                    visible={badges.queue != 0}>
                    {badges.queue}
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
                    visible={badges.process != 0}>
                    {badges.process}
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
                    visible={badges.ready != 0}>
                    {badges.ready}
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
                    source={iconMotor2}
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
                    visible={badges.deliver != 0}>
                    {badges.deliver}
                  </Badge>
                  <Text style={globalStyles.captionText} numberOfLines={1}>
                    Siap Antar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

{/* =============== NavigatorMenu ==================== */}

          {role == ROLE_EMPLOYEE? null:(
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
                  style={[styles.menuNavigation, styles.shadow]}
                  onPress={() => navigation.navigate('KelolaOutlet')}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                    source={iconOutlet}
                  />
                  <View style={{margin:10 }}>
                      <Text style={styles.labelNavigation}>Kelola</Text>
                      <Text style={styles.labelNavigation}>Outlet</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuNavigation, styles.shadow]}
                  onPress={() => navigation.navigate('KelolaLayanan')}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      resizeMode="contain"
                      source={iconKatalog}
                    />
                    <View style={{margin:10 }}>
                      <Text style={styles.labelNavigation}>Kelola</Text>
                      <Text style={styles.labelNavigation}>Layanan</Text>
                    </View>
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
                  style={[styles.menuNavigation, styles.shadow]}
                  onPress={() => navigation.navigate('Pegawai')}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      resizeMode="contain"
                      source={iconKaryawan}
                    />
                    <View style={{margin:10 }}>
                      <Text style={styles.labelNavigation}>Kelola</Text>
                      <Text style={styles.labelNavigation}>Pegawai</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuNavigation, styles.shadow]}
                  onPress={() => navigation.navigate('ExportTransaksi')}>
                    <Image
                          style={{ width: 50, height: 50 }}
                          resizeMode="contain"
                          source={iconRiwayat}
                      />
                      <View style={{margin:10 }}>
                      <Text style={styles.labelNavigation}>Export</Text>
                      <Text style={styles.labelNavigation}>Laporan</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    padding: 20,
    height: SIZES.height*0.13,
    alignItems: 'center',
    width: SIZES.width,
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F6F6',
    marginTop: 10,
    borderRadius: 24,
    width: SIZES.width * 0.9,
    height: SIZES.height*0.14+10,
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
    paddingTop: 25,
    paddingBottom: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: 5,
    height: SIZES.height*0.40,
  },
  menuNavigation: {
    backgroundColor: 'white',
    width: SIZES.width * 0.44,
    height: SIZES.width* 0.30,
    borderRadius: 20,
    alignItems:'center',
    justifyContent: 'center',
    borderColor: '#c6c6c6',
    flexDirection: 'row',
  },
  labelNavigation: {
    ...globalStyles.bodyText2,
    color: ColorPrimary,
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
