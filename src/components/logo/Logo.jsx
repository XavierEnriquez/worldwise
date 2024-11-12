import { Link } from "react-router-dom";
import logo from "/logo.png";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
