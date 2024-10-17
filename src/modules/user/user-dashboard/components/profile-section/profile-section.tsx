import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Upload, Avatar, Button, Form, Input, message, Row, Col, Typography, Space } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { FETCH_USER } from "@/graphql/queries/auth";
import { UPDATE_PROFILE_IMAGE } from "@/graphql/mutations/auth";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import styles from "./profile-section.module.css";

const { Title, Text } = Typography;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    profileImage: "",
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { data, loading, error } = useQuery(FETCH_USER);

  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);

  useEffect(() => {
    if (data?.fetchUser?.data) {
      setUserData(data.fetchUser.data);
    }
  }, [data]);

  const handleFileChange = (info: { fileList: UploadFile[] }) => {
    const isLt5M = info.fileList[0]?.size ? info.fileList[0].size / 1024 / 1024 < 5 : true;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return;
    }
    setFileList(info.fileList);
  };

  const beforeUpload = (file: RcFile) => {
    const isAllowedType = ALLOWED_FILE_TYPES.includes(file.type);
    if (!isAllowedType) {
      message.error('You can only upload JPG/PNG/GIF file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
    }
    return isAllowedType && isLt5M;
  };

  const handleUpload = async () => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      if (!file) {
        message.error("No valid file to upload");
        return;
      }
      setIsUploading(true);
      try {
        const { data } = await updateProfileImage({
          variables: { userId: userData.id, profileImage: file },
        });
        if (data?.updateProfileImage?.status === "success") {
          const newProfileImage = data.updateProfileImage.data?.profileImage;
          if (newProfileImage) {
            setUserData(prevData => ({
              ...prevData,
              profileImage: newProfileImage
            }));
            message.success(data.updateProfileImage.message);
          } else {
            message.warning("Profile image updated, but new URL not received");
          }
        } else {
          throw new Error(data?.updateProfileImage?.message || "Failed to update profile image");
        }
      } catch (error) {
        message.error(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsUploading(false);
        setFileList([]);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <Row justify="center" align="middle" className={styles.profileRow}>
        <Col span={24} className={styles.centerContent}>
          <Space direction="vertical" size="middle" align="center">
            <Avatar
              size={150}
              icon={!userData.profileImage && <UserOutlined />}
              src={userData.profileImage || undefined}
              className={styles.profilePicModern}
            />
            <Upload
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              className={styles.uploadModern}
            >
              <Button icon={<UploadOutlined />} className={styles.changePicButton}>
                Change Profile Picture
              </Button>
            </Upload>
            {fileList.length > 0 && (
              <Button
                type="primary"
                onClick={handleUpload}
                loading={isUploading}
                className={styles.uploadButtonModern}
              >
                Upload
              </Button>
            )}
          </Space>
        </Col>

        <Col span={24} className={styles.centerContent}>
          <div className={styles.userInfoContainerModern}>
            <Row justify="space-between" align="middle" className={styles.userInfoHeaderModern}>
              <Title level={3} className={styles.userInfoTitleModern}>User Info</Title>
            </Row>

            <Form layout="vertical" className={styles.formModern}>
              <Form.Item label={<Text className={styles.labelModern}>First Name</Text>}>
                <Input
                  value={userData.firstName}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>

              <Form.Item label={<Text className={styles.labelModern}>Last Name</Text>}>
                <Input
                  value={userData.lastName}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>

              <Form.Item label={<Text className={styles.labelModern}>Email</Text>}>
                <Input
                  value={userData.email}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>

              <Form.Item label={<Text className={styles.labelModern}>Phone Number</Text>}>
                <Input
                  value={userData.phoneNumber}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>

              <Form.Item label={<Text className={styles.labelModern}>City</Text>}>
                <Input
                  value={userData.city}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>

              <Form.Item label={<Text className={styles.labelModern}>State</Text>}>
                <Input
                  value={userData.state}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>

              <Form.Item label={<Text className={styles.labelModern}>Country</Text>}>
                <Input
                  value={userData.country}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>

              <Form.Item label={<Text className={styles.labelModern}>Pincode</Text>}>
                <Input
                  value={userData.pincode}
                  disabled={true}
                  className={styles.inputModern}
                />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}