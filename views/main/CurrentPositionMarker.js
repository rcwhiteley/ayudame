import React, { useRef, useEffect, useReducer } from 'react'
import { AnimatedRegion, Marker } from 'react-native-maps'
import { useMapReducer } from './MapReducer';

export const CurrentPositionMarker = (props) => {
    const marker = useRef()
    const coordinate = useRef(new AnimatedRegion({
        ...props.coordinate
    })
    );

    useEffect(() => {
        console.log("use effect");
        console.log(props.coordinate)
            coordinate.current.timing({ ...props.coordinate, useNativeDriver: true }, 500).start();
    });
    //console.log(props.coordinate)

    console.log("No es undefined")

    return (
        <Marker.Animated
            ref={marker} coordinate={coordinate.current}>
        </Marker.Animated>
    )
}
