"use client";
import styles from "./billing-info.module.css";

const BillingInfoForm: React.FC = () => {
  return (
    <div className={styles.billingFormContainer}>
      <div className={styles.header}>
        <h2>Billing Info</h2>
        <p className={styles.stepInfo}>Step 1 of 4</p>
      </div>
      <p className={styles.subHeading}>Please enter your billing info</p>
      
      {/* Form starts here */}
      <form className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your name" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" placeholder="Phone number" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="Address" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="city">Town / City</label>
          <input type="text" id="city" placeholder="Town or city" />
        </div>
      </form>
    </div>
  );
};

export default BillingInfoForm;
