
// Dummy pilot data
const Pilots = [
  
  { name: 'Jane Doe', profileImg: 'https://randomuser.me/api/portraits/women/44.jpg', experience: 9, latitude: 34.0522, longitude: -118.2437 },
  { name: 'Alice Smith', profileImg: 'https://randomuser.me/api/portraits/women/68.jpg', experience: 3, latitude: 37.7749, longitude: -122.4194 },
  { name: 'Bob Johnson', profileImg: 'https://randomuser.me/api/portraits/men/51.jpg', experience: 10, latitude: 51.5074, longitude: -0.1278 },
  { name: 'Carol Williams', profileImg: 'https://randomuser.me/api/portraits/women/10.jpg', experience: 7, latitude: 48.8566, longitude: 2.3522 },
  { name: 'David Brown', profileImg: 'https://randomuser.me/api/portraits/men/40.jpg', experience: 1, latitude: 40.7306, longitude: -73.9352 },
  { name: 'Emily Davis', profileImg: 'https://randomuser.me/api/portraits/women/9.jpg', experience: 4, latitude: 35.6895, longitude: 139.6917 },
  { name: 'Frank Miller', profileImg: 'https://randomuser.me/api/portraits/men/26.jpg', experience: 9, latitude: 39.9042, longitude: 116.4074 },
  { name: 'Grace Wilson', profileImg: 'https://randomuser.me/api/portraits/women/4.jpg', experience: 2, latitude: -33.8688, longitude: 151.2093 },
  { name: 'Henry Moore', profileImg: 'https://randomuser.me/api/portraits/men/32.jpg', experience: 12, latitude: 55.7558, longitude: 37.6176 },
  { name: 'Ivy Taylor', profileImg: 'https://randomuser.me/api/portraits/women/23.jpg', experience: 5, latitude: 37.5665, longitude: 126.978 },
  { name: 'Jack Anderson', profileImg: 'https://randomuser.me/api/portraits/men/47.jpg', experience: 6, latitude: 40.7306, longitude: -73.9352 },
  { name: 'Kathy Thomas', profileImg: 'https://randomuser.me/api/portraits/women/19.jpg', experience: 3, latitude: 19.0760, longitude: 72.8777 },
  { name: 'Leo Martinez', profileImg: 'https://randomuser.me/api/portraits/men/35.jpg', experience: 7, latitude: 34.0522, longitude: -118.2437 },
  { name: 'Mia Rodriguez', profileImg: 'https://randomuser.me/api/portraits/women/32.jpg', experience: 8, latitude: 37.7749, longitude: -122.4194 },
  { name: 'Nathan Lee', profileImg: 'https://randomuser.me/api/portraits/men/53.jpg', experience: 2, latitude: 55.9533, longitude: -3.1883 },
  { name: 'Olivia Clark', profileImg: 'https://randomuser.me/api/portraits/women/43.jpg', experience: 4, latitude: 52.3676, longitude: 4.9041 },
  { name: 'Paul Harris', profileImg: 'https://randomuser.me/api/portraits/men/41.jpg', experience: 10, latitude: 39.9042, longitude: 116.4074 },
  { name: 'Quinn Lewis', profileImg: 'https://randomuser.me/api/portraits/men/37.jpg', experience: 6, latitude: 47.6062, longitude: -122.3321 },
  { name: 'Rachel Young', profileImg: 'https://randomuser.me/api/portraits/women/28.jpg', experience: 8, latitude: 50.8503, longitude: 4.3517 },
  { name: 'Steve Walker', profileImg: 'https://randomuser.me/api/portraits/men/50.jpg', experience: 11, latitude: 59.3293, longitude: 18.0686 },
  { name: 'Tina Allen', profileImg: 'https://randomuser.me/api/portraits/women/36.jpg', experience: 5, latitude: 41.9028, longitude: 12.4964 },
  { name: 'Ursula King', profileImg: 'https://randomuser.me/api/portraits/women/49.jpg', experience: 4, latitude: 34.0522, longitude: -118.2437 },
  { name: 'Victor Wright', profileImg: 'https://randomuser.me/api/portraits/men/38.jpg', experience: 6, latitude: 35.6895, longitude: 139.6917 },
  { name: 'Wendy Scott', profileImg: 'https://randomuser.me/api/portraits/women/40.jpg', experience: 1, latitude: 47.6062, longitude: -122.3321 },
  { name: 'Xander Green', profileImg: 'https://randomuser.me/api/portraits/men/42.jpg', experience: 9, latitude: 41.8781, longitude: -87.6298 },
  { name: 'Yvonne Adams', profileImg: 'https://randomuser.me/api/portraits/women/16.jpg', experience: 4, latitude: 40.4168, longitude: -3.7038 },
  { name: 'Zachary Baker', profileImg: 'https://randomuser.me/api/portraits/men/49.jpg', experience: 7, latitude: 59.9343, longitude: 30.3351 }
];


const getPilotsWithinRange = async (req, res) => {
  try {
    const { lat, lng, range } = req.query;
    const adminCoords = { lat, lng };
    
    const filteredPilots = Pilots.filter(pilot => {
      const distance = calculateDistance(adminCoords.lat, adminCoords.lng, pilot.latitude, pilot.longitude);
      return distance <= range;
    }).sort((a, b) => b.experience - a.experience).slice(0, 11);
    
    res.json(filteredPilots);

  } catch (error) {
    console.error('Error fetching pilots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}




module.exports = { getPilotsWithinRange };
