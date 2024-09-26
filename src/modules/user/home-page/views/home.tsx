import React from 'react';
import styles from './home.module.css'
import Hero from '../components/hero-section/hero-section';
import PickupForm from '../components/location-selector/location-selector';
import CarDisplay from '../components/car-display/car-display';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <PickupForm/>
      <CarDisplay/>
    </div>
  )
}

export default HomePage;