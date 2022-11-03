import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SIZES, { ColorDanger } from '../../utils/constanta';
import { ColorWhite, ColorPrimary } from '../../utils/constanta';
import {useNetInfo} from "@react-native-community/netinfo";

const OfflineNotice = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
};

export default OfflineNotice;

const styles = StyleSheet.create({
    container: {
     backgroundColor: ColorDanger,
     height: 30,
     justifyContent: 'center',
     alignItems: 'center',
     flexDirection: 'row',
     width:SIZES.width/2,
     position: 'absolute',
     borderRadius:15,
     top: SIZES.height*0.3
    },

    offlineText: { 
     color: '#fff'
   }
});
