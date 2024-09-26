"use client";
import { useState } from "react";
import styles from "./sidebar.module.css";

const FilterSidebar = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Sport", "SUV"]);
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>(["2 Person", "8 or More"]);
  const [price, setPrice] = useState<number>(100);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity((prev) =>
      prev.includes(capacity) ? prev.filter((c) => c !== capacity) : [...prev, capacity]
    );
  };

  return (
    <div className={styles.sidebar}>
      {/* Car Type Section */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Type</h4>
        {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map((type, index) => (
          <label key={index} className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
            {type} <span className={styles.count}>({Math.floor(Math.random() * 20) + 10})</span>
          </label>
        ))}
      </div>

      {/* Capacity Section */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Capacity</h4>
        {["2 Person", "4 Person", "6 Person", "8 or More"].map((capacity, index) => (
          <label key={index} className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={selectedCapacity.includes(capacity)}
              onChange={() => handleCapacityChange(capacity)}
            />
            {capacity} <span className={styles.count}>({Math.floor(Math.random() * 20) + 10})</span>
          </label>
        ))}
      </div>

      {/* Price Section */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Price</h4>
        <input
          type="range"
          className={styles.priceRange}
          min={0}
          max={500}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <p className={styles.priceLabel}>Max. ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FilterSidebar;
