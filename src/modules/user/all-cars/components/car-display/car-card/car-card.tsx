import Image from 'next/image';
import styles from './car-card.module.css';
import { CarCardProps } from '../../../../../../interfaces/cars'; // Import the interface

const CarCard: React.FC<CarCardProps> = ({
    title,
    category,
    imageUrl,
    fuelCapacity,
    transmission,
    capacity,
    price,
}) => {
    return (
        <div className={styles.carCard}>
            <h3 className={styles.carTitle}>{title}</h3>
            <p className={styles.carCategory}>{category}</p>
            <Image src={imageUrl} alt={`${title} car`} width={304} height={144} className={styles.carImage} />
            
            <div className={styles.carInfo}>
                <div className={styles.infoItem}>
                    <Image src="/icons/gas-station.svg" alt="Fuel" width={16} height={16} />
                    <span>{fuelCapacity}</span>
                </div>
                <div className={styles.infoItem}>
                    <Image src="/icons/steering.svg" alt="Transmission" width={16} height={16} />
                    <span>{transmission}</span>
                </div>
                <div className={styles.infoItem}>
                    <Image src="/icons/profile-2user.svg" alt="Capacity" width={16} height={16} />
                    <span>{capacity}</span>
                </div>
            </div>

            <div className={styles.carPrice}>
                    <span>{price}</span>
                <small>/day</small>
            </div>

            <button className={styles.rentButton}>Rent Now</button>
        </div>
    );
};

export default CarCard;
