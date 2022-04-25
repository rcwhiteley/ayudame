
import * as Location from 'expo-location'

export const watchPosition = async (callback) => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        console.log('debieeed')
    }
    let locations = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, timeInterval: 500, distanceInterval: 0 },
        callback
        )
}