import React from 'react';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ColorPrimary } from '../../utils/constanta';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../utils/global';

const CustomDrawer = props => {
    const navigation = useNavigation();
  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.drawerSection}>
              <DrawerItem
                activeTintColor={ColorPrimary}
                icon={() => (
                  <Icon name="home" color={ColorPrimary} size={24} />
                )}
                label="Home"
                labelStyle={{...globalStyles.bodyText2, marginLeft:-15, color:ColorPrimary}}
                onPress={() => {
                  props.navigation.navigate('HomePage');
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon name="user-edit" color={ColorPrimary} size={24} />
                )}
                label="Edit Profile"
                labelStyle={{...globalStyles.bodyText2, marginLeft:-15, color:ColorPrimary}}
                onPress={() => {
                  props.navigation.navigate('Edit');
                }}
              />
            </View>
            {/* <DrawerItemList {...props} /> */}
          </View>
        </DrawerContentScrollView>
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={() => (
              <Icon name="sign-out-alt" color='red' size={24} />
            )}
            label="Sign Out"
            labelStyle={{...globalStyles.bodyText2, marginLeft:-15, color:'red'}}
            onPress={() => {
              navigation.navigate('LoginScreen')
            }}
          />
        </View>
        <Text style={styles.copyright}>
          Laundream v.1.0
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
      bottomDrawerSection: {
        // marginBottom: 15,
        borderTopColor: '#c3c3c3',
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
          ...globalStyles.bodyText2,
        textAlign: 'center',
        fontSize: 15,
        marginVertical: 15,
        color: ColorPrimary,
      },
});
