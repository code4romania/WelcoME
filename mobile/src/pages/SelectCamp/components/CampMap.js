import React from 'react';
import { MapView } from 'expo';

const CampMap = ({ camp }) => {
  if (!camp) {
    return null;
  }

  const { Location: { geolocation: { lat, long } } } = camp;
  return (
    <MapView
      scrollEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      lite
      style={{ height: 200, width: 200 }}
      region={{
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      }}
    >
      <MapView.Marker coordinate={{ latitude: lat, longitude: long }} />
    </MapView>
  );
};
export default CampMap;
