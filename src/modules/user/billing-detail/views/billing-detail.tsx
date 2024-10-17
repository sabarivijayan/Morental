import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation"; // Now using useParams
import { useEffect, useState } from "react";
import { GET_RENTABLE_CAR_WITH_ID } from "@/graphql/queries/booking-cars";
import BillingInfoForm from "../components/billing-info/billing-info";
import Confirmation from "../components/confirmation-info/confirmation-info";
import PaymentForm from "../components/payment-info/payment-info";
import RentalInfoForm from "../components/rental-info/rental-info";
import RentalSummary from "../components/summary-info/summary-info";
import styles from "./billing-detail.module.css";
import { CarData } from "@/interfaces/cars";


const BillingDetailPage = () => {
  const { id } = useParams(); // Extract car ID from URL params
  const [carData, setCarData] = useState<CarData | null>(null);

  const { data, loading, error } = useQuery(GET_RENTABLE_CAR_WITH_ID, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (data) {
      setCarData(data.getRentableCarsWithId);
    }
  }, [data]);

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>Error loading car details: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <BillingInfoForm />
        <RentalInfoForm />
        <PaymentForm />
        <Confirmation />
      </div>
      <div className={styles.rightColumn}>
        {carData && <RentalSummary carData={carData} />}
      </div>
    </div>
  );
};

export default BillingDetailPage;
