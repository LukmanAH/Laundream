import React, { useEffect, useState } from 'react';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { H1, H2, SPACING } from "../../config/ui-config";
import { View, ScrollView, FlatList, Alert, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { transaksiUserApi } from '../../config/api';

export default function TransaksiScreen({ navigation }) {
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch(transaksiUserApi)
      .then((response) => response.json())
      .then((responseJson) => {
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => getItem(item)}
      >
        <Image
          style={styles.articleImg}
          source={require('./../../assets/bedding-icon.png')}
        />

        <Text style={{ flex: 5 }}>
          {item.title.toUpperCase()}
        </Text>
        <Text style={{ flex: 1 }}>
          {item.id.toString()}
        </Text>
      </TouchableOpacity>

    );
  };

  const getItem = (item) =>
    Alert.alert(
      "Detail Transaksi",
      'Kelurahan                          : ' + item.title, // + item.waktu + '\nMeninggal                         : ' + item.status + '\nSembuh                             : ' + item.harga + '\nVaksin Tahap Pertama  : ' + item.vpertama + '\nVaksin Tahap Kedua      : ' + item.vkedua + '\nZona                                  : ' + ((item.active == 0) ? "Merah" : "") + ((item.active == 1) ? "Oranye" : "") + ((item.active == 2) ? "Kuning" : "") + ((item.active == 3) ? "Hijau" : ""),
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tittleHeader}>
          <TouchableOpacity style={styles.back}
            onPress={() => navigation.navigate('beranda')}>
            <Ionicons name="arrow-back-outline" size={40} color="white" />
          </TouchableOpacity>

          <View style={{ flex: 6, padding: 4 }}>
            <Text style={styles.tittleText}>Transaksi</Text>
          </View>

        </View>
        <View style={styles.tittleOpsi}>
          <TouchableOpacity style={styles.opsi}>
            <Text style={{ fontSize: H2, color: 'white' }}>
              On Going
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opsi}
            onPress={() => navigation.navigate('riwayat')}>
            <Text style={{ fontSize: H2, color: '#bdc3c7' }}>
              Riwayat
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <FlatList
        data={masterDataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />

    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemStyle: {
    flexDirection: 'row',
    marginHorizontal: SPACING * 0.5,
    marginVertical: SPACING * 0.25,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: SPACING * 0.5,
    borderRadius: SPACING / 4,
  },

  articleImg: {
    width: 60,
    height: 60,
    borderRadius: SPACING * 0.5,
    backgroundColor: Colors.lightGrey,
    marginRight: SPACING * 0.5,
  },

  header: {
    paddingTop: SPACING * 2,
    backgroundColor: Colors.primary,
    flexDirection: 'column',
  },

  tittleHeader: {
    height: SPACING * 2.5,
    flexDirection: 'row',
  },

  tittleOpsi: {
    flexDirection: 'row',
  },

  tittleText: {
    fontSize: H1,
    color: 'white',
  },

  back: {
    flex: 1,
    paddingLeft: SPACING * 1.5,
  },

  opsi: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },

});
