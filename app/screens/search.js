import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { transaksiApi } from '../../config/api';

import {
  Colors,
  H2,
  SPACING,
  width,
} from './../../config/ui-config';



const axios = require('axios').default;
export default function SearchScreen({ navigation }) {
  const [global, setGlobal] = React.useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch(transaksiApi)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) =>
    Alert.alert(
      "Hasil Pencarian",
      'Kelurahan                          : ' + item.title + '\nTerkonfirmasi                   : ',// + item.waktu + '\nMeninggal                         : ' + item.status + '\nSembuh                             : ' + item.harga + '\nVaksin Tahap Pertama  : ' + item.vpertama + '\nVaksin Tahap Kedua      : ' + item.vkedua + '\nZona                                  : ' + ((item.active == 0) ? "Merah" : "") + ((item.active == 1) ? "Oranye" : "") + ((item.active == 2) ? "Kuning" : "") + ((item.active == 3) ? "Hijau" : ""),
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};


// });
// function SearchInput({item}) {
//     return (
//       <View style={styles.searchContainer}>
//         <TextInput style={styles.searchInput} placeholder="search..." />

//       </View>
//     );
//   }

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING * 2,
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#ddd',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  searchInput: {
    width: width - SPACING * 2,
    paddingHorizontal: SPACING * 1,

    backgroundColor: 'white',
    height: 60,
    borderRadius: 30,
    borderColor: '#ddd',
  },
  headerCard: {
    backgroundColor: Colors.primary,
    elevation: 7,
    borderRadius: SPACING,
    marginHorizontal: SPACING,
    padding: SPACING,
  },
  Card: {
    backgroundColor: "white",
    elevation: 7,
    borderRadius: SPACING,
    marginHorizontal: 10,
    marginVertical: 7,
    padding: SPACING,
  },
  headerImage: {
    position: 'absolute',
    width: width * 0.3,
    right: 20,
    top: 20,
    height: 110,
  },

  adviceContainer: {
    width: 110,
    marginRight: SPACING,
  },
  adviceImage: {
    width: 110,
    height: 110,
    marginBottom: SPACING * 0.5,
  },
  symContainer: {
    width: width - SPACING * 2,
    marginHorizontal: SPACING,
    backgroundColor: 'white',
    borderRadius: SPACING,
    padding: SPACING,
    marginBottom: SPACING,
    flexDirection: 'row',
  },
  btn: {
    width: width * 0.4,
    height: 50,
    borderRadius: 8,
    marginTop: SPACING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0 , 255 ,100)',
  },
  logo: {
    width: 330,
    height: 330,
  },
  analyticsCardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING,
  },
});
