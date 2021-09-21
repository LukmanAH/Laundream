import React from 'react';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { H1, H2, SPACING } from "../../config/ui-config";
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function TransaksiScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tittleHeader}>
          <TouchableOpacity style={styles.back}
            onPress={() => navigation.navigate('beranda')}>
            <Ionicons name="arrow-back-outline" size={40} color="white" />
          </TouchableOpacity>

          <View style={{ flex: 5, padding: 4 }}>
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





      <ScrollView>



      </ScrollView>
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
