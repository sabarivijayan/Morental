import React from 'react';
import styles from './rental-info.module.css';

const RentalInfoForm = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.rentalInfoContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <h2>Rental Info</h2>
        <p className={styles.stepInfo}>Step 2 of 4</p>
      </div>
      <p className={styles.subHeading}>Please select your rental date</p>

      {/* Pickup and Drop-off Section */}
      <div className={styles.section}>
        {/* Pick-up Section */}
        <div className={styles.pickUpDropOffContainer}>
          <div className={styles.circleWrapper}>
            <div className={styles.outerCircle}>
              <div className={styles.innerCircle}></div>
            </div>
          </div>
          <span className={styles.label}>Pick – Up</span>
        </div>

        <div className={styles.fields}>
          {/* Pick-up Location */}
          <div className={styles.fieldGroup}>
            <label htmlFor="pickupLocation">Locations</label>
            <select id="pickupLocation">
              <option>Select your city</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
            </select>
          </div>

          {/* Pick-up Date */}
          <div className={styles.fieldGroup}>
            <label htmlFor="pickupDate">Date</label>
            <input type="date" id="pickupDate" min={today} />
          </div>

          {/* Pick-up Time */}
          <div className={styles.fieldGroup}>
            <label htmlFor="pickupTime">Time</label>
            <input type="time" id="pickupTime" />
          </div>
        </div>

        {/* Drop-off Section */}
        <div className={styles.pickUpDropOffContainer}>
          <div className={styles.circleWrapper}>
            <div className={styles.outerCircle}>
              <div className={styles.innerCircle}></div>
            </div>
          </div>
          <span className={styles.label}>Drop – Off</span>
        </div>

        <div className={styles.fields}>
          {/* Drop-off Location */}
          <div className={styles.fieldGroup}>
            <label htmlFor="dropoffLocation">Locations</label>
            <select id="dropoffLocation">
              <option>Select your city</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
            </select>
          </div>

          {/* Drop-off Date */}
          <div className={styles.fieldGroup}>
            <label htmlFor="dropoffDate">Date</label>
            <input type="date" id="dropoffDate" min={today} />
          </div>

          {/* Drop-off Time */}
          <div className={styles.fieldGroup}>
            <label htmlFor="dropoffTime">Time</label>
            <input type="time" id="dropoffTime" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalInfoForm;
