import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {outletLogo, smatLaundry, userHeader} from '../../../assets/images';
import SIZES from '../../../utils/constanta';

const data = [
  {
    status: 'online',
    nama: 'Dennis Laundry',
    alamat: 'Jl. Ryacudu No.05, Sukarame, Bandar Lampung',
    image: outletLogo,
  },
  {
    status: 'online',
    nama: 'Smarty Laundry',
    alamat: 'Jl. Airan Raya No.20, Way Huwi, Kec. Jati Agung ',
    image: smatLaundry,
  },
  {
    status: 'offline',
    nama: 'Oyo Laundry',
    alamat: 'Jl. Ryacudu No.05, Sukarame, Bandar Lampung',
    image: outletLogo,
  },
  {
    status: 'offline',
    nama: 'Low Laundry',
    alamat: 'Jl. Ryacudu No.05, Sukarame, Bandar Lampung',
    image: smatLaundry,
  },
];

const Home = ({navigation}) => {
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: 160,
          height: 250,
          borderRadius: 24,
          backgroundColor: '#FFFEF4',
          marginRight: 16,
          marginBottom: 16,
          ...styles.shadow,
        }}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: (item.status === 'online') ? '#42E379' : 'red',
            borderRadius: 10,
            alignSelf: 'flex-end',
            margin: 15,
          }}
        />
        <Image
          source={item.image}
          resizeMode="contain"
          style={{width: 100, height: 84, alignSelf: 'center'}}
        />
        <View
          style={{
            width: '100%',
            height: 75,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            padding: 16,
          }}>
          <Text style={{fontWeight: '700', fontSize: 12, color: 'black'}}>
            {item.nama}
          </Text>
          <Text style={{fontWeight: '400', fontSize: 9, color: '#6D6D6D'}}>
            {item.alamat}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const InfoCard = () => {
    return (
      <TouchableOpacity
        style={{
          width: SIZES.width * 0.84,
          height: 150,
          borderRadius: 24,
          backgroundColor: '#F4F6F6',
          ...styles.shadow,
          justifyContent: 'center',
          marginBottom:15
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: '700',
            color: 'black',
            fontStyle: 'italic',
          }}>
          Coming Soon
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={userHeader}
        style={{width: SIZES.width, height: 166}}>
        <View
          style={{
            paddingBottom: 25,
            paddingHorizontal: 40,
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Icon name="location" size={40} color="white" />
              </TouchableOpacity>
              <View>
                <Text style={{fontWeight: '700', fontSize: 18, color: 'white'}}>
                  Lokasi
                </Text>
                <Text style={{color: 'white'}}>Bandar Lampung</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="notifications" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={{paddingLeft: 28}}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            color: 'black',
            marginBottom: 12,
            marginTop: 10,
          }}>
          Outlet Sekitar Anda
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />

        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            color: 'black',
            marginBottom: 12,
            marginTop: 10,
          }}>
          Info dan Promo
        </Text>
          <InfoCard />
          <InfoCard />
          <InfoCard />
        <View style={{height: 100}} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 1,
  },
});
