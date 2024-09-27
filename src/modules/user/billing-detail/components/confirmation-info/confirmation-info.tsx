import React, { useState } from "react";
import styles from "./confirmation-info.module.css";
import Image from "next/image";
const Confirmation = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };

  return (
    <div className={styles.confirmationContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Confirmation</h2>
        <span className={styles.stepInfo}>Step 4 of 4</span>
      </div>

      <p className={styles.subtitle}>
        We are getting to the end. Just a few clicks and your rental is ready!
      </p>

      {/* Terms & Conditions */}
      <div className={styles.terms}>
        <input
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={handleAgreeChange}
          className={styles.checkbox}
        />
        <label htmlFor="terms" className={styles.termsLabel}>
          I agree with our terms and conditions and privacy policy.
        </label>
      </div>

      {/* Rent Now Button */}
      <button className={styles.rentButton} disabled={!agreed}>
        Rent Now
      </button>

      {/* Security Notice */}
      <div className={styles.securityNotice}>
        <Image
          src="/icons/Layer.svg"
          alt="Security"
          width={30}
          height={30}
          className={styles.securityIcon}
        />
        <div>
          <p className={styles.securityText}>All your data are safe</p>
          <p className={styles.securitySubtext}>
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
