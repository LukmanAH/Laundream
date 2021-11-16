import React from 'react';
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
import SIZES, {ColorPrimary} from '../../../utils/constanta';

const HomePage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle="default" hidden={false} />
      <ScrollView>
        <View style={styles.header}>
          <Image source={outletLogo} />
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={{fontSize: 16}}>Hai,</Text>
            <Text style={{fontWeight: '700', fontSize: 20}}>
              Dennis Laundry
            </Text>
          </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.hero}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={iconMoney} />
                <Text style={{fontSize: 24, fontWeight: '600', marginLeft: 5}}>
                  Keuangan
                </Text>
              </View>
              <Text style={{fontWeight: '500', fontSize: 16}}>Pendapatan</Text>
              <Text style={{fontWeight: '700', fontSize: 36}}>Rp2.000.000</Text>
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
              <TouchableOpacity style={styles.menuOption}>
                <Image source={iconKonfirmasi} />
                <Text style={styles.labelMenu}>Konfirmasi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption}>
                <Image source={markIcon} />
                <Text style={styles.labelMenu}>Penjemputan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption}>
                <Image source={KeranjangIcon1} />
                <Text style={styles.labelMenu}>Antrian</Text>
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
              <TouchableOpacity style={styles.menuOption}>
                <Image source={iconMesinCuci} />
                <Text style={styles.labelMenu}>Proses</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption}>
                <Image source={KeranjangIcon} />
                <Text style={styles.labelMenu}>Siap Ambil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption}>
                <Image source={iconMotor} />
                <Text style={styles.labelMenu}>Siap Antar</Text>
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
              <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate("KelolaOutlet")}>
                <View style={styles.menuNavigation} />
                <Text style={styles.labelNavigation}>Kelola Outlet</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{alignItems: 'center'}}>
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
              <TouchableOpacity style={{alignItems: 'center'}}>
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
    borderBottomEndRadius:10,
    borderBottomStartRadius:10
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
    borderWidth: 0.8,
    padding: 17,
    borderRadius: 20,
    width: SIZES.width * 0.28,
  },
  labelMenu: {
    marginTop: 5,
    fontWeight: '700',
    fontSize: 12,
  },
  wrapNavigation:{
    backgroundColor:ColorPrimary,
    paddingTop:20,
    borderTopEndRadius:20,
    borderTopStartRadius:20,
  },
  menuNavigation: {
    backgroundColor: '#f6f6f6',
    width: SIZES.width * 0.44,
    height: 90,
    borderRadius:20
  },
  labelNavigation:{
      fontSize:16,
      fontWeight:'700',
      color:'white'
  }
});
