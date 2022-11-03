import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Transaksi, Profil } from '../pages';
import { ColorPrimary } from '../utils/constanta';
import { iconHome, iconProfil, iconTransaksi } from '../assets/icons';

const Tab = createBottomTabNavigator();

const Tabs =  () => {
  return (
      <Tab.Navigator 
        screenOptions={{
            tabBarStyle:{
                position:'absolute',
                // bottom:25,
                // left:20,
                // right:20,
                elevation:0,
                backgroundColor:'white',
                // borderRadius:15,
                height:90,
                borderTopRightRadius:40,
                borderTopLeftRadius:40,
                ...styles.shadow,
                paddingHorizontal:40
            },
            tabBarShowLabel:false
        }}
      >
        <Tab.Screen name="Home" component={Home} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <Image source={iconHome} resizeMode='contain'
                    style={{
                        width:25,
                        height:25,
                        tintColor: focused ? ColorPrimary : '#C4C4C4'
                    }} />
                </View>
            )
          }}/>
        <Tab.Screen name="Transaksi" component={Transaksi} 
          options={{ headerShown: false, tabBarIcon: ({focused}) => (
            <View>
                <Image source={iconTransaksi} resizeMode='contain'
                style={{
                    width:25,
                    height:25,
                    tintColor: focused ? ColorPrimary : '#C4C4C4'
                }} />
            </View>
        ) }}/>
        <Tab.Screen name="Profil" component={Profil} 
          options={{ headerShown: false, tabBarIcon: ({focused}) => (
            <View>
                <Image source={iconProfil} resizeMode='contain'
                style={{
                    width:25,
                    height:25,
                    tintColor: focused ? ColorPrimary : '#C4C4C4'
                }} />
            </View>
        ) }} />
      </Tab.Navigator>
  );
}

export default Tabs;

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#000',
        shadowOffset: {
            width:0,
            height:-20
        },
        shadowOpacity:0.25,
        shadowRadius:2.5,
        elevation:5
    }
})