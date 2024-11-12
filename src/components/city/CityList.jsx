import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import Message from "../message/Message";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      // Add other city properties here
    })
  ),
  isLoading: PropTypes.bool,
};

export default CityList;
