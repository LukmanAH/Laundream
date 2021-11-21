import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
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
  EditLayanan
} from '../pages';

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
        options={{gesturesEnabled: false}}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen
        name="KelolaOutlet"
        component={KelolaOutlet}
      />
      <Stack.Screen
        name="EditProfileOutlet"
        component={EditProfileOutlet}
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
        name="LayananRegular"
        component={LayananRegular}
      />
      <Stack.Screen
        name="EditLayanan"
        component={EditLayanan}
      />
    </Stack.Navigator>
  );
};

export default Route;
