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
  Circle,
} from 'react-native-maps';

import * as Location from 'expo-location'
import { watchPosition } from './PositionWatcher';
import { getDangerZones } from './DangerZonesAPI';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
var LATITUDE = 37.78825;
var LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_COORDS = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}



class AnimatedMarkers extends React.Component {
  _map = React.createRef()
  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        ...INITIAL_COORDS
      }),
      region: {
        ...INITIAL_COORDS
      },
      isFocusingUser: true,
      lastCoordinate: {
        ...INITIAL_COORDS
      },
      dangerZones: []
    };
  }

  animate(coords) {
    let { coordinate, region } = this.state;
    console.log(region);
    let newCoordinate = coords;

    if (Platform.OS === 'androids') {
      console.log(this.marker.current)
      this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);

    }
    else {
      coordinate.timing({ ...newCoordinate, useNativeDriver: true }).start();

    }
    if (this.state.isFocusingUser)
      try {
        this._map.current.animateToRegion(coords);
      }
      catch (err) { console.log(err) }
  }

  toggleIsFocusingUser() {
    this.setState({ isFocusingUser: !this.state.isFocusingUser })
    if (!this.state.isFocusingUser) {

    }
  }

  render() {
    if (this.state.coordinate.latitude == 0) return <Text>Loading...</Text>
    return (
      <View style={styles.container}>
        <MapView
          showsBuildings={false}
          showsIndoors={false}
          ref={this._map}
          style={styles.map}
          //region={this.state.region}
          initialRegion={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
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
          {
            this.state.dangerZones.map(dangerZone => (
              <MapView.Circle
                center={{ latitude: dangerZone.latitude, longitude: dangerZone.longitude }}
                radius={40}
                strokeColor={`rgba(255, ${200 - 20 * dangerZone.level}, 0, 0.5)`}
                fillColor={`rgba(255, ${200 - 20 * dangerZone.level}, 0, 0.5)`}
              />
            ))
          }

        </MapView>
        <MaterialIcons onPress={() => this.toggleIsFocusingUser()} name="gps-fixed" size={40} backgroundColor="white" color={this.state.isFocusingUser ? "green" : "grey"} style={{ position: 'absolute', bottom: 10, right: 10 }} />
      </View>
    );
  }


  parseLocation(coords) {
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  }

  useGps() {
    watchPosition((loc) => {
      let currentPosition = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      if (this.state.coordinate.latitude == 0) {
        this.setState({
          coordinate: new AnimatedRegion({
            ...currentPosition
          }),
          region: new AnimatedRegion({
            ...currentPosition
          })
        })
      }
      else {
        this.animate({
          ...currentPosition
        })
        this.setState({ lastCoordinate: { ...currentPosition } })
      }
    })
  }


  componentDidMount() {
    this.setState({ dangerZones: getDangerZones() })
    this.useGps();
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
});

export default AnimatedMarkers;