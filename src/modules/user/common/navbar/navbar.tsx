"use client";
import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/client';
import { FETCH_USER } from '@/graphql/queries/auth';

const Navbar: React.FC = () => {
  const router = useRouter();
  
  const [token, setToken] = useState<string | null>(Cookies.get('token') ?? null); // Track token in state
  const { data: userData, refetch } = useQuery(FETCH_USER, {
    skip: !token, // Skip fetching if no token is present (not logged in)
  });

  const [showDropdown, setShowDropdown] = useState(false);

  // Effect to listen for token changes (both login and logout)
  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get('token') ?? null;
      if (newToken !== token) {
        setToken(newToken); // Update token state when it changes
        if (newToken) {
          refetch(); // Refetch user data after login
        }
      }
    }, 500); // Check for token change every 500ms

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [token, refetch]);

  useEffect(() => {
    if (!token) {
      setShowDropdown(false); // Close dropdown when logged out
    }
  }, [token]);

  const handleLogout = () => {
    Cookies.remove('token'); // Clear the token from cookies
    setToken(null); // Update state to reflect logout
    router.push('/'); // Redirect to home page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => router.push('/')}>MORENT</div>

      <div className={styles.searchContainer}>
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
        {token ? (
          <div className={styles.profileContainer}>
            <Image
              src={userData?.fetchUser?.data?.profileImage || '/default-profile.png'}
              alt="User Profile"
              className={styles.profileIcon}
              width={40}
              height={40}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <button onClick={() => router.push('/user-dashboard')}>User Dashboard</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className={styles.signupButton} onClick={() => router.push('/registration')}>Sign up</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
