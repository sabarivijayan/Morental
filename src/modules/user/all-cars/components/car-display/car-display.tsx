"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import CarCard from "../car-display/car-card/car-card";
import styles from "./car-display.module.css";
import { GET_RENTABLE_CARS } from "@/graphql/queries/booking-cars";
import { Spin, Alert } from "antd";
import { RentableCar } from "@/interfaces/cars";
import { useRouter } from "next/navigation";

const CarDisplay = () => {
  const { loading, error, data } = useQuery(GET_RENTABLE_CARS);
  const router = useRouter();

  if (loading) return <Spin tip="Loading cars..." />;
  if (error) return <Alert message="Error loading cars" type="error" />;

  const rentableCars: RentableCar[] = data?.getRentableCars || [];

  // Handler for "Rent Now" click
  const handleRentNowClick = (carId: string) => {
    router.push(`/car-detail/${carId}`);
  };

  // Render car cards in grid layout
  const renderCarCardsInGrid = rentableCars.map((rentableCar: RentableCar) => (
    <div key={rentableCar.id} className={styles.carItem}>
      <CarCard
        title={rentableCar.car.name}
        category={rentableCar.car.type}
        imageUrl={rentableCar.car.primaryImageUrl}
        fuelCapacity={rentableCar.car.fuelType}
        transmission={rentableCar.car.transmissionType}
        capacity={rentableCar.car.numberOfSeats}
        price={`$${rentableCar.pricePerDay}`}
        onRentNow={() => handleRentNowClick(rentableCar.id)}
      />
    </div>
  ));

  return (
    <div className={styles.homeContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>Available Cars</h2>
      </div>

      {/* Grid layout for car cards */}
      <div className={styles.carGrid}>{renderCarCardsInGrid}</div>
    </div>
  );
};

export default CarDisplay;
