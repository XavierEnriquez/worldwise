import Sidebar from "../components/sidebar/Sidebar";
import Map from "../components/map/map";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
