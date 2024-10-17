import React, { useEffect, useState } from "react";
import styles from "./rental-info.module.css";

interface RentalInfoFormProps {
  setRentalDays: (days: number) => void; // Function to pass rental days to the parent component
  onInputChange: (field: string, isValid: boolean) => void; // Callback for validation
}

const RentalInfoForm: React.FC<RentalInfoFormProps> = ({ setRentalDays, onInputChange }) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date

  // State for pickup and dropoff dates
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  useEffect(() => {
    // Validate both locations and dates
    const isFormValid =
      !!pickupLocation &&
      !!dropoffLocation &&
      !!pickupDate &&
      !!dropoffDate;

    onInputChange("rentalInfo", isFormValid);
  }, [pickupLocation, dropoffLocation, pickupDate, dropoffDate]);

  // Function to calculate the number of rental days based on pickup and dropoff dates
  const calculateRentalDays = (pickup: string, dropoff: string) => {
    const pickDate = new Date(pickup);
    const dropDate = new Date(dropoff);
    const days = Math.ceil((dropDate.getTime() - pickDate.getTime()) / (1000 * 3600 * 24)) + 1;

    setRentalDays(days);
  };

  // Handlers for date changes
  const handlePickupDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPickupDate = e.target.value;
    setPickupDate(newPickupDate);
    if (newPickupDate > dropoffDate) {
      setDropoffDate(newPickupDate); // Ensure drop-off date isn't earlier than pickup
    }
    calculateRentalDays(newPickupDate, dropoffDate);
  };

  const handleDropoffDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDropoffDate = e.target.value;
    setDropoffDate(newDropoffDate);
    if (newDropoffDate < pickupDate) {
      setPickupDate(newDropoffDate); // Ensure pickup date isn't later than drop-off
    }
    calculateRentalDays(pickupDate, newDropoffDate);
  };

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
            <select id="pickupLocation" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
              <option>Select your city</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
            </select>
          </div>

          {/* Pick-up Date */}
          <div className={styles.fieldGroup}>
            <label htmlFor="pickupDate">Pick-up Date:</label>
            <input
              type="date"
              id="pickupDate"
              min={today}
              value={pickupDate}
              onChange={handlePickupDateChange}
            />
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
            <select id="dropoffLocation" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)}>
              <option>Select your city</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
            </select>
          </div>

          {/* Drop-off Date */}
          <div className={styles.fieldGroup}>
            <label htmlFor="dropoffDate">Drop-off Date:</label>
            <input
              type="date"
              id="dropoffDate"
              min={pickupDate} // Ensure drop-off date is not earlier than pickup
              value={dropoffDate}
              onChange={handleDropoffDateChange}
            />
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
