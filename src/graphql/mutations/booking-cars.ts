// graphql/vehicles.js
import { gql } from "@apollo/client";
// Mutations

export const ADD_CAR_TO_TYPESENSE = gql`
  mutation AddCarToTypesense($car: CarInput!) {
    addCarToTypesense(car: $car)
  }
`;

export const GENERATE_PAYMENT_ORDER = gql`
  mutation GeneratePaymentOrder($totalPrice: Float!, $bookingInput: GenerateBookingInput!) {
    generatePaymentOrder(totalPrice: $totalPrice, bookingInput: $bookingInput) {
      state
      message
      razorpayOrderId
      amount
      currency
    }
  }
`;

export const VERIFY_PAYMENT_AND_CREATE_BOOKING = gql`
  mutation VerifyPaymentAndCreateBooking($paymentDetails: PaymentInput!, $bookingInput: GenerateBookingInput!) {
    verifyPaymentAndCreateBooking(paymentDetails: $paymentDetails, bookingInput: $bookingInput) {
      status
      message
      data {
        id
        carId
        userId
        pickUpDate
        dropOffDate
        totalPrice
        status
        createdAt
        updatedAt
      }
    }
  }
`;
