"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./location-selector.module.css";
import arrowIcon from "/public/arrow-down.svg"; // Path to the SVG in the public folder

const PickupForm: React.FC = () => {
  // State for pickup and drop-off fields
  const [pickupCity, setPickupCity] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const [dropOffCity, setDropOffCity] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // List of cities in Kerala
  const cities = ["Kochi", "Trivandrum", "Kozhikode", "Thrissur", "Alappuzha"];

  // Handle Swap
  const handleSwap = () => {
    // Check if all fields are filled
    if (pickupCity && pickupDate && pickupTime && dropOffCity && dropOffDate && dropOffTime) {
      // Swap logic
      setPickupCity(dropOffCity);
      setPickupDate(dropOffDate);
      setPickupTime(dropOffTime);

      setDropOffCity(pickupCity);
      setDropOffDate(pickupDate);
      setDropOffTime(pickupTime);
    } else {
      alert("Please fill all fields before swapping.");
    }
  };

  // Ensure drop-off date is not before pickup date
  useEffect(() => {
    if (pickupDate && dropOffDate && dropOffDate < pickupDate) {
      setDropOffDate(pickupDate); // Adjust drop-off date to match pickup date if needed
    }
  }, [pickupDate, dropOffDate]);

  return (
    <div className={styles.container}>
      {/* Pick-Up Section */}
      <div className={styles.formGroup}>
        <div className={styles.section}>
          <div className={styles.labelContainer}>
            <div className={styles.radioIndicator} />
            <div className={styles.radioIndicator2} />
            <label className={styles.boldText}>Pick - Up</label>
          </div>

          <div className={styles.formFields}>
            {/* Locations Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Locations</label>
              <select
                className={styles.input}
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Date Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Date</label>
              <div className={styles.inputWithIcon}>
                <input
                  className={styles.input}
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={today} // Prevent dates before today
                />
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Time Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Time</label>
              <input
                className={styles.input}
                type="time"
                step={1800}
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <button className={styles.swapButton} onClick={handleSwap}>
        <Image src="/icons/Swap.svg" alt="Swap Arrows" width={24} height={24} />
      </button>

      {/* Drop-Off Section */}
      <div className={styles.formGroup}>
        <div className={styles.section}>
          <div className={styles.labelContainer}>
            <div className={styles.radioIndicator} />
            <div className={styles.radioIndicator2} />
            <label className={styles.boldText}>Drop - Off</label>
          </div>

          <div className={styles.formFields}>
            {/* Locations Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Locations</label>
              <select
                className={styles.input}
                value={dropOffCity}
                onChange={(e) => setDropOffCity(e.target.value)}
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Date Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Date</label>
              <div className={styles.inputWithIcon}>
                <input
                  className={styles.input}
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  min={pickupDate || today} // Drop-off cannot be earlier than pickup date
                />
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Time Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Time</label>
              <input
                className={styles.input}
                type="time"
                step={1800}
                value={dropOffTime}
                onChange={(e) => setDropOffTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupForm;
