
const baseUrl = 'https://ayudame-backend.azurewebsites.net'
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
export const getDangerZones = async (coordinates) => {

    let res = await fetch(`${baseUrl}/dangerzones`).then(res => res.json());
    //console.log(res);
    return res;
}

export const addEvent = async (dangerEvent) => {
    let dangerZone = { ...dangerEvent.coordinates, type: dangerEvent.type, timestamp: 0 }
    let res = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dangerZone),
    }).catch(err => console.log("Hubo un error"));
    console.log("xd");

    DANGER_ZONES.push(dangerZone)
}