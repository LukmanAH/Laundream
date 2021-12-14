import React from 'react';
import {
  Alert,
  ToastAndroid,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ColorPrimary} from '../utils/constanta';
import {EditAdmin, HomePage} from '../pages';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Drawer.Screen
        name="Edit"
        component={EditAdmin}
        options={{
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    // marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  row: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 15,
    color: ColorPrimary,
  },
});
