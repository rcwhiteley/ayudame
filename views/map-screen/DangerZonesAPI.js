var DANGER_ZONES = [
    {
        latitude: -36.830084563410594,
        longitude: -73.05859665135644,
        level: 10,
    },
    {
        latitude: -36.83491532346454,
        longitude: -73.05424218220031,
        level: 1,
    }];
export const getDangerZones = (coordinates) => {

    return DANGER_ZONES;
}

export const addEvent = (dangerEvent) => {
    let dangerZone = {...dangerEvent.coordinates}
    switch (dangerEvent.type) {
        case "asalto":
            dangerZone.level = 3
            break;
        case "rapto":
            dangerZone.level = 4
            break;
        case "robo":
            dangerZone.level = 2
            break;
        case "grupo_molesto":
            dangerZone.level = 1
            break;
        default:
            break;
    }
    DANGER_ZONES.push(dangerZone)
}