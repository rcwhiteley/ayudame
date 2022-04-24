import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
  Circle,
} from 'react-native-maps';


import * as Location from 'expo-location'
import { watchPosition } from './PositionWatcher';
import { addEvent, getDangerZones } from './DangerZonesAPI';
import { Modal } from 'react-native-paper';
import { ActionsModal } from './ActionsModal';
import { EmergencyModal } from './EmergencyModal';
import { PositionSourceModal } from './PositionSourceModal';

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
      dangerZones: [],
      actionModalVisible: false,
      emergencyModalVisible: false,
      eventToAdd: 'none',
      eventCoordinates: {
        ...INITIAL_COORDS
      },
      positionSource: '',
      positionSourceModalVisible: false,
    };
  }

  animate(coords) {
    try {
      let { coordinate, region } = this.state;
      //console.log(region);
      let newCoordinate = coords;

      if (Platform.OS === 'androids') {
        console.log(this.marker.current)
        this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);

      }
      else {
        coordinate.timing({ ...newCoordinate, useNativeDriver: true }).start();

      }
      if (this == null || this._map == null || this._map.current == null)
        return;
      if (this.state.isFocusingUser)
        this._map.current.animateCamera({ center: coords, heading: 0, pitch: 45 })
    }
    catch (err) { console.log(err) }
  }

  toggleIsFocusingUser() {
    this.setState({ isFocusingUser: !this.state.isFocusingUser })
    if (!this.state.isFocusingUser) {

    }
  }

  setPositionSource(positionSource) {
    this.setState({ positionSource: positionSource, positionSourceModalVisible: false })
    if (positionSource = '')
      return;
    if (positionSource == 'select') {
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );

      Alert.alert(
        '',
        'Seleccion el lugar del mapa en donde ocurrio',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  }

  mapPressed(args) {
    console.log(this.state.positionSource)
    console.log(args.nativeEvent)
    if (this.state.positionSource == 'select'){
      this.setState({ eventCoordinates: { ...args.nativeEvent.coordinate } })
      addEvent({coordinates: args.nativeEvent.coordinate, type: this.state.eventToAdd, timestamp: 0})
      this.setState({dangerZones: getDangerZones()})
    }
  }

  setActionModalVisible(boolean) {
    this.setState({ actionModalVisible: boolean });
  }

  setEmergencyModalVisible(boolean) {
    this.setState({ emergencyModalVisible: boolean });
  }

  eventSelected(action) {
    console.log("event selectd " + action);
    this.setState({ eventToAdd: action, actionModalVisible: false, positionSourceModalVisible: true, eventToAdd: action });
  }


  render() {
    if (this.state.coordinate.latitude == 0) return <Text>Loading...</Text>
    console.log("rendering")
    return (
      <View style={styles.container}>
        <MapView.Animated
          showsBuildings={false}
          showsIndoors={false}
          ref={this._map}
          style={styles.map}
          onPress={args => this.mapPressed(args)}

          initialRegion={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        // onPress={(args) => mapPressed(args)}
        >
          <Marker.Animated
            ref={(marker) => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
          {
            (this.state.eventCoordinates.latitude != 0) ? (
              <Marker
                draggable={true}
                coordinate={this.state.eventCoordinates}
                onDragEnd={args => this.mapPressed(args)}
                pinColor={'green'} />
            ) : <></>
          }
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
        </MapView.Animated>

        <ActionsModal visible={this.state.actionModalVisible} setVisible={(val) => this.setActionModalVisible(val)} notifyAction={(action) => this.eventSelected(action)} ></ActionsModal>
        <EmergencyModal visible={this.state.emergencyModalVisible} setVisible={(val) => this.setEmergencyModalVisible(val)} />
        <PositionSourceModal visible={this.state.positionSourceModalVisible} setPositionSource={val => this.setPositionSource(val)} />
        <Ionicons onPress={() => this.setActionModalVisible(true)} name="warning-outline" backgroundColor={'yellow'} size={40} color={'black'} style={{ position: 'absolute', bottom: 60, right: 10 }} />
        <MaterialIcons onPress={() => this.toggleIsFocusingUser()} name="gps-fixed" size={40} backgroundColor="white" color={this.state.isFocusingUser ? "green" : "grey"} style={{ position: 'absolute', bottom: 10, right: 10 }} />
        <MaterialIcons onPress={() => this.setEmergencyModalVisible(true)} name="error" size={60} backgroundColor="white" color='red' style={{ position: 'absolute', top: 50, right: 10 }} />
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