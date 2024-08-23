import React, { useState, useEffect } from 'react';
import PilotMap from './components/PilotMap';
import Filters from './components/Filters';
import axios from 'axios';
import './App.css';

function App() {
  const [pilots, setPilots] = useState([]);
  const [adminCoords, setAdminCoords] = useState([0, 0]);
  const [range, setRange] = useState(0);
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [p2, setP2] = useState([]);

  // Fetch pilots based on admin location and range
  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const [lat, lng] = adminCoords;
        const response = await axios.get(`http://localhost:5000/api/pilots/search`, {
          params: { lat, lng, range },
        });
        setPilots(response.data); // Assuming response.data contains the pilot list
        setP2(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching pilots:", error);
      }
    };

    if (adminCoords[0] !== 0 && adminCoords[1] !== 0) {
      fetchPilots();  // Fetch only when valid coordinates are available
    }
  }, [adminCoords, range]);




  const handleSearch =(e)=>{
    const quary = e.target.value;
    if(quary ===''){
      setPilots(p2)
    }
    else{
      const newPilots = pilots.filter((pilot)=>pilot.name.toLowerCase().includes(quary.toLowerCase()) ||
       pilot.experience >= parseInt(quary))
    setPilots(newPilots);
    }
    

  }




  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAdminCoords([position.coords.latitude, position.coords.longitude]);
        setLatInput('');
        setLngInput('');
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



  return (
    <>
    
    <div className="search-container">
    <h> Flying Pilot</h>
    <input 
      type="search"
      placeholder="Search pilots"
      onChange={handleSearch}
    />
  </div>
    <div className="App">
      

      <div className='leftside'>

      <div className='radioo' style={{ marginBottom: '20px' }}>
        <label >
          <input
            type="radio"
            checked={useCurrentLocation}
            onChange={() => setUseCurrentLocation(true)}
          />
          Use Current Location
        </label>
        <label >
          <input
            type="radio"
            checked={!useCurrentLocation}
            onChange={() => setUseCurrentLocation(false)}
          />
          Enter Coordinates
        </label>
      </div>


      {useCurrentLocation ? (
        <button onClick={handleUseCurrentLocation} style={{ marginBottom: '20px' }}>
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
      
      <PilotMap pilots={pilots} adminCoords={adminCoords} />
      
    </div>
    </>
  );
}

export default App;
