import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { iconTimbangan, outletLogo } from '../../../../assets/images';
import { HeaderBar } from '../../../../components';
import SIZES, { S3, ColorDanger, ColorPrimary } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailInfo = ({ navigation, route }) => {
 const { data } = route.params;
 
 return (
   <View style={{backgroundColor: 'white', width:SIZES.width, height:SIZES.height }}>
     <HeaderBar
       navigation={navigation}
       screenName="Tabs"
       title="Detail Informasi"
     />
     <ScrollView>
       <View style={{ paddingHorizontal: 20 }}>
         <View
           style={{
             flexDirection: 'column',
             alignItems: 'center',
             marginVertical: 20,
           }}>
           <Image
             source={{ uri: S3 +"/"+ data.picture }}
             style={{ width: SIZES.width, height: SIZES.width/2 }}
             resizeMode="contain"
           />
           <View style={{ marginLeft:5, alignSelf:'flex-start' }}>
             <Text style={globalStyles.titleText}>{data.title}</Text>
             <Text style={{ 
                 fontFamily: 'Montserrat-Regular',
                 fontSize: 20,
                 color:'black'
             }}>{data.description}</Text>
           </View>
         </View>

         </View>
       </ScrollView>
   </View>
 );
};

export default DetailInfo;

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
 textLogin: {
   fontSize: 20,
   fontWeight: '700',
   color: 'white',
 },
});