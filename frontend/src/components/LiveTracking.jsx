import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for the current location
const currentLocationIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const LiveTracking = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    // Watch for location updates
    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Unable to retrieve your location', error);
      },
      { enableHighAccuracy: true } // High accuracy for better tracking
    );

    // Clear the watch on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ height: '80vh', width: '100%', zIndex: 0 }}>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <LayersControl position="topright">
            {/* OpenStreetMap Layer */}
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </LayersControl.BaseLayer>

            {/* Satellite Layer */}
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </LayersControl.BaseLayer>

            {/* Marker showing current location */}
            <Marker position={position} icon={currentLocationIcon}>
              <Popup>Your current location</Popup>
            </Marker>
          </LayersControl>

          {/* Auto pan to current location */}
          <AutoPanToLocation position={position} />
        </MapContainer>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
};

// Automatically pan the map to the current location
const AutoPanToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { animate: true });
    }
  }, [position, map]);

  return null;
};

export default LiveTracking;
