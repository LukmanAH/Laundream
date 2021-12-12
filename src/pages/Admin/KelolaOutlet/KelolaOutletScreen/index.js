import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  iconJam,
  iconOutlet,
  iconScooter,
} from '../../../../assets/images';
import { HeaderBar } from '../../../../components';
import { globalStyles } from '../../../../utils/global';

const MenuOutlet = ({title, screenName, navigation, icon}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 28,
        // borderWidth:1,
        paddingHorizontal: 28,
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#f6f6f6',
        borderRadius: 20,
        marginTop: 20,
      }}
      onPress={() => navigation.navigate(screenName)}>
      <Text
        style={{
          ...globalStyles.titleText,
          width: '70%',
        }}>
        {title}
      </Text>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

const KelolaOutlet = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} screenName='HomePage' title='Kelola Outlet' />
      <ScrollView>
        <MenuOutlet icon={iconOutlet} title="Profile Outlet" navigation={navigation} screenName='EditProfileOutlet'/>
        <MenuOutlet icon={iconJam} title="Jam Operasional"  navigation={navigation} screenName='JamOperasional'/>
        <MenuOutlet icon={iconScooter} title="Tarif Ongkir" navigation={navigation} screenName='TarifOngkirScreen'/>
      </ScrollView>
    </View>
  );
};

export default KelolaOutlet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
