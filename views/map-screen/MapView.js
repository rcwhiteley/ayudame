import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';

import * as Location from 'expo-location'
import { Button } from 'react-native-paper';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class AnimatedMarkers extends React.Component {
  _map = React.createRef()
  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }),
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
    };
  }

  animate(coords) {
    let { coordinate, region } = this.state;
    console.log(region);
    let newCoordinate = coords;

    if (Platform.OS === 'androids') {
      console.log(this.marker.current)
      this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);

    } else {
      // `useNativeDriver` defaults to false if not passed explicitly
      coordinate.timing({ ...newCoordinate, useNativeDriver: true }).start();
      //region.timing({ ...newCoordinate, useNativeDriver: true }).start();
      
    }
    try{
      console.log("aaahh");
      this._map.current.animateToRegion(coords);
      console.log("aaahhsdasd");
    }
    catch(err){}
  }

  render() {
    if (this.state.coordinate == 0) return <Text>Loading...</Text>
    let lat = (this.state.coordinate.latitude)
    let lon = (this.state.coordinate.longitude)
    return (
      <View style={styles.container}>
        <MapView
        ref={this._map}
          style={styles.map}
          //region={this.state.region}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker.Animated
            ref={(marker) => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        <MaterialIcons name="gps-fixed" size={40} backgroundColor="white" color="darkcyan" style={{position: 'absolute', bottom:10, right: 10}} />
      </View>
    );
  }

  
  componentDidMount() {
    console.log('hi')
    const _getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('debieeed')
      }
      else
      console.log("whiiii");
      let locations = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 0 },
        (loc) => {
          //console.log(loc);
          this.animate();
          if (this.state.coordinate.latitude == 0) {
            this.setState({
              coordinate: new AnimatedRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }),
              region:  new AnimatedRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: LONGITUDE_DELTA,
              })
            })
          }
          else {
            this.animate({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            })
            // this.setState({
            //   region: {
            //     latitude: loc.coords.latitude,
            //     longitude: loc.coords.longitude,
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA,
            //   }
            // })
          }
        });
  
  
    }
  
    _getLocationAsync();
  }
}

AnimatedMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default AnimatedMarkers;