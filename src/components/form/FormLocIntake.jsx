import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import styles from "./Form.module.css";
import Button from "../button/Button";
import ButtonBack from "../button/ButtonBack";

export default function FormLocIntake({
  isLoading,
  cityName,
  emoji,
  date,
  notes,
  onSetCityName,
  onSetDate,
  onSetNotes,
  onHandleSubmit,
}) {
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={onHandleSubmit}
    >
      {!emoji && (
        <div>
          <p>Wow, that is way out there!.. Did you click the right place?</p>
          <p>
            Enter the location data to save it or click on a different location
            on the map.
          </p>
        </div>
      )}
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => onSetCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => onSetDate(date)}
          dateFormat="dd/MM/yyy"
        />
        {/* <input
          id="date"
          onChange={(e) => onSetDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => onSetNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

FormLocIntake.propTypes = {
  isLoading: PropTypes.bool,
  cityName: PropTypes.string,
  emoji: PropTypes.string,
  date: PropTypes.object,
  notes: PropTypes.string,
  onSetCityName: PropTypes.func,
  onSetDate: PropTypes.func,
  onSetNotes: PropTypes.func,
  onHandleSubmit: PropTypes.func,
};
