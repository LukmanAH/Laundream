import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExploreScreen from './app/screens/explore';
import BeritaScreen from './app/screens/berita';
import BerandaScreen from './app/screens/beranda';
import KiloanScreen from './app/screens/kiloan';
import TransaksiScreen from './app/screens/transaksi';
import RiwayatScreen from './app/screens/riwayat';
import SearchScreen from './app/screens/search';
import BottomNavigation from './app/ui-components/bottom_navigation';
import { Directions } from 'react-native-gesture-handler';

const Tabs = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBar={({ navigation }) => (
          <BottomNavigation navigation={navigation} />
        )}
      >
        <Tabs.Screen
          name="beranda"
          component={BerandaScreen}
          options={() => {
            return { animationDirection: Directions.LEFT };
          }}
        />
        <Tabs.Screen name="search" component={SearchScreen} />
        <Tabs.Screen name="transaksi" component={TransaksiScreen} />
        <Tabs.Screen name="explore" component={ExploreScreen} />
        <Tabs.Screen name="berita" component={BeritaScreen} />
        <Tabs.Screen name="riwayat" component={RiwayatScreen} />
        <Tabs.Screen name="kiloan" component={KiloanScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
