import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, MarkerAnimated, AnimatedRegion } from 'react-native-maps';

import { StyleSheet, Text, View, Dimensions, TouchableOpacity, } from 'react-native';
import * as Location from 'expo-location';
import AnimatedMarkers from './MapView';


const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = () => {


    return (
      <AnimatedMarkers/>
        // <View style={styles.container} onPress ={()=>animate()}>

        //     <MapView
        //         // provider=''
        //         style={styles.map}
        //         initialRegion={initialRegion}>
        //         <Marker.Animated ref={marker} coordinate={coordinates}></Marker.Animated>
        //     </MapView>
        //   <TouchableOpacity
        //     onPress={() => animate()}>
        //     <Text>Animate</Text>
        //   </TouchableOpacity>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapScreen;