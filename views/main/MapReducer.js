import React, {useReducer} from 'react'
import {
    Dimensions,
} from 'react-native';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
var LATITUDE = 0;
var LONGITUDE = 0;
export const LATITUDE_DELTA = 0.005;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



function reducer(state, action){
    const {type, payload} = action;
    let newState = {...state}
    switch(type){
        case 'position':
            newState.position = payload;
            console.log("setting coords" );
            console.log(payload);
            break;
    }
    return newState;
}

export const MapReducerTypes= {
    position: "position",
    positionFocused: 'positionFocused',
    selectedAction: 'selectedAction'
}

export function useMapReducer(){
    const initialState = {
        position: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        focusedElement: '',
        selectedAction: 'none',
    }
    
    const [prevState, dispatch] = useReducer(reducer, initialState);
    return [prevState, dispatch];
}