import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegistrationInput!) {
    registerUser(input: $input) {
      status
      message
      data {
        id
        firstName
        lastName
        phoneNumber
        email
        city
        state
        country
        pincode
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      status
      message
      token
      data {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;

export const SEND_OTP = gql`
  mutation SendOtp($phoneNumber: String!) {
    sendOTP(phoneNumber: $phoneNumber) {
      status
      message
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($phoneNumber: String!, $otp: String!) {
    verifyOTP(phoneNumber: $phoneNumber, otp: $otp) {
      status
      message
      token
      data {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;

export const UPDATE_PROFILE_IMAGE = gql`
  mutation UpdateProfileImage($userId: ID!, $profileImage: String) {
    updateProfileImage(userId: $userId, profileImage: $profileImage) {
      status
      message
      data {
        profileImage
      }
    }
  }
`;