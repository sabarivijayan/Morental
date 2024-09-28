import Image from 'next/image';
import styles from './rental-details.module.css';
import { RentalDetailsProps } from '@/interfaces/bookings';

export default function RentalDetails({ bookings }: RentalDetailsProps) {
  return (
    <>
      {bookings.map((booking) => (
        <div key={booking.id} className={styles.rentalContainer}>
          {/* Header */}
          <div className={styles.rentalHeader}>
            <h2 className={styles.rentalTitle}>Details Rental</h2>
            <span>#{booking.id}</span>
          </div>

          {/* Car Info */}
          <div className={styles.carInfo}>
            <Image
              src="/images/View.svg"
              alt={booking.carModel}
              width={100}
              height={60}
              className={styles.carImage}
            />
            <div className={styles.carDetails}>
              <span className={styles.carModel}>{booking.carModel}</span>
              <span className={styles.carType}>{booking.carType}</span>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Pick-Up Section */}
          <div className={styles.pickUpDropOffContainer}>
            <div className={styles.pickUpDropOff}>
              <div className={styles.circleContainer}>
                <div className={styles.bigCircle}></div>
                <div className={styles.smallCircle}></div>
              </div>
              <div className={styles.detailsTextContainer}>
                <span className={styles.detailsText}>Pick-Up</span>
              </div>
            </div>

            <div className={styles.pickDropRow}>
              <div className={styles.pickDropColumn}>
                <span className={styles.subText}>Location</span>
                <span className={styles.subText}>{booking.pickUpLocation}</span>
              </div>
              <div className={styles.verticalDivider}></div>
              <div className={styles.pickDropColumn}>
                <span className={styles.subText}>Date</span>
                <span className={styles.subText}>{booking.pickUpDate}</span>
              </div>
              <div className={styles.verticalDivider}></div>
              <div className={styles.pickDropColumn}>
                <span className={styles.subText}>Time</span>
                <span className={styles.subText}>{booking.pickUpTime}</span>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Drop-Off Section */}
            <div className={styles.pickUpDropOff}>
              <div className={styles.circleContainer}>
                <div className={styles.bigCircle}></div>
                <div className={styles.smallCircle}></div>
              </div>
              <div className={styles.detailsTextContainer}>
                <span className={styles.detailsText}>Drop-Off</span>
              </div>
            </div>

            <div className={styles.pickDropRow}>
              <div className={styles.pickDropColumn}>
                <span className={styles.subText}>Location</span>
                <span className={styles.subText}>{booking.dropOffLocation}</span>
              </div>
              <div className={styles.verticalDivider}></div>
              <div className={styles.pickDropColumn}>
                <span className={styles.subText}>Date</span>
                <span className={styles.subText}>{booking.dropOffDate}</span>
              </div>
              <div className={styles.verticalDivider}></div>
              <div className={styles.pickDropColumn}>
                <span className={styles.subText}>Time</span>
                <span className={styles.subText}>{booking.dropOffTime}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Rental Price */}
          <div className={styles.rentalPrice}>
            <div>
              <span>Total Rental Price</span>
              <p className={styles.priceSubText}>Overall price and includes rental discount</p>
            </div>
            <span className={styles.priceText}>${booking.price}</span>
          </div>
        </div>
      ))}
    </>
  );
}
