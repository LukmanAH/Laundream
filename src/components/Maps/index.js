import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SIZES, {
    ColorDanger,
    ColorPrimary,
    ColorWhite,
} from '../../utils/constanta';
import Geolocation from '@react-native-community/geolocation';

export default class Maps extends React.Component {
    state = {
        region: {
            longitude: Number(this.props.location.longitude),
            latitude: Number(this.props.location.latitude),
            latitudeDelta: Number(this.props.location.latitudeDelta),
            longitudeDelta: Number(this.props.location.longitudeDelta),
        },
        loc: {
            longitude: this.props.location.longitude,
            latitude: this.props.location.latitude,
        },
        heightMap: SIZES.height / 2,
    };

    UNSAFE_componentWillMount() {
        Geolocation.getCurrentPosition(x => {
            this.setState({
                region: {
                    latitude: Number((x.coords.latitude + this.props.location.latitude) / 2),
                    longitude: Number((x.coords.longitude + this.props.location.longitude) / 2),
                    latitudeDelta:
                        Math.abs(x.coords.latitude - this.props.location.latitude) * 2,
                    longitudeDelta:
                        Math.abs(x.coords.longitude - this.props.location.longitude) * 2,
                },
            });
        });
    }

    mapReady = () => {
        this.setState({ heightMap: SIZES.height });
    };

    render() {
        const data = this.state;
        // const location = this.props.location;

        return data.region.longitude != 'Pilih Lokasi' ? (
            <View style={styles.map}>
                <MapView
                    //   ref={this.refs}
                    style={{ height: 200 }}
                    onMapReady={this.mapReady}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={data.region}
                    showsMyLocationButton={true}
                    showsUserLocation
                    userLocationUpdateInterval={10000}
                    showsCompass={true}>

                </MapView>

                {this.props.tipe == 'small' ? (
                    <View style={styles.showFooter}>
                        <TouchableOpacity
                            style={styles.boxButton}
                            onPress={() => this.props.screenCreate('map')}>
                            <MaterialCommunityIcons
                                name="map-search-outline"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                ) : this.props.tipe == 'show' ? (
                    <View style={styles.showFooter}>
                        <TouchableOpacity
                            style={styles.boxButton}
                            onPress={() => this.props.screenCreate('main')}>
                            <MaterialCommunityIcons name="arrow-left" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        ) : null;
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: 24,
        position: 'absolute',
        top: '50%',
    },
    marker: {
        height: 48,
        width: 48,
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 30,
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    boxButton: {
        backgroundColor: ColorPrimary,
        height: 75,
        width: 70,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coord: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
        color: ColorWhite,
    },
    title: {
        fontSize: 14,
        color: ColorWhite,
    },
    konten: {
        fontSize: 18,
        color: ColorWhite,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 30,
        color: ColorWhite,
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20,
    },
    showFooter: {
        position: 'absolute',
        display: 'flex',
        right: 20,
        bottom: 20,
    },
});
