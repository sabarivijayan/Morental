import BillingInfoForm from "../components/billing-info/billing-info";
import Confirmation from "../components/confirmation-info/confirmation-info";
import PaymentForm from "../components/payment-info/payment-info";
import RentalInfoForm from "../components/rental-info/rental-info"; // New component
import RentalSummary from "../components/summary-info/summary-info";
import styles from "./billing-detail.module.css";  // Import the CSS module

const BillingDetailPage = () => {
  return (
    <div className={styles.container}>
      {/* Left Column for Forms */}
      <div className={styles.leftColumn}>
        <BillingInfoForm />
        <RentalInfoForm />
        <PaymentForm />
        <Confirmation />
      </div>

      {/* Right Column for Rental Summary */}
      <div className={styles.rightColumn}>
        <RentalSummary />
      </div>
    </div>
  );
};

export default BillingDetailPage;
