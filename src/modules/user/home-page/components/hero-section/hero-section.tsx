"use client"
import React from 'react';
import Image from 'next/image';
import styles from './hero-section.module.css';

const Hero: React.FC = () => {
    return (
        <section className={styles.heroSection}>
            <div className={`${styles.card} ${styles.cardOne}`}>
                <div className={styles.cardContent}>
                    <h2 className={styles.title}>The Best Platform <br/> for Car Rental</h2>
                    <p className={styles.description}>
                        Ease of doing a car rental safely and <br/> reliably. Of course at a low price.
                    </p>
                    <button className={`${styles.rentButton} ${styles.button1}`}>Rental Car</button>
                </div>
                <div className={styles.carImageWrapper}>
                    <Image
                        src="/image 7.svg"
                        alt="White Car"
                        width={400}
                        height={200}
                        className={styles.carImage}
                    />
                </div>
            </div>

            <div className={`${styles.card} ${styles.cardTwo}`}>
                <div className={styles.cardContent}>
                    <h2 className={styles.title}>Easy way to rent a <br/> car at a low price</h2>
                    <p className={styles.description}>
                        Providing cheap car rental services<br/> and safe and comfortable facilities.
                    </p>
                    <button className={`${styles.rentButton} ${styles.button2}`}>Rental Car</button>
                </div>
                <div className={styles.carImageWrapper}>
                    <Image
                        src="/image 8.svg"
                        alt="Black Car"
                        width={400}
                        height={200}
                        className={styles.carImage}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
