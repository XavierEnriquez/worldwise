import { Link } from "react-router-dom";
import PageNav from "../components/nav/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          Your companion map that follows your footsteps into every place your
          adventures may take you. Never forget the wonderful experiences while
          sharing them with the friends you will make all around the world.
        </h2>
        <Link to="/app" className="cta">
          Start the Adventure
        </Link>
      </section>
    </main>
  );
}
