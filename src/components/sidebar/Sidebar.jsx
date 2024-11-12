import { Outlet } from "react-router-dom";
import AppNav from "../nav/AppNav";
import Logo from "../logo/Logo";
import Footer from "../footer/Footer";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default Sidebar;
