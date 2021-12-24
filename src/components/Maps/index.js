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
            longitude: this.props.location.longitude,
            latitude: this.props.location.latitude,
            latitudeDelta: this.props.location.latitudeDelta,
            longitudeDelta: this.props.location.longitudeDelta,
        },
        loc: {
            longitude: this.props.location.longitude,
            latitude: this.props.location.latitude,
        },
        heightMap: SIZES.height / 2,
        laundry: this.props.laundry,
        type: this.props.type,
    };

    UNSAFE_componentWillMount() {
        Geolocation.getCurrentPosition(x => {
            this.setState({
                region: {
                    latitude: (x.coords.latitude + this.props.location.latitude) / 2,
                    longitude: (x.coords.longitude + this.props.location.longitude) / 2,
                    latitudeDelta:
                        Math.abs(x.coords.latitude - this.props.location.latitude) * 1.5,
                    longitudeDelta:
                        Math.abs(x.coords.longitude - this.props.location.longitude) * 1.5,
                },
            });
        });

        if (this.props.type == 'create') {
            this.setState({
                region: {
                    latitude: this.props.location.latitude,
                    longitude: this.props.location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                },
            });
        }
    }

    onRegionChange = newRegion => {
        if (this.props.type == 'create') {
            this.setState({
                region: newRegion,
            });
        }
    };

    mapReady = () => {
        this.setState({ heightMap: SIZES.height });
    };

    render() {
        const data = this.state;

        return data.region.longitude != 'Pilih Lokasi' ? (
            <View style={styles.map}>
                <MapView
                    style={{ height: 200 }}
                    onMapReady={this.mapReady}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={data.region}
                    showsMyLocationButton={true}
                    showsUserLocation
                    userLocationUpdateInterval={10000}
                    onRegionChangeComplete={this.onRegionChange}
                    showsCompass={true}>
                    {data.type != 'user' ? null : (
                        <>
                            <Marker
                                title={data.laundry}
                                coordinate={{ latitude: this.props.location.latitude, longitude: this.props.location.longitude }}
                            >
                                <MaterialCommunityIcons
                                    name={'bucket'}
                                    style={{
                                        fontSize: 30,
                                        color: 'black',
                                    }}
                                />
                            </Marker>
                            <Marker
                                title="Geser marker"
                                description={"Lokasi penjemputan"}
                                draggable
                                coordinate={{ latitude: this.props.pickCoordinate.latitude, longitude: this.props.pickCoordinate.longitude }}
                                onDragEnd={(e) => this.props.getLocation(e.nativeEvent.coordinate)}
                            />
                        </>
                    )}
                </MapView>

                {this.props.type == 'create' ? (
                    <>
                        <View style={styles.markerFixed}>
                            <MaterialCommunityIcons
                                name="map-marker"
                                style={{
                                    fontSize: 50,
                                    color: ColorDanger,
                                }}
                            />
                        </View>
                        <SafeAreaView style={styles.footer}>
                            <TouchableOpacity
                                onPress={() => this.props.getCoordinate(this.state.region)}
                                style={styles.boxButton}>
                                <Text
                                    style={{
                                        color: ColorWhite,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 12,
                                    }}>
                                    Pilih Lokasi
                                </Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </>
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
        marginTop: 12,
        position: 'absolute',
        top: '40%',
    },
    marker: {
        height: 48,
        width: 48,
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        bottom: 5,
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: 5
    },
    boxButton: {
        backgroundColor: ColorPrimary,
        height: 60,
        width: 55,
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
