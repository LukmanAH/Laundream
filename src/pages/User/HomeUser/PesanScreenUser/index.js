import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { iconTimbangan, outletLogo } from '../../../../assets/images';
import { HeaderBar } from '../../../../components';
import SIZES, {S3, ColorDanger, ColorPrimary } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailPesanan = ({ navigation, route }) => {
  const { data, address, coordinate } = route.params
  const [isPress, setIsPress] = useState(false);
  const [catalog, setCatalog] = useState({ id: null });
  

  function renderItem({ item, index }) {
    const touchProps = {
      style: catalog.id == item.id ? styles.btnPress : styles.btnNormal,
      onPress: () => {
        setIsPress(!isPress);
      },
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
          
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons
            name={item.icon}
            style={{
              fontSize: 65,
              color: 'black',
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ ...globalStyles.bodyText, fontSize: 14 }}>{item.name.substring(0, 25)}...</Text>
            <Text style={{ ...globalStyles.bodyText, fontSize: 14 }}>{item.estimation_complete} {item.estimation_type}</Text>
            <Text style={{ ...globalStyles.bodyText, fontSize: 14 }}>Rp.{item.price} / {item.unit}</Text>
          </View>
        </View>
        <TouchableOpacity {...touchProps}
          onPress={() => { 
            if(catalog.id != item.id){
              setCatalog(item); 
            }else{
              setCatalog({ id: null })
            }
            }}>
          <Text
            style={{
              ...globalStyles.bodyText2,
              color: 'white',
              textAlign: 'center',
              fontSize: 12
            }}>
            {catalog.id != item.id ? 'Pilih' : 'Hapus'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  
  return (
    <View style={{backgroundColor: 'white', height:SIZES.height }}>
      <HeaderBar
        navigation={navigation}
        screenName="Tabs"
        title="Daftar Layanan Laundry"
      />
      <View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Image
              source={{ uri: `${S3}/`+ data.banner }}
              style={{ width: 70, height: 70 }}
              resizeMode="contain"
            />
            <View style={{ marginLeft:5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: (data.condition === 1) ? '#42E379' : 'grey',
                    marginRight: 4,
                  }}
                />
                {
                  data.condition === 1? (
                    <Text style={globalStyles.captionText}>Buka</Text> 
                  ):(
                    <Text style={globalStyles.captionText}>Tutup</Text> 
                  )
                }
              </View>
              <Text style={globalStyles.H3}>{data.name}</Text>
              {data.distance >= 1 ? (
                  <Text style={globalStyles.captionText}>{data.distance} KM</Text>
                ):(
                  <Text style={globalStyles.captionText}>{data.distance * 1000} M</Text>
                )
              }
              <Text style={globalStyles.captionText} numberOfLines={2}>{data.address}</Text>
            </View>
          </View>

          <Text style={globalStyles.H3}>Layanan Kami</Text>
          <View style={{ height:SIZES.height-400 }}>
              <FlatList
                data={data.catalogs}
                renderItem={renderItem}
                scrollEnabled={true}
              />
          </View>
          
        </View>
        <View style={{ height: 40 }} />
      </View>
      <View
        style={{
          // flex: 1,
          // justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {catalog.id != null ?(
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('KonfirmasiPesanan', { data: data, catalog: catalog, address: address, coordinate: coordinate })}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ ...globalStyles.H3, color: 'white' }}>1 Layanan</Text>
            <Text
              style={{
                ...globalStyles.captionText,
                color: 'white',
              }}>
              Lihat Detail
            </Text>
          </View>
        </TouchableOpacity>
        ):(
          <View
            style={styles.button2}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ ...globalStyles.H3, color: 'white', alignContent:'center' }}>0 Layanan</Text>
            </View>
          </View>
          )}
      </View>
    </View>
  );
};

export default DetailPesanan;

const styles = StyleSheet.create({
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
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  btnNormal: {
    backgroundColor: ColorPrimary,
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: 'center',
  },
  btnPress: {
    backgroundColor: '#ED1010',
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    // alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button2: {
    backgroundColor: '#ced6e0',
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    // alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});
