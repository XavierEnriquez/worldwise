import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useGeolocation } from "../../hooks/useGeolocation";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import styles from "./map.module.css";
import useCities from "../../contexts/useCities";
import Button from "../../components/button/Button";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([36, -15]);
  const [mapZoom, setMapZoom] = useState(3);
  const {
    isLoading: loadingPosition,
    position: geoPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
        setMapZoom(6);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
      setMapZoom(6);
    },
    [geoPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {loadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={mapZoom}
        scrollWheelZoom={true}
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
        <OnMapClick />
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

function OnMapClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
