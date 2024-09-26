"use client";
import { useState } from "react";
import styles from "./sidebar.module.css";
import { FiFilter } from "react-icons/fi"; // Importing a filter icon from react-icons
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon for the sidebar

const FilterSidebar = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Sport",
    "SUV",
  ]);
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>([
    "2 Person",
    "8 or More",
  ]);
  const [price, setPrice] = useState<number>(100);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // Sidebar open/close state

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity((prev) =>
      prev.includes(capacity)
        ? prev.filter((c) => c !== capacity)
        : [...prev, capacity]
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close sidebar
  };

  return (
    <>
      {/* Filter Icon for mobile */}
      <div className={styles.filterIcon} onClick={toggleSidebar}>
        <FiFilter size={24} />
      </div>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.active : styles.hidden
        }`}
        onClick={closeSidebar} // Allow closing the sidebar when clicking outside the close button.
      >
        {/* Close Button */}
        <button className={styles.closeButton} onClick={closeSidebar}>
          <AiOutlineClose size={24} />
        </button>

        {/* Prevent clicking inside the sidebar from closing it */}
        <div
          className={styles.sidebarContent}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Car Type Section */}
          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Type</h4>
            {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map(
              (type, index) => (
                <label key={index} className={styles.filterLabel}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  {type}{" "}
                  <span className={styles.count}>
                    ({Math.floor(Math.random() * 20) + 10})
                  </span>
                </label>
              )
            )}
          </div>

          {/* Capacity Section */}
          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Capacity</h4>
            {["2 Person", "4 Person", "6 Person", "8 or More"].map(
              (capacity, index) => (
                <label key={index} className={styles.filterLabel}>
                  <input
                    type="checkbox"
                    checked={selectedCapacity.includes(capacity)}
                    onChange={() => handleCapacityChange(capacity)}
                  />
                  {capacity}{" "}
                  <span className={styles.count}>
                    ({Math.floor(Math.random() * 20) + 10})
                  </span>
                </label>
              )
            )}
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
      </div>
    </>
  );
};

export default FilterSidebar;
