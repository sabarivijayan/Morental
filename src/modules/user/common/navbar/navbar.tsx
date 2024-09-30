"use client"
import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    
    const router = useRouter();

    const handleSignUp = () => {
        // Navigate to signup page
        router.push('/registration');
    };
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo} onClick={() => router.push('/')}>MORENT</div>

            <div className={styles.searchContainer}>
                {/* Search Icon */}
                <Image src="/icons/search-normal.svg" alt="Search" className={styles.searchIcon} width={20} height={20} />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search something here"
                />
                <button className={styles.filterButton}>
                    <Image src="/icons/filter.svg" alt="Filter" width={24} height={24} className={styles.filterIcon} />
                </button>
            </div>

            <div className={styles.actions}>
                <button className={styles.settingsButton} onClick={() => router.push('/user-dashboard')}>
                    <Image src="/icons/setting-2.svg" alt="Settings" className={styles.settingsIcon} width={20} height={20} />
                </button>
                <button className={styles.signupButton} onClick={handleSignUp}>Sign up</button>
            </div>
        </nav>
    );
};

export default Navbar;
