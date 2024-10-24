import Image from "next/image";
import styles from "./summary-info.module.css";
import { RentalSummaryProps } from "@/interfaces/cars";

const RentalSummary: React.FC<RentalSummaryProps> = ({
  carData,
  rentalDays,
}) => {
  if (!carData) return <p>Loading car summary...</p>;

  const totalPrice = carData.pricePerDay * rentalDays; // Calculate total price

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.title}>Rental Summary</h2>
      <p className={styles.description}>
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
      <div className={styles.carInfo}>
        <Image
          src={carData.car.primaryImageUrl}
          alt={carData.car.name}
          width={132}
          height={108}
          className={styles.carImage}
        />
        <div className={styles.carDetails}>
          <h3 className={styles.carName}>{carData.car.name}</h3>
          
        </div>
      </div>
      <div className={styles.pricing}>
        <div className={styles.priceRow}>
          <span>Subtotal</span>
          <span>${carData.pricePerDay}/day</span>
        </div>
        <div className={styles.priceRow}>
          <span>Tax</span>
          <span>$0</span>
        </div>
      </div>
      
      <div className={styles.totalPrice}>
        <span>Total Rental Price</span>
        <span className={styles.price}>${totalPrice}</span>
      </div>
      <p className={styles.footerText}>
        Overall price and includes rental discount
      </p>
    </div>
  );
};

export default RentalSummary;
