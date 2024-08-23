

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import "./po.css"

// Custom marker icon
const createCustomIcon = (iconUrl) => {
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: 'leaflet-icon-circle' ,
    
  });
};


const PilotMap = ({ pilots, adminCoords }) => {
  // Admin marker icon
  const adminIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/149/149071.png');

   
 

  return (
    <MapContainer center={adminCoords} zoom={2} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render Pilots */}
      {pilots.map((pilot, idx) => (
        <Marker key={idx} position={[pilot.latitude, pilot.longitude]}  icon={createCustomIcon(pilot.profileImg)  } >
          <Popup>
            <div style={{ textAlign: 'center', padding: '10px', maxWidth: '200px' }}>
              <img
                src={pilot.profileImg}
                alt="Pilot"
                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
              
              />
              <h3 style={{ fontSize: '16px', margin: '5px 0', fontWeight: 'bold' }}>{pilot.name}</h3>
              <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Experience: {pilot.experience} years</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Admin Location */}
{adminCoords[0] !== 0 && adminCoords[1] !== 0 && (
  <Marker position={adminCoords} icon={adminIcon}>
    <Popup>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h3 style={{ fontSize: '16px', margin: '5px 0', fontWeight: 'bold' }}>Admin</h3>
        <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>You are here</p>
      </div>
    </Popup>
  </Marker>
)}

    </MapContainer>
  );
};

export default PilotMap;
