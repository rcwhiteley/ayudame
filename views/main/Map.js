import React, { useRef, useEffect } from 'react'
import MapView from 'react-native-maps';
import { useLocation } from '../../hooks/useLocation';
import { ACTIONS } from './Constants';
import { StyleSheet } from 'react-native'


export const Map = (props) => {
    const mapView = useRef();
    const coordinate = useRef(props.coordinate);
    useEffect(()=>{
        mapView.current.animateCamera({ center: props.coordinate, heading: 0, pitch: 45 })

    })

    return (
        <MapView.Animated
            showsBuildings={false}
            showsIndoors={false}
            ref={mapView}
            style={styles.map}
            onPress={args => mapPressed(args)}
            initialRegion={props.coordinate}>
            {props.children}
        </MapView.Animated>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
