import React from 'react';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { H1, H2, SPACING } from "../../config/ui-config";
import { View, ScrollView, Text, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {

  const getOut = () =>
    Alert.alert(
      "Apakah Anda Ingin Logout ?",
      "Apakah Anda Ingin Logout ?",
      [
        { text: "Batal", onPress: () => console.log("Batal Pressed") },
        { text: "Ok", onPress: () => navigation.navigate('login') }
      ]
    );


  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.logout}
          onPress={getOut}
        >
          <Ionicons name="log-out-outline" size={30} color='white' />
        </TouchableOpacity>

        <View style={styles.tittleHeader}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontSize: H1, alignSelf: 'center' }}>Rasyidah Herawati</Text>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="create-outline" size={20} color='white' />
              <Text style={{ color: 'white' }}>Edit Profile</Text>
            </View>

          </View>
        </View>

      </View>

      <View>


        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="person-outline" size={30} color={Colors.primary} />
          <Text>DIsini username</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="call-outline" size={30} color={Colors.primary} />
          <Text>DIsini no hp</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="mail-outline" size={30} color={Colors.primary} />
          <Text>DIsini gtau</Text>
        </View>

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
    height: SPACING * 7,
    paddingTop: SPACING,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  logout: {
    alignItems: 'flex-end',
    padding: SPACING / 2,
    margin: 10,
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
