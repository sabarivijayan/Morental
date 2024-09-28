// src/types/bookings.ts

export interface Booking {
    id: string;
    carModel: string;
    carType: string;
    pickUpLocation: string;
    pickUpDate: string;
    pickUpTime: string;
    dropOffLocation: string;
    dropOffDate: string;
    dropOffTime: string;
    price: string;
  }
  
  export interface RentalDetailsProps {
    bookings: Booking[];
  }
  