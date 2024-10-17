"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Steps, message } from "antd";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { REGISTER_USER, VERIFY_OTP, SEND_OTP, LOGIN_USER } from "@/graphql/mutations/auth";
import { FormData } from "@/interfaces/auth";
import { useRouter } from "next/navigation";
import styles from "./signup-login.module.css";
import Cookies from "js-cookie";

const { Step } = Steps;

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({ phoneNumber: "", confirmPassword: "" });
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [registerUser] = useMutation(REGISTER_USER);
  const [sendOTP] = useMutation(SEND_OTP);
  const [verifyOTP] = useMutation(VERIFY_OTP);
  const [loginUser] = useMutation(LOGIN_USER);

  const [otpId, setOtpId] = useState(""); // For storing OTP ID
  const [timer, setTimer] = useState(60); // OTP resend timer

  useEffect(() => {
    if (currentStep === 1 && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, currentStep]);

  useEffect(() => {
    // Store the last visited page before switching to the login form
    if (isLoginForm) {
      const lastVisitedPage = window.location.pathname;
      Cookies.set("lastVisitedPage", lastVisitedPage);
    }
  }, [isLoginForm]);

  const handleSendOTP = async () => {
    try {
      if (!formData.phoneNumber) {
        message.error("Phone number is required.");
        return;
      }

      const { data } = await sendOTP({ variables: { phoneNumber: formData.phoneNumber } });
      if (data.sendOTP.status === "success") {
        message.success(data.sendOTP.message);
        setOtpId(data.sendOTP.otpId);
        setCurrentStep(1);
        setTimer(60);
      } else {
        message.error(data.sendOTP.message);
      }
    } catch (error) {
      message.error("Failed to send OTP. Please try again.");
    }
  };

  const handleOTPVerification = async (values: { otp: string }) => {
    try {
      const { data } = await verifyOTP({
        variables: { phoneNumber: formData.phoneNumber, otp: values.otp },
      });
      if (data.verifyOTP.status === "success") {
        message.success(data.verifyOTP.message);
        setCurrentStep(2);
      } else {
        message.error(data.verifyOTP.message);
      }
    } catch (error) {
      message.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleRegistration = async (values: Partial<FormData>) => {
    try {
      const { data } = await registerUser({
        variables: {
          input: {
            ...formData,
            ...values,
          },
        },
      });
      if (data.registerUser.status === "success") {
        message.success(data.registerUser.message);
        setCurrentStep(0);
        setIsLoginForm(true);
      } else {
        message.error(data.registerUser.message);
      }
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  const onFinishBasicDetails = (values: Partial<FormData>) => {
    setFormData({ ...formData, ...values });
    if (values.phoneNumber) {
      handleSendOTP();
    } else {
      message.error("Phone number is required to send OTP.");
    }
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const { data } = await loginUser({
        variables: { email: values.email, password: values.password },
      });
  
      if (data.userLogin.status === "success") {
        message.success("Login successful!");
  
        // Store token in cookies
        Cookies.set("token", data.userLogin.token, {
          expires: 1 / 12, // Token expires in 2 hours
          secure: true, // Use true if your site is served over HTTPS
          sameSite: "Strict", // Helps prevent CSRF attacks
        });
  
        // Use router.back() to navigate to the previous page
        router.back();
      } else {
        message.error(data.userLogin.message);
      }
    } catch (error) {
      message.error("Login failed. Please try again.");
    }
  };
  
  
  

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>
          {isLoginForm ? "Login" : "Registration – Sign up"}
        </h2>

        {!isLoginForm ? (
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="Basic Details" />
              <Step title="Verify Phone" />
              <Step title="Address Info" />
            </Steps>

            {/* Step 1: Basic Details */}
            {currentStep === 0 && (
              <Form
                name="basicDetails"
                layout="vertical"
                onFinish={onFinishBasicDetails}
                className={styles.form}
              >
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Please enter your first name!" }]}
                >
                  <Input placeholder="First Name" className={styles.input} />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Please enter your last name!" }]}
                >
                  <Input placeholder="Last Name" className={styles.input} />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please enter your email!" }]}
                >
                  <Input placeholder="Email" className={styles.input} />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phoneNumber"
                  rules={[{ required: true, message: "Please enter your phone number!" }]}
                >
                  <Input placeholder="Phone" className={styles.input} />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter your password!" }]}
                >
                  <Input.Password
                    placeholder="Password"
                    visibilityToggle={passwordVisible}
                    className={styles.input}
                    iconRender={(visible) => (
                      <Image
                        src={visible ? "/icons/eye.svg" : "/icons/eye-slash.svg"}
                        alt="Toggle Password Visibility"
                        width={20}
                        height={20}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Passwords do not match!");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    visibilityToggle={confirmPasswordVisible}
                    className={styles.input}
                    iconRender={(visible) => (
                      <Image
                        src={visible ? "/icons/eye.svg" : "/icons/eye-slash.svg"}
                        alt="Toggle Password Visibility"
                        width={20}
                        height={20}
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      />
                    )}
                  />
                </Form.Item>

                <Button type="primary" htmlType="submit" className={styles.submitButton}>
                  Verify Phone Number
                </Button>
              </Form>
            )}

            {/* Step 2: OTP Verification */}
            {currentStep === 1 && (
              <Form
                name="otpVerification"
                layout="vertical"
                onFinish={handleOTPVerification}
                className={styles.form}
              >
                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[{ required: true, message: "Please enter the OTP sent to your phone!" }]}
                >
                  <Input placeholder="Enter OTP" className={styles.input} />
                </Form.Item>

                <Button type="primary" htmlType="submit" className={styles.submitButton}>
                  Verify OTP
                </Button>
              </Form>
            )}

            {/* Step 3: Address Information */}
            {currentStep === 2 && (
              <Form name="addressInfo" layout="vertical" onFinish={handleRegistration} className={styles.form}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: "Please enter your city!" }]}
                >
                  <Input placeholder="City" className={styles.input} />
                </Form.Item>

                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: "Please enter your state!" }]}
                >
                  <Input placeholder="State" className={styles.input} />
                </Form.Item>

                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: "Please enter your country!" }]}
                >
                  <Input placeholder="Country" className={styles.input} />
                </Form.Item>

                <Form.Item
                  label="Pincode"
                  name="pincode"
                  rules={[{ required: true, message: "Please enter your pincode!" }]}
                >
                  <Input placeholder="Pincode" className={styles.input} />
                </Form.Item>

                <Button type="primary" htmlType="submit" className={styles.submitButton}>
                  Register Now
                </Button>
              </Form>
            )}

            <p className={styles.toggleText}>
              Already registered?{" "}
              <span className={styles.toggleLink} onClick={() => setIsLoginForm(true)}>
                Log in here
              </span>
            </p>
          </>
        ) : (
          <Form
            name="loginForm"
            layout="vertical"
            onFinish={handleLogin}
            className={styles.form}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Email" className={styles.input} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                placeholder="Password"
                visibilityToggle={passwordVisible}
                className={styles.input}
                iconRender={(visible) => (
                  <Image
                    src={visible ? "/icons/eye.svg" : "/icons/eye-slash.svg"}
                    alt="Toggle Password Visibility"
                    width={20}
                    height={20}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Login
            </Button>

            <p className={styles.toggleText}>
              Don't have an account?{" "}
              <span className={styles.toggleLink} onClick={() => setIsLoginForm(false)}>
                Sign up here
              </span>
            </p>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
