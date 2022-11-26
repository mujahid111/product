import React, { useEffect, useState } from 'react';
import { StatusBar, ToastAndroid, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function Map() {
    const [position, setPosition] = useState({
        latitude: 22.6708,
        longitude: 71.5724,
        latitudeDelta: 10,
        longitudeDelta: 10,
    });

    useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
            });
        }, (err) => {
            console.log(err);
            ToastAndroid.show("Please allow location to access more features",ToastAndroid.LONG);
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={"dark-content"} backgroundColor={"#eee"} />
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={position}
                region={position}
            >
                <Marker
                    title='Yor are here'
                    //  description='This is a description'
                    coordinate={position} />
            </MapView>
        </View>
    );
}