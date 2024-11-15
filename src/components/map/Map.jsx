import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import PropTypes from "prop-types";

import styles from "./map.module.css";
import useCities from "../../contexts/useCities";

function Map() {
  // const navigate = useNavigate();
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([36, -9]);
  const [mapZoom, setMapZoom] = useState(3);
  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
        setMapZoom(7);
      }
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={mapZoom}
        scrollWheelZoom={true}
        // onClick={() => navigate("form")}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <CenterMap position={mapPosition} zoom={mapZoom} />
      </MapContainer>
    </div>
  );
}

function CenterMap({ position, zoom }) {
  const map = useMap();
  map.setView(position, zoom);
  return null;
}

CenterMap.propTypes = {
  position: PropTypes.array,
  zoom: PropTypes.number,
};

export default Map;
