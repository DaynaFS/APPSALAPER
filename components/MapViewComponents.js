import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import evacuationPoints from '../data/evacuationPoints';

const MapViewComponent = ({ location, onMarkerPress, route }) => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={location} title="Estás aquí" />
      {evacuationPoints.map(point => (
        <Marker
          key={point.id}
          coordinate={{ latitude: point.latitude, longitude: point.longitude }}
          title={point.title}
          description={point.description}
          onPress={() => onMarkerPress(point)}
          pinColor="green"
        />
      ))}
      {route && <Polyline coordinates={route} strokeColor="blue" strokeWidth={3} />}
    </MapView>
  );
};

export default MapViewComponent;
