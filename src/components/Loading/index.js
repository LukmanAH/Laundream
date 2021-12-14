import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ColorWhite, ColorPrimary } from '../../utils/constanta';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={ColorPrimary} />
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
