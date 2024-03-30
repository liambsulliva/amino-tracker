import React, { useEffect, useRef, useState } from 'react';
import './App.css';

async function fetchEarthquakeData() {
  const response = await fetch('https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/earthquakes?minYear=1900');
  const data = await response.json();
  return data;
}

function App() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBHRQDVs_pR_BqnpZ38srkKiOoLAXzHg_o';
    script.async = true;
    script.onload = async () => {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
      setMap(newMap);

      const earthquakeData = await fetchEarthquakeData();
      if (earthquakeData && earthquakeData.items) {
        earthquakeData.items.forEach(earthquake => {
          new window.google.maps.Marker({
            position: { lat: earthquake.latitude, lng: earthquake.longitude },
            map: newMap,
          });
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <h1>Earthquake Tracker</h1>
      <div className='Map' ref={mapRef}></div>
      <footer>
        <p>SteelHacks 2024: Liam Sullivan, Scott Styslinger, Mike Puthumana</p>
      </footer>
    </div>
  );
}

export default App;