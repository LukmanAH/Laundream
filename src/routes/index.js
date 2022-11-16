import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ExportTransaksi,
  SplashScreen,
  LoginScreen,
  HomePage,
  RegisterScreen,
  KelolaOutlet,
  EditProfileOutlet,
  JamOperasional,
  TarifOngkirScreen,
  KelolaLayanan,
  LayananRegular,
  TambahLayanan,
  TambahTarifOngkirScreen,
  EditLayanan,
  ParfumScreen,
  Profil,
  EditParfum,
  TambahParfum,
  PegawaiScreen,
  EditPegawaiScreen,
  TambahPegawaiScreen,
  DetailPegawaiScreen,
  StatusPesanan,
  Konfirmasi,
  Pengantaran,
  Pengambilan,
  Penjemputan,
  Antrian,
  Proses,
  StatusSelesai,
  DetailPesanan,
  DetailInfo,
  KonfirmasiPesanan,
  DetailTransaksi,
  EditProfile,
  EditOngkirScreen,
  Pesan,
  Latihan
} from '../pages';
import Tabs from '../bottomTabs';
import DrawerMenu from './drawer';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ gesturesEnabled: false }}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={DrawerMenu} />
      <Stack.Screen
        name="KelolaOutlet"
        component={KelolaOutlet}
      />
      <Stack.Screen
        name="EditProfileOutlet"
        component={EditProfileOutlet}
      />
      <Stack.Screen
        name="ExportTransaksi"
        component={ExportTransaksi}
      />
      <Stack.Screen
        name="JamOperasional"
        component={JamOperasional}
      />
      <Stack.Screen
        name="TarifOngkirScreen"
        component={TarifOngkirScreen}
      />
      <Stack.Screen
        name="KelolaLayanan"
        component={KelolaLayanan}
      />
      <Stack.Screen
        name="TambahLayanan"
        component={TambahLayanan}
      />
      <Stack.Screen
        name="TarifOngkir"
        component={TarifOngkirScreen}
      />
      <Stack.Screen
        name="TambahTarifOngkir"
        component={TambahTarifOngkirScreen}
      />
      <Stack.Screen
        name="EditOngkir"
        component={EditOngkirScreen}
      />
      <Stack.Screen
        name="LayananRegular"
        component={LayananRegular}
      />
      <Stack.Screen
        name="EditLayanan"
        component={EditLayanan}
      />
      <Stack.Screen
        name="Parfum"
        component={ParfumScreen}
      />
      <Stack.Screen
        name="EditParfum"
        component={EditParfum}
      />
      <Stack.Screen
        name="TambahParfum"
        component={TambahParfum}
      />
      <Stack.Screen
        name="EditPegawai"
        component={EditPegawaiScreen}
      />
      <Stack.Screen
        name="TambahPegawai"
        component={TambahPegawaiScreen}
      />
      <Stack.Screen
        name="Pegawai"
        component={PegawaiScreen}
      />
      <Stack.Screen
        name="DetailPegawai"
        component={DetailPegawaiScreen}
      />
      <Stack.Screen
        name="DetailInfo"
        component={DetailInfo}
      />
      <Stack.Screen
        name="StatusPesanan"
        component={StatusPesanan}
      />
      
      <Stack.Screen
        name="Konfirmasi"
        component={Konfirmasi}
      />
      <Stack.Screen
        name="Pengantaran"
        component={Pengantaran}
      />
      <Stack.Screen
        name="Pengambilan"
        component={Pengambilan}
      />
      <Stack.Screen
        name="Penjemputan"
        component={Penjemputan}
      />
      <Stack.Screen
        name="Antrian"
        component={Antrian}
      />
      <Stack.Screen
        name="Proses"
        component={Proses}
      />
      <Stack.Screen
        name="StatusSelesai"
        component={StatusSelesai}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
      />
      <Stack.Screen
        name="DetailPesanan"
        component={DetailPesanan}
      />
      <Stack.Screen
        name="KonfirmasiPesanan"
        component={KonfirmasiPesanan}
      />
      <Stack.Screen
        name="Pesan"
        component={Pesan}
      />
      <Stack.Screen
        name="DetailTransaksi"
        component={DetailTransaksi}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        name="Profil"
        component={Profil}
      />
      
    </Stack.Navigator>
  );
};

export default Route;
