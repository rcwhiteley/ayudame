import { useEffect, useState } from 'react'

export const useLocation = (initialLocation) => {
    const [location, setLocation] = useState(location);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    return [location, setLocation];
}
