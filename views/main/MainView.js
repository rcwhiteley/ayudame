import React, { useEffect } from 'react'
import { watchPosition } from '../map-screen/PositionWatcher';
import { CurrentPositionMarker } from './CurrentPositionMarker'
import { useMapReducer, MapReducerTypes, LATITUDE_DELTA, LONGITUDE_DELTA } from './MapReducer';
import { StyleSheet, View } from 'react-native'
import { Map } from './Map';

export const MainView = () => {
    
    const [state, dispatch] = useMapReducer();

    useEffect(() => {
        watchPosition((loc) => {
            dispatch({type: 'position',payload: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }});
        })

    }, []);

    return (
        <View style={styles.container}>
            <Map coordinate={state.position}>
                <CurrentPositionMarker coordinate={state.position} />
            </Map>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

