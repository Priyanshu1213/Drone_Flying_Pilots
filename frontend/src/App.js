

import React, { useState, useEffect } from 'react';
import PilotMap from './components/PilotMap';
import Filters from './components/Filters';
import axios from 'axios';
import './App.css';
import Loader from './components/loader';

function App() {
  const [pilots, setPilots] = useState([]);
  const [adminCoords, setAdminCoords] = useState([0, 0]);
  const [range, setRange] = useState(0);
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [p2, setP2] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [firstLoad, setFirstLoad] = useState(true); 

  useEffect(() => {
    const fetchPilots = async () => {
      if (firstLoad) {
        setLoading(true); 
      }
      try {
        const [lat, lng] = adminCoords;
        const response = await axios.get(`http://localhost:5000/api/pilots/search`, {
          params: { lat, lng, range },
        });

        setPilots(response.data); 
        setP2(response.data); 

        if (firstLoad) {
          setLoading(false); 
          setFirstLoad(false); 
        }
      } catch (error) {
        if (error.message === "Network Error") {
          console.error("Network error");
        } else {
          console.error("Error fetching pilots:", error);
        }

        if (firstLoad) {
          setLoading(false); 
        }
      }
    };

    // if (adminCoords[0] !== 0 && adminCoords[1] !== 0) {
      fetchPilots(); 
    // }
  }, [adminCoords, range, firstLoad]);

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query === '') {
      setPilots(p2); 
    } else {
      const newPilots = p2.filter((pilot) =>
        pilot.name.toLowerCase().includes(query.toLowerCase()) ||
        pilot.experience >= parseInt(query)
      );
      setPilots(newPilots);
    }
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          setAdminCoords([position.coords.latitude, position.coords.longitude]);
          setLatInput('');
          setLngInput('');
        } else {
          console.log("Failed to get location");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const latitude = parseFloat(latInput);
    const longitude = parseFloat(lngInput);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      setAdminCoords([latitude, longitude]);
    } else {
      alert('Please enter valid latitude and longitude.');
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setLatInput('');
    setLngInput('');
  };

  // useEffect(() => {
  //   if (useCurrentLocation) {
  //     handleUseCurrentLocation();
  //   }
  // }, [useCurrentLocation]);

  return (
    <>
      <div className="search-container">
        <h>Flying Pilot</h>
        <input
          type="search"
          placeholder="Search pilots"
          onChange={handleSearch}
        />
      </div>
      <div className="App">
        <div className="leftside">
          <div className="radioo" style={{ marginBottom: '20px' }}>
            <label>
              <input
                type="radio"
                checked={useCurrentLocation}
                onChange={() => setUseCurrentLocation(true)}
              />
              Use Current Location
            </label>
            <label>
              <input
                type="radio"
                checked={!useCurrentLocation}
                onChange={() => setUseCurrentLocation(false)}
              />
              Enter Coordinates
            </label>
          </div>

          {useCurrentLocation ? (
            <button style={{ marginBottom: '20px' }} onClick={handleUseCurrentLocation}>
              Get Current Location
            </button>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
              <div>
                <label>
                  Latitude:
                  <input
                    type="text"
                    value={latInput}
                    onChange={(e) => setLatInput(e.target.value)}
                    placeholder="Enter latitude"
                  />
                </label>
              </div>
              <div>
                <label>
                  Longitude:
                  <input
                    type="text"
                    value={lngInput}
                    onChange={(e) => setLngInput(e.target.value)}
                    placeholder="Enter longitude"
                  />
                </label>
              </div>
              <button type="submit">Update Location</button>
              <button onClick={handleClear}>Clear</button>
            </form>
          )}

          <Filters aetRange={setRange} />
        </div>

        
        {loading ? (
          <Loader />
        ) : (
          <PilotMap pilots={pilots} adminCoords={adminCoords} />
        )}
      </div>
    </>
  );
}

export default App;
