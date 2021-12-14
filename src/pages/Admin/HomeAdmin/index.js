import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
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
import SIZES, {ColorPrimary, ROLE_EMPLOYEE} from '../../../utils/constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '../../../utils/global';

const HomePage = ({navigation}) => {
  const [user, setUser] = useState('');
  const [role, setRole] = useState(ROLE_EMPLOYEE);

  async function getUser() {
    if (!user) {
      const getUser = await AsyncStorage.getItem('user');
      const parseObject = JSON.parse(getUser);
      setUser(parseObject.name);
      setRole(parseObject.role);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle="default" hidden={false} />
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={outletLogo} />
          </TouchableOpacity>
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={globalStyles.bodyText}>Hai,</Text>
            <Text style={globalStyles.H3} numberOfLines={1}>
              Dennis Laundry
            </Text>
          </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={[styles.hero, styles.shadow]}>
            <View style={{flexDirection: 'column', width: '76%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={iconMoney} />
                <Text style={{...globalStyles.H3, marginLeft: 5}}>
                  Keuangan
                </Text>
              </View>
              <Text style={globalStyles.bodyText}>Pendapatan</Text>
              <Text
                style={{...globalStyles.titleText, fontSize: 30}}
                numberOfLines={1}>
                Rp2.000.000
              </Text>
            </View>
            <Image source={iconRT} />
          </View>

          <View style={{marginTop: 24}}>
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
                    statusName: 'Konfirmasi',
                  })
                }>
                <Image
                  source={iconKonfirmasi}
                  style={{width: 55, height: 55}}
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
                    statusName: 'Penjemputan',
                  })
                }>
                <Image
                  style={{width: 55, height: 55}}
                  resizeMode="contain"
                  source={markIcon}
                />
                <Text style={globalStyles.captionText} numberOfLines={1}>
                  Penjemputan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menuOption, styles.shadow]}
               onPress={() => navigation.navigate('StatusPesanan', {statusName: 'Antrian'})}>
                <Image
                  style={{width: 55, height: 55}}
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
              <TouchableOpacity style={[styles.menuOption, styles.shadow]}
               onPress={() => navigation.navigate('StatusPesanan', {statusName: 'Proses'})}>
                <Image
                  style={{width: 55, height: 55}}
                  resizeMode="contain"
                  source={iconMesinCuci}
                />
                <Text style={globalStyles.captionText} numberOfLines={1}>
                  Proses
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menuOption, styles.shadow]}
               onPress={() => navigation.navigate('StatusPesanan', {statusName: 'Siap Ambil'})}>
                <Image
                  style={{width: 55, height: 55}}
                  resizeMode="contain"
                  source={KeranjangIcon}
                />
                <Text style={globalStyles.captionText} numberOfLines={1}>
                  Siap Ambil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menuOption, styles.shadow]}
               onPress={() => navigation.navigate('StatusPesanan', {statusName: 'Siap Antar'})}>
                <Image
                  style={{width: 55, height: 55}}
                  resizeMode="contain"
                  source={iconMotor}
                />
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
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate('KelolaOutlet')}>
                <View style={styles.menuNavigation} />
                <Text style={styles.labelNavigation}>Kelola Outlet</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{alignItems: 'center'}}
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
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate('Pegawai')}>
                <View style={styles.menuNavigation} />
                <Text style={styles.labelNavigation}>Kelola Pegawai</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{alignItems: 'center'}}>
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
    backgroundColor: ColorPrimary,
    alignItems: 'center',
    width: SIZES.width,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
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
