import React, { useState } from 'react';
import styles from './payment-info.module.css';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className={styles.paymentContainer}>
      {/* Header with Step */}
      <div className={styles.header}>
        <h2 className={styles.title}>Payment Method</h2>
        <span className={styles.stepInfo}>Step 3 of 4</span>
      </div>
      <p className={styles.subtitle}>Please enter your payment method</p>

      <form className={styles.form}>
        {/* Razorpay Option */}
        <div className={styles.paymentOption}>
          <input
            type="radio"
            id="razorpay"
            name="paymentMethod"
            value="razorpay"
            checked={paymentMethod === 'razorpay'}
            onChange={handlePaymentChange}
            className={styles.radioInput}
          />
          <label htmlFor="razorpay" className={styles.radioLabel}>Razorpay</label>
        </div>

        {/* Stripe Option */}
        <div className={styles.paymentOption}>
          <input
            type="radio"
            id="stripe"
            name="paymentMethod"
            value="stripe"
            checked={paymentMethod === 'stripe'}
            onChange={handlePaymentChange}
            className={styles.radioInput}
          />
          <label htmlFor="stripe" className={styles.radioLabel}>Stripe</label>
        </div>

        {/* Card Logos */}
        {paymentMethod === 'stripe' && (
          <div className={styles.cardLogos}>
            <img src="/visa.png" alt="Visa" className={styles.cardLogo} />
            <img src="/mastercard.png" alt="MasterCard" className={styles.cardLogo} />
          </div>
        )}

        {/* Credit Card Form */}
        {paymentMethod === 'stripe' && (
          <div className={styles.cardDetails}>
            <div className={styles.cardRow}>
              <div className={styles.cardInputGroup}>
                <label htmlFor="cardNumber" className={styles.cardLabel}>Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="Card number"
                  className={styles.cardInput}
                />
              </div>

              <div className={styles.cardInputGroup}>
                <label htmlFor="expiryDate" className={styles.cardLabel}>Expiration Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="DD / MM / YY"
                  className={styles.cardInput}
                />
              </div>
            </div>

            <div className={styles.cardRow}>
              <div className={styles.cardInputGroup}>
                <label htmlFor="cardHolder" className={styles.cardLabel}>Card Holder</label>
                <input
                  type="text"
                  id="cardHolder"
                  placeholder="Card holder"
                  className={styles.cardInput}
                />
              </div>

              <div className={styles.cardInputGroup}>
                <label htmlFor="cvc" className={styles.cardLabel}>CVC</label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="CVC"
                  className={styles.cardInput}
                />
              </div>
            </div>
          </div>
        )}

        {/* Razorpay Message */}
        {paymentMethod === 'razorpay' && (
          <p className={styles.paymentMessage}>
            You will be redirected to Razorpay for payment.
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
