import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons not showing in React Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const BangladeshMap = () => {
  // Center coordinates for Bangladesh (Dhaka)
  const position = [23.8103, 90.4125];

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <MapContainer 
        center={position} 
        zoom={7} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example Marker for Dhaka */}
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-[#002B2B]">Dhaka City</h3>
              <p className="text-xs text-slate-500">The capital of Bangladesh</p>
            </div>
          </Popup>
        </Marker>

        {/* Example Marker for Chittagong */}
        <Marker position={[22.3569, 91.7832]}>
          <Popup>
            <h3 className="font-bold text-[#002B2B]">Chittagong</h3>
            <p className="text-xs text-slate-500">The port city</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;