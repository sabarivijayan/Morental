import { useState } from "react";
import Image from "next/image";
import styles from "./profile-section.module.css";

export default function ProfilePage() {
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const toggleEditUserInfo = () => setIsEditingUserInfo(!isEditingUserInfo);
  const toggleEditProfilePic = () =>
    setIsEditingProfilePic(!isEditingProfilePic);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        {/* Profile Picture Section */}
        <div className={styles.profilePicContainer}>
          <Image
            src="/images/Image (1).jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className={styles.profilePic}
          />
          <div
            className={styles.editIconContainer}
            onClick={toggleEditProfilePic}
          >
            <img
              src="/icons/edit.svg"
              alt="Edit Profile Picture Icon"
              className={styles.editIconImage}
            />
          </div>
        </div>

        {/* User Info Section */}
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfoHeader}>
            <h2 className={styles.userInfoTitle}>User Info</h2>
            <div
              className={styles.userInfoEditIcon}
              onClick={toggleEditUserInfo}
            >
              <img
                src="/icons/edit.svg"
                alt="Edit User Info Icon"
                className={styles.editIconImage}
              />
            </div>
          </div>

          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditingUserInfo}
            placeholder="Your name"
            className={`${styles.inputField} ${
              !isEditingUserInfo ? styles.disabledInput : ""
            }`}
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            disabled={!isEditingUserInfo}
            placeholder="Password"
            className={`${styles.inputField} ${
              !isEditingUserInfo ? styles.disabledInput : ""
            }`}
          />

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            disabled={!isEditingUserInfo}
            placeholder="Confirm Password"
            className={`${styles.inputField} ${
              !isEditingUserInfo ? styles.disabledInput : ""
            }`}
          />

          {/* Conditionally render the Save button */}
          {isEditingUserInfo && (
            <button className={styles.saveButton} onClick={toggleEditUserInfo}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
