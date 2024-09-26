"use client";
import CarCard from "../car-display/car-card/car-card";
import styles from "./car-display.module.css";
import { cars } from "../../../../../../public/data/car-data"; // Import car data

const CarDisplay = () => {
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.sectionTitle}>Available Cars</h2>

      {/* Grid for larger screens and stacked for smaller screens */}
      <div className={styles.carGrid}>
        {cars.map((car, index) => (
          <div key={index} className={styles.carItem}>
            <CarCard {...car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDisplay;
