import styles from "./page.module.css";
import HomePage from "@/modules/user/home-page/views/home";

export default function Home() {
  return (
      <main className={styles.main}>
        <HomePage/>
      </main>
  );
}
