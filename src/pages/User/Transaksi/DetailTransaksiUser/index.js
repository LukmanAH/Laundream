import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  TextInput,
} from 'react-native';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeranjangIcon, outletLogo } from '../../../../assets/images';
import { HeaderBar } from '../../../../components';
import SIZES, { S3,ColorPrimary, ColorDanger } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import {StatusProsesBar} from '../../../../components/';

const DetailTransaksi = ({ navigation, route }) => {
  const { data } = route.params;
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingTop: 22,
        height: 330,
        // marginTop:-10
      }}>
      <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '600', color: 'black' }}>Total Tagihan</Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 36,
          fontWeight: '700',
          color: 'black',
        }}>
        {data.amount + data.delivery_fee}
      </Text>
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
          Detail Tagihan
        </Text>
        <View style={{ marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> Harga :</Text>
          {data.amount == null?(
              <Text style={{ fontSize: 14, fontWeight: '500', color: ColorPrimary }}> Menunggu dihitung pihak laundry</Text>
            ):(
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> {data.amount}</Text>
            )
          }
        </View>
        <View style={{ marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> Ongkir :</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}> {data.delivery_fee}</Text>
        </View>

        <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
          Detail Layanan
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 5
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>Nama Layanan</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>{data.catalog.name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 5
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>Harga Layanan</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color:'black' }}>{data.catalog.price}/{data.catalog.unit}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 8,
          }}>
          <Text>Ongkir</Text>
          <Text>{data.delivery_fee}</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: 'black',
          marginVertical: 5,
        }}
      />
      <Text style={{ alignSelf: 'center', color: 'black' }}>Status Pembayaran</Text>
      {/* <TouchableOpacity
        style={[styles.button, { backgroundColor: 'white', borderWidth:2, borderColor:ColorPrimary }]}
        onPress={() => sheetRef.current.snapTo(1)}>
          
        <Text style={[styles.textLogin, {color:'black'}]}>Lunas Akhir</Text>
      </TouchableOpacity> */}
      
      {data.payment_type == 1 ? 
        (
          <Text style={[styles.textLogin, {color:'#22C058', alignSelf:'center'}]}>Lunas Awal</Text>
        ):(
          <Text style={[styles.textLogin, {color: ColorDanger, alignSelf:'center'}]}>Lunas Akhir</Text>
        )
      }
      
      
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[330, 0, 0]}
        initialSnap={1}
        enabledGestureInteraction={true}
        borderRadius={20}
        renderContent={renderContent}
        renderHeader={renderHeader}
        callbackNode={fall}
        borderWidth={1}
        borderColor="black"
      />
      <Animated.View
        style={{ opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)) }}>
        <HeaderBar
          navigation={navigation}
          screenName="Tabs"
          title="Detail Transaksi"
        />
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ ...globalStyles.H3, color: 'black' }}>
            {data.serial}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={globalStyles.bodyText2}>Tanggal Pesan</Text>
            <Text style={globalStyles.bodyText2}>{data.created_at}</Text>
          </View>

          { data.status == 7?  
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={globalStyles.bodyText2}>Tanggal Selesai</Text>
            <Text style={globalStyles.bodyText2}>{data.updated_at}</Text>
          </View> : null }


          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              source={{ uri: `${S3}/`+ data.laundry.banner }}
              style={{ width: 70, height: 70 }}
              resizeMode="contain"
            />
            <View style={{ marginLeft:10, width:SIZES.width-70}}>
              <View style={{ flexDirection:'row',}}>
                <Text style={[globalStyles.H3,{width:SIZES.width-150}]}>{data.laundry.name}</Text>
                {data.user.no_hp.substring(0,1) == '0'?
                  <TouchableOpacity onPress={()=>{ Linking.openURL('https://wa.me/62'+data.laundry.phone.substring(1,data.user.no_hp.length))}}>
                    <Icon name="logo-whatsapp" size={30} color="#189D0E" />
                  </TouchableOpacity>:
                  <TouchableOpacity onPress={()=>{ Linking.openURL('https://wa.me/'+data.laundry.phone)}}>
                    <Icon name="logo-whatsapp" size={30} color="#189D0E" />
                  </TouchableOpacity>
                }
              </View>
              <Text style={globalStyles.captionText}>{data.laundry.phone}</Text>
              <Text style={globalStyles.captionText} numberOfLines={3}>{data.laundry.address}</Text>
            </View>
            
          </View>


          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={globalStyles.H3}>
              Layanan Antar
            </Text>
            { data.service_type == 2 ?(
                <Text
                  style={{ color: ColorPrimary, fontFamily: 'Montserrat-SemiBold', fontSize: 17 }}>
                  Pickup - Delivery
                </Text>
              ):(
                <Text
                  style={{ color: ColorPrimary, fontFamily: 'Montserrat-SemiBold', fontSize: 17 }}>
                  Antar Sendiri
                </Text>
              )
            }
          </View>

          { data.service_type == 2 ?(   
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                  <Text style={globalStyles.H3}>
                    Alamat Penjemputan
                  </Text>
                  {data.distance >= 1?(
                      <Text style={globalStyles.bodyText2}>Total Jarak : {data.distance} KM</Text>
                    ):(
                      <Text style={globalStyles.bodyText2}>Total Jarak : {data.distance * 1000} M</Text>
                    )
                  }
              </View>
              
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: 'center',
                    }}>

                  <Text style={[globalStyles.bodyText,{margin:10}]}>
                      {data.address}
                  </Text>
              </View>
            </View>
          ):null}
         

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={globalStyles.H3}>
              Status Pembayaran
            </Text>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => sheetRef.current.snapTo(0)}>
              {data.payment_type == 1 ? 
                (
                  <Text style={{ color: '#22C058', fontFamily: 'Montserrat-SemiBold', fontSize: 17 }}>
                    Lunas Awal
                  </Text>
                ):(
                  <Text style={{ color: ColorDanger, fontFamily: 'Montserrat-SemiBold', fontSize: 17 }}>
                  Lunas Akhir
                </Text>
                )
            }
              
              <Icon name="chevron-forward-outline" size={20} color= {data.payment_type == 1 ? "#22C058" : ColorDanger}  />
            </TouchableOpacity>
          </View>

          
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Text
            style={{
              ...globalStyles.H3,
            }}>
            Estimasi Selesai
          </Text>
            <Text style={{ color:'black', fontFamily: 'Montserrat-SemiBold', fontSize: 17 }}>{data.catalog.estimation_complete} {data.catalog.estimation_type}</Text>
          </View>

          <Text
            style={{ ...globalStyles.H3, marginTop: 20 }}>
            Detail Pesanan
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#F6F6F6',
              borderRadius: 20,
              marginTop: 15,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
                name={data.catalog.icon}
                style={{
                  fontSize: 70,
                  color: 'black',
                }}
            />
            <View>
              <Text style={globalStyles.bodyText2}>{data.catalog.name}</Text>
              <Text style={globalStyles.captionText}>Rp. {data.catalog.price} / {data.catalog.unit}</Text>
            </View>
          </View>

          {data.additional_information_user?
          <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                  <Text style={globalStyles.H3}>
                    Informasi Tambahan Customer
                  </Text>
              </View>
              
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: 'center',
                    }}>

                  <Text style={[globalStyles.bodyText,{margin:10}]}>
                      {data.additional_information_user}
                  </Text>
              </View>
          </View>:null}
          
          {data.additional_information_laundry?
          <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                  <Text style={globalStyles.H3}>
                    Informasi Tambahan Laundry
                  </Text>
              </View>
              
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#F6F6F6',
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: 'center',
                    }}>

                  <Text style={[globalStyles.bodyText,{margin:10}]}>
                      {data.additional_information_laundry}
                  </Text>
              </View>
          </View>:null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text style={globalStyles.H3}>
              Status Transaksi
            </Text>
            <Text
              style={{ ...globalStyles.bodyText2, color: '#22C058' }}
              numberOfLines={1}>
                {data.status == '1' ?
                  'Konfirmasi' : data.status == '2' ?
                     'Siap Jemput' : data.status == '3' ?
                        'Antrian' : data.status == '4' ?
                          'Proses' : data.status == '5' ?
                            'Siap Ambil' : data.status == '6' ?
                              'Siap Antar' : 'Selesai'}
            </Text>
            
          </View>
          <View style={{width: SIZES.width*0.90, marginTop: 5, alignSelf:'center',  justifyContent: 'center'}}>
          <StatusProsesBar
            height={20}
            backgroundColor={'grey'}
            completedColor={ColorPrimary}
            percentage={data.status == '6'? '90%' : data.status >= 5 ? '100%':
                          data.status != '2'? parseInt(100/7*data.status) + '%' : '14%'}
          />
        </View>
          <View style={{ height: 160 }} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default DetailTransaksi;

const styles = StyleSheet.create({
  textBold: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 80,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#000',
  },
});
