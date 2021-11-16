import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  bgHeader,
  iconJam,
  iconMotor,
  iconOutlet,
  iconScooter,
  outletLogo,
} from '../../../assets/images';
import SIZES, {ColorPrimary} from '../../../utils/constanta';

const Header = ({navigation}) => {
  return (
    <ImageBackground
      source={bgHeader}
      style={{width: SIZES.width, height: 120}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingBottom: 25,
          paddingLeft: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate("HomePage")}>
            <Icon name="arrow-back-outline" size={24} color={ColorPrimary} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
              color: '#fff',
            }}>
            Kelola Outlet
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const MenuOutlet = props => {
  return (
    <View
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
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 36,
          width: '70%',
          color: '#000',
        }}>
        {props.title}
      </Text>
      <Image source={props.icon} />
    </View>
  );
};

const KelolaOutlet = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <MenuOutlet icon={iconOutlet} title="Profile Outlet" />
        <MenuOutlet icon={iconJam} title="Jam Operasional" />
        <MenuOutlet icon={iconScooter} title="Tarif Ongkir" />
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
