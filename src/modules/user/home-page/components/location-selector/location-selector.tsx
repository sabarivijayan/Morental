"use client";
import React from "react";
import Image from "next/image";
import styles from "./location-selector.module.css";
import arrowIcon from "/public/arrow-down.svg"; // Path to the SVG in the public folder

const PickupForm: React.FC = () => {
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
              <select className={styles.input}>
                <option>Select your city</option>
              </select>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Date Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Date</label>
              <div className={styles.inputWithIcon}>
                <input className={styles.input} type="date" />
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Time Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Time</label>
              <input className={styles.input} type="time" step={1800} />
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <button className={styles.swapButton}>
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
              <select className={styles.input}>
                <option>Select your city</option>
              </select>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Date Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Date</label>
              <div className={styles.inputWithIcon}>
                <input className={styles.input} type="date" />
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Time Field */}
            <div className={styles.field}>
              <label className={styles.boldText}>Time</label>
              <input className={styles.input} type="time" step={1800} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupForm;
