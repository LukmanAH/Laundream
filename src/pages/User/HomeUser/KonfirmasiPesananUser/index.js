import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {HeaderBar} from '../../../../components';


const KonfirmasiPesanan = ({navigation}) => {
    return (
        <View>
         <HeaderBar
        navigation={navigation}
        screenName="DetailPesanan"
        title="Konfirmasi Pesanan"
      />
        </View>
    )
}

export default KonfirmasiPesanan

const styles = StyleSheet.create({})
