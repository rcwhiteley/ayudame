export class DangerEvent{
     constructor(coordinates, type, timestamp, description){
        this.coordinates = {latitude: coordinates.latitude, longitude: coordinates.longitude};
        this.type = type;
        this.timestamp = timestamp;
        this.description = description;
    }
}