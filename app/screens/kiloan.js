import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { H1, H2, SPACING, width } from "../../config/ui-config";
import { View, ScrollView, Picker, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function KiloanScreen({ navigation }) {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('delivery');
  const [items, setItems] = useState([
    { label: 'Pick up - Delivery', value: 'delivery', icon: () => <Ionicons name="bicycle" color="blue" /> },
    { label: 'Antar Sendiri', value: 'sendiri', icon: () => <Ionicons name="walk" color="blue" /> }
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tittleHeader}>
          <TouchableOpacity style={styles.back}
            onPress={() => navigation.navigate('beranda')}>
            <Ionicons name="arrow-back-outline" size={40} color="white" />
          </TouchableOpacity>

          <View style={{ flex: 5, padding: 4 }}>
            <Text style={styles.tittleText}>Kiloan</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', alignSelf: 'center', width: width * 0.8 }}>
        <Text style={{ fontSize: 15, }}>Pilih Layanan Antar</Text>

        <DropDownPicker
          style={{ width: width * 0.4, alignSelf: 'center' }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={{
            backgroundColor: "#dfdfdf",
            width: width * 0.4,
            alignSelf: 'center'
          }}

        />
      </View>




    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
