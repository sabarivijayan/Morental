import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js for optimized image loading
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.mainMenu}>
        <h3 className={styles.menuHeader}>MAIN MENU</h3>
        <ul className={styles.menuList}>
          <li className={`${styles.menuItem} ${styles.active}`}>
            <span className={styles.icon}>
              <Image src="/icons/home.svg" alt="Dashboard Icon" width={20} height={20} />
            </span>
            <span>Dashboard</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <Image src="/icons/car.svg" alt="Add Cars Icon" width={20} height={20} />
            </span>
            <span>Add Cars</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <Image src="/icons/building.svg" alt="Manufacturer Icon" width={20} height={20} />
            </span>
            <span>Add Manufacturer</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <Image src="/icons/driving.svg" alt="Rentable Cars Icon" width={20} height={20} />
            </span>
            <span>Add Rentable Cars</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <Image src="/icons/smart-car.svg" alt="Booked Cars Icon" width={20} height={20} />
            </span>
            <span>Booked Cars</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <Image src="/icons/location.svg" alt="Locations Icon" width={20} height={20} />
            </span>
            <span>Locations</span>
          </li>
        </ul>
      </div>
      <div className={styles.logout}>
        <span className={styles.icon}>
          <Image src="/icons/logout.svg" alt="Log Out Icon" width={20} height={20} />
        </span>
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
