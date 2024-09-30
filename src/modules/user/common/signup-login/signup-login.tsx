"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./signup-login.module.css"; // Assume you have a CSS module for styling

const SignupForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>
          {isLogin ? "Log In" : "Registration – Sign up"}
        </h2>
        <form className={styles.form}>
          {!isLogin && (
            <>
              <label className={styles.label}>Name</label>
              <input type="text" placeholder="Name" className={styles.input} />

              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
              />

              <label className={styles.label}>Phone</label>
              <input type="tel" placeholder="Phone" className={styles.input} />

              <label className={styles.label}>City</label>
              <input type="text" placeholder="City" className={styles.input} />

              <label className={styles.label}>State</label>
              <input type="text" placeholder="State" className={styles.input} />

              <label className={styles.label}>Country</label>
              <input
                type="text"
                placeholder="Country"
                className={styles.input}
              />

              <label className={styles.label}>Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                className={styles.input}
              />
            </>
          )}

          {/* Email and password fields are common for both Sign Up and Log In */}
          <label className={styles.label}>Email</label>
          <input type="email" placeholder="Email" className={styles.input} />

          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
            />
            <Image
              src={passwordVisible ? "/icons/eye.svg" : "/icons/eye-slash.svg"}
              alt="Toggle Password Visibility"
              width={20}
              height={20}
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}
            />
          </div>

          {/* Confirm Password only for Sign Up */}
          {!isLogin && (
            <>
              <label className={styles.label}>Confirm Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={styles.input}
                />
                <Image
                  src={
                    confirmPasswordVisible
                      ? "/icons/eye.svg"
                      : "/icons/eye-slash.svg"
                  }
                  alt="Toggle Confirm Password Visibility"
                  width={20}
                  height={20}
                  className={styles.eyeIcon}
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
            </>
          )}

          <button type="submit" className={styles.submitButton}>
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Sign Up and Log In */}
        <p className={styles.toggleText}>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                className={styles.toggleLink}
                onClick={() => setIsLogin(false)}
              >
                Sign up here
              </span>
            </>
          ) : (
            <>
              Already registered as a user?{" "}
              <span
                className={styles.toggleLink}
                onClick={() => setIsLogin(true)}
              >
                Log in here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
