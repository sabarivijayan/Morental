"use client"

import React, {useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_AVAILABLE_CARS } from '@/graphql/queries/booking-cars'
import CarCard from '../home-page/components/car-display/car-card/car-card'
import styles from './available-cars.module.css'
