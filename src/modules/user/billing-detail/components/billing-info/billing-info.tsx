"use client";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./billing-info.module.css";
import { FETCH_USER } from "@/graphql/queries/auth";
import { Button, message } from "antd"; // Assuming Ant Design is being used

interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  // Add any other fields you need
}
interface BillingInfoFormProps {
  onInputChange: (field: string, isValid: boolean) => void; // Add callback to track validation
  prefillData?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

const BillingInfoForm: React.FC<BillingInfoFormProps> = ({onInputChange}) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
  });

  useEffect(() => {
    const { firstName, lastName, phoneNumber, city } = userData;
    onInputChange("billingInfo", !!firstName && !!lastName && !!phoneNumber && !!city); // Check all fields
  }, [userData]);


  const [isEditing, setIsEditing] = useState(false); // New state to track if editing is enabled
  const token = Cookies.get("token"); // Retrieve token from cookies
  console.log(token);

  const { data, loading, error } = useQuery(FETCH_USER, {
    skip: !token, // Skip query if no token
  });

  useEffect(() => {
    if (data?.fetchUser?.status === "success") {
      const { firstName, lastName, phoneNumber, city } = data.fetchUser.data;
      setUserData({ firstName, lastName, phoneNumber, city });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // This is where you'd typically make a mutation to save the changes to the backend.
    // For now, we'll just show a message for demonstration purposes.
    message.success("Changes saved successfully!");
    setIsEditing(false);
  };

  if (loading) return <p>Loading billing info...</p>;
  if (error) {
    console.error("Error loading billing info:", error);
    return <p>Error loading billing info: {error.message}</p>;
  }

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
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="First name"
            value={userData.firstName}
            onChange={handleInputChange}
            readOnly={!isEditing} // Disable input if not editing
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last name"
            value={userData.lastName}
            onChange={handleInputChange}
            readOnly={!isEditing} // Disable input if not editing
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone number"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            readOnly={!isEditing} // Disable input if not editing
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={userData.city}
            onChange={handleInputChange}
            readOnly={!isEditing} // Disable input if not editing
          />
        </div>
      </form>

      {/* Edit / Save Button */}
      <div className={styles.buttonContainer}>
        {isEditing ? (
          <Button className={styles.editSaveButton} type="primary" onClick={handleSave}>
            Save Changes
          </Button>
        ) : (
          <Button type="default" onClick={handleEditToggle} className={styles.editSaveButton}>
            Edit Info
          </Button>
        )}
      </div>
    </div>
  );
};

export default BillingInfoForm;
