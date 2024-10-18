import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_RENTABLE_CAR_WITH_ID } from "@/graphql/queries/booking-cars";
import { GENERATE_PAYMENT_ORDER, VERIFY_PAYMENT_AND_CREATE_BOOKING } from "@/graphql/mutations/booking-cars";
import { FETCH_USER } from "@/graphql/queries/auth"; // Import your query here
import BillingInfoForm from "../components/billing-info/billing-info";
import Confirmation from "../components/confirmation-info/confirmation-info";
import PaymentForm from "../components/payment-info/payment-info";
import RentalInfoForm from "../components/rental-info/rental-info";
import RentalSummary from "../components/summary-info/summary-info";
import styles from "./billing-detail.module.css";
import { CarData } from "@/interfaces/cars";
import Cookies from "js-cookie";


const BillingDetailPage = () => {
  const [rentalDays, setRentalDays] = useState(1);
  const { id } = useParams();
  const router = useRouter();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [isBillingInfoComplete, setBillingInfoComplete] = useState(false);
  const [isRentalInfoComplete, setRentalInfoComplete] = useState(false);
  const [isPaymentInfoComplete, setPaymentInfoComplete] = useState(false);
  const [isConfirmationComplete, setConfirmationComplete] = useState(false);

  useEffect(() => {
    // Check if token exists in cookies
    const token = Cookies.get("token"); // Assuming the token is stored under "token"

    if (!token) {
      // If no token is found, redirect to login
      router.push("/registration");
    }
  }, [router]);
  // Fetch user data
  const { data: userData, loading: userLoading } = useQuery(FETCH_USER);
  const userInfo = userData?.fetchUser?.data;

  const handleInputChange = (field: string, isValid: boolean) => {
    switch (field) {
      case "billingInfo":
        setBillingInfoComplete(isValid);
        break;
      case "rentalInfo":
        setRentalInfoComplete(isValid);
        break;
      case "paymentMethod":
        setPaymentInfoComplete(isValid);
        break;
      case "confirmation":
        setConfirmationComplete(isValid);
        break;
    }
  };

  const isFormComplete = isBillingInfoComplete && isRentalInfoComplete && isPaymentInfoComplete && isConfirmationComplete;

  const { data, loading, error } = useQuery(GET_RENTABLE_CAR_WITH_ID, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (data) {
      setCarData(data.getRentableCarsWithId);
    }
  }, [data]);

  const [generatePaymentOrder] = useMutation(GENERATE_PAYMENT_ORDER);
  const [verifyPaymentAndCreateBooking] = useMutation(VERIFY_PAYMENT_AND_CREATE_BOOKING);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRentNow = async () => {
    if (!isFormComplete || !carData || !userInfo) return;

    try {
      // Step 1: Ensure Razorpay script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        return;
      }

      // Step 2: Generate payment order
      const totalPrice = carData.pricePerDay * rentalDays;
      const { data: paymentData } = await generatePaymentOrder({
        variables: {
          totalPrice,
          bookingInput: {
            carId: carData.car.id,
            pickUpDate: new Date().toISOString(),
            dropOffDate: new Date().toISOString(),
            totalPrice,
            userInfo: `${userInfo.firstName} ${userInfo.lastName}`
          },
        },
      });

      const { razorpayOrderId, currency } = paymentData.generatePaymentOrder;

      // Step 3: Initialize Razorpay
      const options = {
        key: "rzp_test_Zil1iQWrfDtlkH",
        amount: totalPrice * 100,
        currency,
        order_id: razorpayOrderId,
        name: "Car Rental",
        description: "Payment for car rental",
        handler: async function (response: any) {
          // Step 4: Verify payment and create booking
          const { data: verifyData } = await verifyPaymentAndCreateBooking({
            variables: {
              paymentDetails: {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              bookingInput: {
                carId: carData.car.id,
                pickUpDate: new Date().toISOString(),
                dropOffDate: new Date().toISOString(),
                totalPrice,
                userInfo: `${userInfo.firstName} ${userInfo.lastName}`
              },
            },
          });

          if (verifyData.verifyPaymentAndCreateBooking.status === "success") {
            router.push("/user-dashboard");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: `${userInfo.firstName} ${userInfo.lastName}`,
          email: userInfo.email,
          contact: userInfo.phoneNumber,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment processing failed. Please try again.");
    }
  };

  if (loading || userLoading) return <p>Loading details...</p>;
  if (error) return <p>Error loading car details: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <BillingInfoForm onInputChange={handleInputChange} prefillData={userInfo} />
        <RentalInfoForm onInputChange={handleInputChange} setRentalDays={setRentalDays} />
        <PaymentForm onInputChange={handleInputChange} />
        <Confirmation onInputChange={handleInputChange} />
      </div>
      <div className={styles.rightColumn}>
        {carData && <RentalSummary carData={carData} rentalDays={rentalDays} />}
        <div className={styles.rentButtonContainer}>
          <button className={styles.rentButton} disabled={!isFormComplete} onClick={handleRentNow}>
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingDetailPage;
