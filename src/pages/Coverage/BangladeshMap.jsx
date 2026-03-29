import React, { useEffect, useState } from 'react'; // <<-- CHANGE: Added useEffect and useState
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Swal from 'sweetalert2';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- UPDATED COMPONENT: Using flyTo for Animation ---
const ZoomToDistrict = ({ targetPos }) => {
  const map = useMap();
  useEffect(() => {
    if (targetPos) {
      // <<-- CHANGE: setView replaced with flyTo -->>
      map.flyTo(targetPos, 14, {
        animate: true,
        duration: 2.0, // Duration in seconds
        easeLinearity: 0.25
      });
    }
  }, [targetPos, map]);
  return null;
};

const BangladeshMap = () => {
  // <<-- START: State to hold your JSON data -->>
  const [serviceCenters, setServiceCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomPos, setZoomPos] = useState(null);

  useEffect(() => {
    // Fetching from the public folder
    fetch('/serviceCenter.json')
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);
  // <<-- END: Data loading logic -->>

  const position = [23.8103, 90.4125]; // Dhaka center

  // --- NEW FUNCTION: Handle Search Logic ---
  const handleSearch = (e) => {
    e.preventDefault();
    const found = serviceCenters.find(
      (center) => center.district.toLowerCase() === searchQuery.toLowerCase()
    );

    if (found) {
      setZoomPos([found.latitude, found.longitude]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'District Not Found',
        text: `No service center found for "${searchQuery}". Please try another district.`,
      });
    }
  };

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      {/* --- SEARCH BAR UI --- */}
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search district (e.g. Dhaka, Bogura)..."
          className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9ACD32]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#9ACD32] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#88bc28] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Map Container */}
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Trigger zoom when search is successful */}
        {zoomPos && <ZoomToDistrict targetPos={zoomPos} />}

        {/* <<-- START: Dynamic Markers from JSON -->> */}
        {serviceCenters.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-[#002B2B] text-lg">{center.district}</h3>
                <p className="text-xs font-semibold text-blue-600 mb-1">Region: {center.region}</p>

                <div className="border-t pt-2">
                  <p className="text-xs font-bold text-slate-700">Covered Areas:</p>
                  <p className="text-[10px] text-slate-500 italic">
                    {center.covered_area.join(", ")}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${center.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {center.status.toUpperCase()}
                  </span>
                  <a
                    href={center.flowchart}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] bg-slate-100 p-1 rounded text-blue-600 font-bold hover:bg-blue-50"
                  >
                    View Flowchart
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* <<-- END: Dynamic Markers -->> */}

      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
