import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Tabs,
  Table,
  Checkbox,
  Upload,
  message,
  Avatar,
  Button,
  Form,
  Input,
  Spin,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FETCH_BOOKINGS } from "@/graphql/queries/booking-cars";
import { FETCH_USER } from "@/graphql/queries/auth";
import { UPDATE_PASSWORD, UPDATE_PROFILE_IMAGE, UPDATE_USER_PROFILE } from "@/graphql/mutations/auth";
import styles from "./profile-section.module.css";

interface BookingData {
  id: string;
  carId: number;
  userId: number;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
  pickUpLocation: string;
  dropOffLocation: string;
  address: string;
  totalPrice: number;
  status: string;
  rentable: {
    car: {
      name: string;
      type: string;
      numberOfSeats: string;
      fuelType: string;
      transmissionType: string;
      primaryImageUrl: string;
      manufacturer: {
        name: string;
      };
    };
  };
}

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  profileImage: string;
}

const UserDashboard: React.FC = () => {
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const { data: bookingData, loading: bookingLoading } = useQuery(FETCH_BOOKINGS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const {
    data: userData,
    loading: userLoading,
    refetch: refetchUser,
  } = useQuery(FETCH_USER);

  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const handlePasswordUpdate = async () => {
    try {
      const values = await passwordForm.validateFields();
      const response = await updatePassword({
        variables: {
          userId: userData?.fetchUser?.data?.id,
          input: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmNewPassword,
          },
        },
      });

      if (response.data?.updatePassword?.status === "success") {
        message.success("Password updated successfully!");
        setPasswordModalVisible(false);
        passwordForm.resetFields();
      } else {
        message.error(response.data?.updatePassword?.message || "Failed to update password");
      }
    } catch (error: any) {
      message.error(error.message || "Error updating password");
    }
  };

  const handleSaveProfile = async () => {
    try {
      const values = await profileForm.validateFields();
      const response = await updateUserProfile({
        variables: {
          userId: userData?.fetchUser?.data?.id,
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            city: values.city,
            state: values.state,
            country: values.country,
            pincode: values.pincode,
          },
        },
      });

      if (response.data?.updateUserProfile?.status === "success") {
        message.success("Profile updated successfully!");
        setIsEditing(false);
        refetchUser();
      } else {
        message.error(response.data?.updateUserProfile?.message || "Failed to update profile");
      }
    } catch (error: any) {
      message.error(error.message || "Error updating profile");
    }
  };
  const handleImageUpload = async (file: File) => {
    try {
      const response = await updateProfileImage({
        variables: {
          userId: userData?.fetchUser?.data?.id,
          profileImage: file,
        },
      });

      if (response.data?.updateProfileImage?.status === "success") {
        message.success("Profile image updated successfully!");
        refetchUser();
      } else {
        message.error(response.data?.updateProfileImage?.message || "Failed to update profile image");
      }
    } catch (error: any) {
      message.error(error.message || "Error uploading profile image");
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    const user = userData?.fetchUser?.data;
    if (user) {
      profileForm.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        city: user.city,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
      });
    }
  };

  const handleBookingSelection = (bookingId: string, checked: boolean) => {
    setSelectedBookings((prevSelected) =>
      checked
        ? [...prevSelected, bookingId]
        : prevSelected.filter((id) => id !== bookingId)
    );
  };

  if (userLoading || bookingLoading) return <Spin />;

  const columns = [
    {
      title: "Car",
      dataIndex: ["rentable"],
      key: "car",
      render: (_: any, record: BookingData) => {
        const car = record.rentable?.car;
        return car ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={car.primaryImageUrl} size={64} />
            <span style={{ marginLeft: "8px", whiteSpace: "nowrap", textOverflow:"ellipsis", overflow: "hidden" }}>{car.name}</span>
          </div>
        ) : (
          <span>No car data</span>
        );
      },
    },
    {
      title: "Pick-up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
      render: (text: string) => new Date(text).toLocaleDateString("en-GB"),
    },
    {
      title: "Drop-off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text: string) => new Date(text).toLocaleDateString("en-GB"),
    },
    {
      title: "Location",
      key: "location",
      render: (_: any, record: BookingData) => (
        <>
          {record.pickUpLocation} to {record.dropOffLocation}
        </>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Select",
      key: "select",
      render: (_: any, record: BookingData) => (
        <Checkbox
          checked={selectedBookings.includes(record.id)}
          onChange={(e) => handleBookingSelection(record.id, e.target.checked)}
        />
      ),
    },
  ];

  const user: UserInfo | undefined = userData?.fetchUser?.data;
  const bookings: BookingData[] | undefined = bookingData?.fetchBookings?.data;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.avatarContainer}>
        <Avatar size={128} src={user?.profileImage} />
      </div>
      <Upload
        beforeUpload={(file) => {
          handleImageUpload(file);
          return false;
        }}
        showUploadList={false}
      >
        <Button className={styles.uploadButton} icon={<UploadOutlined />}>
          Change Profile Image
        </Button>
      </Upload>

      <Tabs className={styles.tabsContainer} defaultActiveKey="1">
        <Tabs.TabPane tab="Profile Information" key="1">
          <Form
            form={profileForm}
            layout="vertical"
            className={styles.formContainer}
          >
            <Form.Item label="First Name" name="firstName">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input disabled readOnly />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="State" name="state">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Pincode" name="pincode">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Form>

          <div className={styles.actionButtons}>
            {isEditing ? (
              <>
                <Button type="primary" onClick={handleSaveProfile}>
                  Save Profile
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={() => setPasswordModalVisible(true)}>
                  Change Password
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            )}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Bookings" key="2">
          <Table
            dataSource={bookings}
            columns={columns}
            rowKey="id"
            className={styles.tableContainer}
            scroll={{x: "100%"}}
          />
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title="Change Password"
        open={passwordModalVisible}
        onOk={handlePasswordUpdate}
        onCancel={() => {
          setPasswordModalVisible(false);
          passwordForm.resetFields();
        }}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: "Please enter your current password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 8, message: "Password must be at least 8 characters long" }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDashboard;