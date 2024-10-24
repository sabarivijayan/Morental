"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import CarCard from "../car-display/car-card/car-card";
import styles from "./car-display.module.css";
import { GET_AVAILABLE_CARS, GET_RENTABLE_CARS } from "@/graphql/queries/booking-cars";
import { Spin, Alert } from "antd";
import { RentableCar } from "@/interfaces/cars";
import { useRouter } from "next/navigation";

const CarDisplay = ({ filters, pickUpDate, dropOffDate }: { filters: any, pickUpDate: string, dropOffDate: string }) => {
  // Determine which query to use based on the presence of filters or dates
  const shouldUseAvailableCarsQuery = pickUpDate || dropOffDate || filters.searchQuery || filters.transmissionType.length || filters.fuelType.length || filters.numberOfSeats.length;

  const { loading, error, data } = useQuery(
    shouldUseAvailableCarsQuery ? GET_AVAILABLE_CARS : GET_RENTABLE_CARS,
    {
      variables: shouldUseAvailableCarsQuery
        ? {
            pickUpDate: pickUpDate || "default-pickup-date", // Default or selected pick-up date
            dropOffDate: dropOffDate || "default-dropoff-date", // Default or selected drop-off date
            query: filters.searchQuery,
            transmissionType: filters.transmissionType,
            fuelType: filters.fuelType,
            numberOfSeats: filters.numberOfSeats,
            priceSort: filters.priceSort,
          }
        : {},
    }
  );

  const router = useRouter();

  if (loading) return <Spin tip="Loading cars..." />;
  if (error) return <Alert message="Error loading cars" type="error" />;

  // Use correct data source based on query
  const rentableCars: RentableCar[] = data?.getAvailableCars?.data || data?.getRentableCars || [];

  const handleRentNowClick = (carId: string) => {
    router.push(`/car-detail/${carId}`);
  };

  // Render car cards in grid
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
      <div className={styles.carGrid}>{renderCarCardsInGrid}</div>
    </div>
  );
};

export default CarDisplay;
