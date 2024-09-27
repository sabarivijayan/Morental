"use client";
import FilterSidebar from "@/modules/user/all-cars/components/sidebar/sidebar";
import styles from "./all-cars.module.css"; // Import the styles for layout
import PickupForm from "@/modules/user/all-cars/components/location-selector/location-selector";
import CarDisplay from "@/modules/user/all-cars/components/car-display/car-display";

const AllCarsComponent = () => {
  return (
    <div className={styles.allCarsContainer}>
      {/* Sidebar on the left */}
      <div className={styles.sidebarContainer}>
        <FilterSidebar />
      </div>

      {/* Right side: form and car display */}
      <div className={styles.mainContent}>
        <div className={styles.pickupForm}>
          <PickupForm />
        </div>
        <div className={styles.carGridContainer}>
          <CarDisplay />
        </div>
      </div>
    </div>
  );
};

export default AllCarsComponent;