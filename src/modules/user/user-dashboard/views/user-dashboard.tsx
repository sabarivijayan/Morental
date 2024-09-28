import React from "react";
import ProfilePage from "../components/profile-section/profile-section";
import RentalDetails from "../components/rental-details/rental-details";
import { bookings } from "../../../../../public/data/booking-data";
import styles from "./user-dashboard.module.css"

const DashboardPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.profileContainer}>
        <ProfilePage />
      </div>
      <div className={styles.rentalContainer}>
        <RentalDetails bookings={bookings} />
      </div>
    </div>
  );
};

export default DashboardPage;
