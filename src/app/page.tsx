import Hero from "@/modules/user/home-page/components/hero-section/hero-section";
import styles from "./page.module.css";
import LocationForm from "@/modules/user/home-page/components/location-selector/location-selector";

export default function Home() {
  return (
      <main className={styles.main}>
        <Hero/>
        <LocationForm/>
      </main>
  );
}
