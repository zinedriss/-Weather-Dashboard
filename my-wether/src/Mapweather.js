import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Required for Leaflet styling
import L from "leaflet";
import "./MapWeather.css"; // Import custom CSS for styling
import { useDispatch, useSelector } from "react-redux";
import { GetLatLon } from "./features/WeatherApi/WeatherApiSlice";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const Mapweather = () => {

  const dispatch = useDispatch()
  const LatLon = useSelector((state) => state.data.LatLon);

  // Check if LatLon is available and has valid lat and lon, else fallback to Casablanca coordinates
  const lat = LatLon?.lat || 33.5731; // Default to Casablanca latitude if not found
  const lng = LatLon?.lon || -7.5898; // Default to Casablanca longitude if not found
  useEffect(()=>{
    dispatch(GetLatLon())
  },[dispatch])



  const [position, setPosition] = useState({ lat, lng });

  useEffect(() => {
    if (LatLon?.lat && LatLon?.lon) {
      setPosition({ lat: LatLon.lat, lng: LatLon.lon }); // Update position if LatLon is available
    }
  }, [LatLon]);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setPosition({ lat, lng }); // Update marker position
  };

  return (
    <div className="map-container" style={{ width: "400px", height: "300px" }}>
      <MapContainer
        center={[position.lat, position.lng]} // Initial center
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        onClick={handleMapClick} // Handle map clicks
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tiles
        />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            You clicked here: <br />
            Latitude: {position.lat.toFixed(4)} <br />
            Longitude: {position.lng.toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapweather;

