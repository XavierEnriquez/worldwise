// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUrlPosition } from "../../hooks/useUrlPosition";
import Spinner from "../spinner/Spinner";
import FormLocIntake from "./FormLocIntake";
import useCities from "../../contexts/useCities";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();

  const { createNewCity, isLoading } = useCities();

  const [loadingGeoloc, setLoadingGeoloc] = useState(false);
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setLoadingGeoloc(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          setCityName(data.city || data.locality);
          setCountry(data.countryName);
          setEmoji(data.countryCode);
          setNotes("");
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingGeoloc(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createNewCity(newCity);
    navigate("/app");
  }

  if (loadingGeoloc) return <Spinner />;

  return (
    <FormLocIntake
      isLoading={isLoading}
      cityName={cityName}
      emoji={emoji}
      date={date}
      notes={notes}
      onSetCityName={setCityName}
      onSetDate={setDate}
      onSetNotes={setNotes}
      onHandleSubmit={handleSubmit}
    />
  );
}

export default Form;
