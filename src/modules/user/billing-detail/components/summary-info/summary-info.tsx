import Image from 'next/image';
import styles from './summary-info.module.css';

const RentalSummary = () => {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.title}>Rental Summary</h2>
      <p className={styles.description}>
        Prices may change depending on the length of the rental and the price of your rental car.
      </p>
      <div className={styles.carInfo}>
        <Image 
          src="/images/View.svg" 
          alt="Nissan GT - R" 
          width={132}
          height={108}
          className={styles.carImage} 
        />
        <div className={styles.carDetails}>
          <h3 className={styles.carName}>Nissan GT – R</h3>
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★☆</span>
            <span className={styles.reviews}>440+ Reviewer</span>
          </div>
        </div>
      </div>
      <div className={styles.pricing}>
        <div className={styles.priceRow}>
          <span>Subtotal</span>
          <span>$80.00</span>
        </div>
        <div className={styles.priceRow}>
          <span>Tax</span>
          <span>$0</span>
        </div>
      </div>
      <div className={styles.promoSection}>
        <input
          type="text"
          placeholder="Apply promo code"
          className={styles.promoInput}
        />
        <button className={styles.applyButton}>Apply now</button>
      </div>
      <div className={styles.totalPrice}>
        <span>Total Rental Price</span>
        <span className={styles.price}>$80.00</span>
      </div>
      <p className={styles.footerText}>
        Overall price and includes rental discount
      </p>
    </div>
  );
};

export default RentalSummary;
