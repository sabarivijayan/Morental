import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_RENTABLE_CAR_WITH_ID } from "@/graphql/queries/booking-cars";
import { GENERATE_PAYMENT_ORDER, VERIFY_PAYMENT_AND_CREATE_BOOKING } from "@/graphql/mutations/booking-cars";
import { FETCH_USER } from "@/graphql/queries/auth";
import BillingInfoForm from "../components/billing-info/billing-info";
import Confirmation from "../components/confirmation-info/confirmation-info";
import PaymentForm from "../components/payment-info/payment-info";
import RentalInfoForm from "../components/rental-info/rental-info";
import RentalSummary from "../components/summary-info/summary-info";
import styles from "./billing-detail.module.css";
import { CarData } from "@/interfaces/cars";
import Cookies from "js-cookie";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";


const BillingDetailPage = () => {
  const [rentalDays, setRentalDays] = useState(1);
  const { id } = useParams();
  const router = useRouter();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [isBillingInfoComplete, setBillingInfoComplete] = useState(false);
  const [isRentalInfoComplete, setRentalInfoComplete] = useState(false);
  const [isPaymentInfoComplete, setPaymentInfoComplete] = useState(false);
  const [isConfirmationComplete, setConfirmationComplete] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  const [rentalInfo, setRentalInfo] = useState({
    pickUpDate: new Date(),
    pickUpTime: '',
    dropOffDate: new Date(),
    dropOffTime: '',
    pickUpLocation: '',
    dropOffLocation: ''
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/registration");
    }
  }, [router]);

  const { data: userData, loading: userLoading } = useQuery(FETCH_USER);
  const userInfo = userData?.fetchUser?.data;

  const handleInputChange = (field: string, isValid: boolean, data?: any) => {
    switch (field) {
      case "billingInfo":
        setBillingInfoComplete(isValid);
        if (data) {
          setBillingInfo(data);
        }
        break;
      case "rentalInfo":
        setRentalInfoComplete(isValid);
        if (data) {
          setRentalInfo(data);
        }
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
    const audio = new Audio("/car-rev.mp3");
    audio.play();

    if (!isFormComplete || !carData || !userInfo) return;

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        Swal.fire({
          icon: "error",
          title: "SDK Load Failure",
          text: "Failed to load Razorpay SDK. Please check your internet connection.",
        });
        return;
      }

      const totalPrice = carData.pricePerDay * rentalDays;
      const { data: paymentData } = await generatePaymentOrder({
        variables: {
          totalPrice,
          bookingInput: {
            rentableId: parseInt(id,10),
            carId: parseInt(carData.car.id,10),
            pickUpDate: rentalInfo.pickUpDate.toISOString(),
            pickUpTime: rentalInfo.pickUpTime,
            dropOffDate: rentalInfo.dropOffDate.toISOString(),
            dropOffTime: rentalInfo.dropOffTime,
            pickUpLocation: rentalInfo.pickUpLocation,
            dropOffLocation: rentalInfo.dropOffLocation,
            totalPrice,
            userInfo: `${billingInfo.firstName} ${billingInfo.lastName}`,
            phoneNumber: billingInfo.phoneNumber,
            address: billingInfo.address,
          },
        },
      });

      const { razorpayOrderId, currency } = paymentData.generatePaymentOrder;

      const options = {
        key: "rzp_test_Zil1iQWrfDtlkH",
        amount: totalPrice * 100,
        currency,
        order_id: razorpayOrderId,
        name: "Car Rental",
        description: "Payment for car rental",
        handler: async function (response: any) {
          try {
            const { data: verifyData } = await verifyPaymentAndCreateBooking({
              variables: {
                paymentDetails: {
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
                bookingInput: {
                  carId: parseInt(carData.car.id,10),
                  rentableId: parseInt(id,10),
                  pickUpDate: rentalInfo.pickUpDate.toISOString(),
                  pickUpTime: rentalInfo.pickUpTime,
                  dropOffDate: rentalInfo.dropOffDate.toISOString(),
                  dropOffTime: rentalInfo.dropOffTime,
                  pickUpLocation: rentalInfo.pickUpLocation,
                  dropOffLocation: rentalInfo.dropOffLocation,
                  totalPrice,
                  userInfo: `${billingInfo.firstName} ${billingInfo.lastName}`,
                  phoneNumber: billingInfo.phoneNumber,
                  address: billingInfo.address,
                },
              },
            });
  
            if (verifyData.verifyPaymentAndCreateBooking.status === "success") {
              // Confetti effect for successful payment
              const successAudio = new Audio("/success.mp3");
              successAudio.play();
              confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
              });
  
              router.push("/user-dashboard");
          } else {
            throw new Error("Payment verification failed");
          }
        } catch (error: any) {
          if (error.message.includes("")) {
            Swal.fire({
              icon: "error",
              title: "Car Unavailable",
              text: "The car is not available for the selected dates. Please try other dates or cars.",
            });
          } else {
            const errorAudio = new Audio("/error-sound.mp3");
            errorAudio.play();
            Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: "Payment verification failed. Please try again.",
            });
          }
        }
      },
        prefill: {
          name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          email: userInfo.email,
          contact: billingInfo.phoneNumber,
        },
        theme: {
          color: "#3563E9",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire({
        icon: "error",
        title: "Car Unavailable",
        text: "The car is not available for the selected dates. Please try other dates or cars.",
      });
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